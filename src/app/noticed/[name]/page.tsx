"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

type Entry = {
  id: string;
  createdAt: string;
  text: string;
  people?: string[];
  frame?: string;
  tags?: string[];
};

type AiSuggestion = {
  title: string;
  rationale: string;
  tag?: string;
  confidence?: "low" | "medium" | "high";
};

type AiSummary = {
  strengths: string[];
  emerging_capacities: string[];
  concerns: string[];
  supports: string[];
  suggested_montessori_materials: AiSuggestion[];
  notes: string;
};

const POSSIBLE_ENTRY_KEYS = [
  "noticing_entries_v1",
  "montessori_entries_v1",
  "entries_v1",
];

type FilterMode = "all" | "solo" | "group" | "patterns";

function normalizeName(s: string) {
  return s.trim().replace(/\s+/g, " ").toLowerCase();
}

function safeTimeMs(iso: string) {
  const t = new Date(iso).getTime();
  return Number.isFinite(t) ? t : NaN;
}

function RhythmStrip({
  entries,
  label = "Observations across time (last 30 days)",
  onJump,
}: {
  entries: Array<{ id: string; createdAt: string; tags?: string[] }>;
  label?: string;
  onJump: (id: string) => void;
}) {
  const now = Date.now();
  const start = now - 30 * 24 * 60 * 60 * 1000;

  const recent = useMemo(() => {
    return entries
      .map((e) => ({ ...e, t: safeTimeMs(e.createdAt) }))
      .filter((e) => Number.isFinite(e.t) && e.t >= start && e.t <= now)
      .sort((a, b) => a.t - b.t);
  }, [entries, start, now]);

  if (recent.length === 0) return null;

  const range = now - start || 1;

  return (
    <div style={{ marginTop: 6, marginBottom: 14 }}>
      <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 6 }}>
        {label}
      </div>

      <div
        style={{
          position: "relative",
          height: 18,
          borderRadius: 999,
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.10)",
        }}
        aria-label="Observation rhythm strip"
      >
        {recent.map((e) => {
          const leftPct = ((e.t - start) / range) * 100;
          const title = `${new Date(e.createdAt).toLocaleString()}${
            e.tags?.length ? " · " + e.tags.slice(0, 3).join(", ") : ""
          }`;

          return (
            <button
              key={e.id}
              type="button"
              title={title}
              onClick={() => onJump(e.id)}
              style={{
                position: "absolute",
                left: `calc(${leftPct}% - 5px)`,
                top: 4,
                width: 10,
                height: 10,
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.45)",
                background: "white",
                cursor: "pointer",
                padding: 0,
              }}
              aria-label={title}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  const params = useParams();
  const name = decodeURIComponent(String(params?.name ?? ""));
  const target = normalizeName(name);

  const [allEntries, setAllEntries] = useState<Entry[]>([]);
  const [usedKey, setUsedKey] = useState<string | null>(null);

  const [mode, setMode] = useState<FilterMode>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Mobile print hint
  const [printHint, setPrintHint] = useState<string | null>(null);

  // AI
  const [aiSummary, setAiSummary] = useState<AiSummary | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiScope, setAiScope] = useState<"all" | "filtered">("filtered");

  // Toast-ish
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const isMobile =
    typeof navigator !== "undefined" &&
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  useEffect(() => {
    const load = () => {
      const merged: Entry[] = [];
      const seen = new Set<string>();
      const keysUsed: string[] = [];

      for (const key of POSSIBLE_ENTRY_KEYS) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            keysUsed.push(key);
            for (const item of parsed as Entry[]) {
              const id = String(item?.id ?? "");
              if (!id || seen.has(id)) continue;
              seen.add(id);
              merged.push(item);
            }
          }
        } catch {
          // ignore bad JSON
        }
      }

      setAllEntries(merged);
      setUsedKey(keysUsed.length ? keysUsed.join(", ") : null);
    };

    load();

    const onFocus = () => load();
    const onStorage = (e: StorageEvent) => {
      if (POSSIBLE_ENTRY_KEYS.includes(e.key ?? "")) load();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const personEntries = useMemo(() => {
    return allEntries
      .filter((e) => (e.people ?? []).some((p) => normalizeName(p) === target))
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [allEntries, target]);

  const collaborators = useMemo(() => {
    const counts: Record<string, number> = {};

    personEntries.forEach((e) => {
      (e.people ?? []).forEach((p) => {
        if (normalizeName(p) !== target) {
          counts[p] = (counts[p] ?? 0) + 1;
        }
      });
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .filter(([, count]) => count > 1);
  }, [personEntries, target]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    personEntries.forEach((e) => {
      (e.tags ?? []).forEach((t) => {
        const tag = String(t).trim();
        if (!tag) return;
        counts[tag] = (counts[tag] ?? 0) + 1;
      });
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [personEntries]);

  const entries = useMemo(() => {
    let list = [...personEntries];

    if (mode === "solo") {
      list = list.filter((e) => (e.people ?? []).length <= 1);
    } else if (mode === "group") {
      list = list.filter((e) => (e.people ?? []).length >= 2);
    } else if (mode === "patterns") {
      const repeated = new Set(collaborators.map(([p]) => p));
      list = list.filter((e) =>
        (e.people ?? []).some(
          (p) => normalizeName(p) !== target && repeated.has(p),
        ),
      );
    }

    if (activeTag) {
      list = list.filter((e) => (e.tags ?? []).includes(activeTag));
    }

    return list;
  }, [personEntries, mode, collaborators, activeTag, target]);

  const last30DaysCount = useMemo(() => {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return personEntries.filter((e) => safeTimeMs(e.createdAt) >= cutoff)
      .length;
  }, [personEntries]);

  const soloCount = useMemo(() => {
    return personEntries.filter((e) => (e.people ?? []).length <= 1).length;
  }, [personEntries]);

  const groupCount = useMemo(() => {
    return personEntries.filter((e) => (e.people ?? []).length >= 2).length;
  }, [personEntries]);

  const topTagsText = useMemo(() => {
    if (tagCounts.length === 0) return "No tags yet.";
    const top = tagCounts.slice(0, 3).map(([t, c]) => `${t} (${c})`);
    return `Top tags: ${top.join(", ")}.`;
  }, [tagCounts]);

  const softSummary = useMemo(() => {
    if (personEntries.length === 0) {
      return "No observations recorded yet.";
    }

    const soloVsGroup =
      soloCount === groupCount
        ? "shows up evenly across solo and group work"
        : soloCount > groupCount
          ? "seems to strengthen most in solo work"
          : "seems to gather most when others are nearby";

    const strongestTag = tagCounts[0]?.[0];
    const strongestThread = strongestTag
      ? `The strongest thread right now shows up around “${strongestTag}.”`
      : "A stronger thread will become clearer as tags build.";

    return `Recently, focus ${soloVsGroup}. ${strongestThread}`;
  }, [personEntries.length, soloCount, groupCount, tagCounts]);

  const nextBestStep = useMemo(() => {
    const strongestTag = tagCounts[0]?.[0];
    if (!strongestTag) {
      return "Choose one small material invitation this week and observe what returns.";
    }
    return `Offer one small invitation connected to “${strongestTag},” then observe whether it draws steady return.`;
  }, [tagCounts]);

  const pillStyle = (active: boolean) => ({
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.15)",
    fontSize: 13,
    cursor: "pointer" as const,
    background: active ? "rgba(0,0,0,0.06)" : "transparent",
    fontWeight: active ? 800 : 600,
    userSelect: "none" as const,
  });

  const jumpToEntry = (id: string) => {
    const el = document.getElementById(`entry-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExportPdf = () => {
    setPrintHint(null);

    if (isMobile) {
      setPrintHint(
        "PDF export is best on a computer. On phone: Open in browser → Share → Print → pinch out to full page → Share/Save.",
      );

      try {
        window.print();
      } catch {}
      return;
    }

    const title = `${name} — The Unfolding`;
    document.title = title;

    const style = document.createElement("style");
    style.id = "print-style";
    style.innerHTML = `
      @media print {
        .no-print { display: none !important; }
        body { margin: 0; }
        main { max-width: 720px !important; margin: 0 auto !important; padding: 18px !important; }
        a { text-decoration: none !important; color: inherit !important; }
      }
    `;
    document.head.appendChild(style);

    window.print();

    setTimeout(() => {
      const s = document.getElementById("print-style");
      s?.remove();
    }, 300);
  };

  const exportBackup = () => {
    try {
      const payload = {
        version: 1,
        exportedAt: new Date().toISOString(),
        entriesKey: usedKey ?? "noticing_entries_v1",
        entries: allEntries,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `noticing-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();

      URL.revokeObjectURL(url);
    } catch {
      alert("Backup export failed.");
    }
  };

  const importBackup = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const incoming = Array.isArray(parsed) ? parsed : parsed?.entries;

      if (!Array.isArray(incoming)) {
        alert("That file doesn’t look like a backup.");
        return;
      }

      const key = usedKey ?? "noticing_entries_v1";
      localStorage.setItem(key, JSON.stringify(incoming));

      setAllEntries(incoming);
      setUsedKey(key);

      alert("Backup imported.");
    } catch {
      alert("Backup import failed.");
    }
  };

  const buildAiPayload = () => {
    const scopeEntries = aiScope === "all" ? personEntries : entries;

    return {
      name,
      timeframe: "all_time",
      active_mode: mode,
      active_tag: activeTag,
      counts: {
        total: personEntries.length,
        last30Days: last30DaysCount,
        solo: soloCount,
        group: groupCount,
      },
      topTags: tagCounts.slice(0, 8).map(([t, c]) => ({ tag: t, count: c })),
      repeatedCollaborators: collaborators.slice(0, 8).map(([p, c]) => ({
        name: p,
        count: c,
      })),
      entries: scopeEntries.map((e) => ({
        createdAt: e.createdAt,
        text: e.text,
        tags: e.tags ?? [],
        people: e.people ?? [],
      })),
      knowledge: {
        montessori_album_notes: "",
        spiral_companion_notes: "",
      },
    };
  };

  const generateAiReflection = async () => {
    setAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildAiPayload()),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "AI request failed.");
      }

      const data = (await res.json()) as AiSummary;
      setAiSummary(data);
    } catch (e: any) {
      setAiError(e?.message ?? "AI request failed.");
    } finally {
      setAiLoading(false);
    }
  };

  // ---- Conference copy helpers ----
  const formatConferenceReady = () => {
    const last10 = [...personEntries]
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 10);

    const lines: string[] = [];

    lines.push(`${name} — Conference Summary`);
    lines.push(`Generated: ${new Date().toLocaleString()}`);
    lines.push("");

    lines.push("SUMMARY");
    lines.push(`• Moments (last 30 days): ${last30DaysCount}`);
    lines.push(
      `• Solo vs Group: ${
        soloCount === groupCount
          ? "Evenly split"
          : soloCount > groupCount
            ? "More often solo"
            : "More often in groups"
      }`,
    );

    if (tagCounts.length) {
      const top = tagCounts
        .slice(0, 3)
        .map(([t, c]) => `${t} (${c})`)
        .join(", ");
      lines.push(`• Top tags: ${top}`);
    } else {
      lines.push("• Top tags: (none yet)");
    }

    if (collaborators.length) {
      const topCollabs = collaborators
        .slice(0, 3)
        .map(([p, c]) => `${p} (${c})`)
        .join(", ");
      lines.push(`• Repeated collaborators: ${topCollabs}`);
    } else {
      lines.push("• Repeated collaborators: (none yet)");
    }

    lines.push("");
    lines.push(`Narrative thread: ${softSummary}`);
    lines.push(`Next best step: ${nextBestStep}`);
    lines.push("");

    lines.push("LAST 10 OBSERVATIONS");
    if (last10.length === 0) {
      lines.push("(No observations yet.)");
    } else {
      last10.forEach((e, idx) => {
        const dt = new Date(e.createdAt).toLocaleString();
        const people = (e.people ?? []).join(", ");
        const tags = (e.tags ?? []).join(", ");

        lines.push(`${idx + 1}. ${dt}`);
        if (people) lines.push(`   People: ${people}`);
        if (tags) lines.push(`   Tags: ${tags}`);
        lines.push(`   Note: ${String(e.text ?? "").trim()}`);
        lines.push("");
      });
    }

    lines.push("AI REFLECTION");
    if (!aiSummary) {
      lines.push(
        "(Not generated yet. Click Assisted Reflection → Generate to include it.)",
      );
    } else {
      if (aiSummary.strengths?.length) {
        lines.push("Strengths:");
        aiSummary.strengths.forEach((x) => lines.push(`• ${x}`));
        lines.push("");
      }

      if (aiSummary.emerging_capacities?.length) {
        lines.push("Emerging capacities:");
        aiSummary.emerging_capacities.forEach((x) => lines.push(`• ${x}`));
        lines.push("");
      }

      if (aiSummary.concerns?.length) {
        lines.push("Concerns (non-diagnostic):");
        aiSummary.concerns.forEach((x) => lines.push(`• ${x}`));
        lines.push("");
      }

      if (aiSummary.supports?.length) {
        lines.push("Supports:");
        aiSummary.supports.forEach((x) => lines.push(`• ${x}`));
        lines.push("");
      }

      if (aiSummary.suggested_montessori_materials?.length) {
        lines.push("Suggested Montessori materials / lessons:");
        aiSummary.suggested_montessori_materials.forEach((s) => {
          const conf = s.confidence ? ` (${s.confidence})` : "";
          const tag = s.tag ? ` — Tag: ${s.tag}` : "";
          lines.push(`• ${s.title}${conf}${tag}`);
          lines.push(`  Rationale: ${s.rationale}`);
        });
        lines.push("");
      }

      if (aiSummary.notes) {
        lines.push(`Notes: ${aiSummary.notes}`);
        lines.push("");
      }
    }

    return lines.join("\n");
  };

  const copyConferenceToGoogleDoc = async () => {
    const text = formatConferenceReady();

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }

    setCopyToast("Conference notes copied. Paste into the new doc.");
    setTimeout(() => setCopyToast(null), 3000);

    window.open("https://docs.new", "_blank", "noopener,noreferrer");
  };

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      {/* Toast-ish */}
      {copyToast && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 14px",
            borderRadius: 14,
            background: "rgba(0,0,0,0.85)",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
          }}
        >
          {copyToast}
        </div>
      )}

      <div
        className="no-print"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <a
          href="/noticed"
          style={{ fontSize: 14, textDecoration: "underline" }}
        >
          ← The Noticed
        </a>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            type="button"
            onClick={copyConferenceToGoogleDoc}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            Conference copy
          </button>

          <button
            type="button"
            onClick={handleExportPdf}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: "pointer",
              fontWeight: 800,
              whiteSpace: "nowrap",
            }}
          >
            Export PDF
          </button>
        </div>
      </div>

      {printHint ? (
        <div
          className="no-print"
          style={{
            marginTop: 10,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(0,0,0,0.03)",
            fontSize: 13,
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          {printHint}
        </div>
      ) : null}

      <div
        className="no-print"
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginTop: 10,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={exportBackup}
          style={{
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Export backup
        </button>

        <label
          style={{
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Import backup
          <input
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) importBackup(file);
              e.currentTarget.value = "";
            }}
          />
        </label>

        <span style={{ fontSize: 13, opacity: 0.7 }}>
          This keeps you safe if the browser resets.
        </span>
      </div>

      <h1 style={{ fontSize: 32, marginTop: 12, marginBottom: 4 }}>{name}</h1>

      <p style={{ fontStyle: "italic", opacity: 0.7, marginBottom: 10 }}>
        The Unfolding
      </p>

      {/* Rhythm strip (quiet, non-judgy, skips itself if no data) */}
      <RhythmStrip
        entries={personEntries.map((e) => ({
          id: e.id,
          createdAt: e.createdAt,
          tags: e.tags ?? [],
        }))}
        onJump={jumpToEntry}
      />

      {/* Summary box */}
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 14,
          padding: 16,
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 900, fontSize: 18, marginBottom: 10 }}>
          Summary
        </div>

        <div style={{ lineHeight: 1.7, marginBottom: 10 }}>
          <div>{last30DaysCount} moments (last 30 days).</div>
          <div>
            {soloCount === groupCount
              ? "Evenly split between solo and group."
              : soloCount > groupCount
                ? "More often solo than in groups."
                : "More often in groups than solo."}
          </div>
          <div>{topTagsText}</div>
          <div>
            {collaborators.length > 0
              ? `Repeated collaborators: ${collaborators
                  .slice(0, 3)
                  .map(([p, c]) => `${p} (${c})`)
                  .join(", ")}.`
              : "No repeated collaborators yet."}
          </div>
        </div>

        <div
          style={{
            fontStyle: "italic",
            opacity: 0.75,
            lineHeight: 1.6,
            marginBottom: 10,
          }}
        >
          {softSummary}
        </div>

        <div style={{ lineHeight: 1.6 }}>
          <span style={{ fontWeight: 900 }}>Next best step:</span>{" "}
          {nextBestStep}
        </div>
      </div>

      {/* AI Reflection box */}
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 14,
          padding: 16,
          marginBottom: 18,
        }}
      >
        <div
          className="no-print"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 14 }}>
            Assisted Reflection
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 13, opacity: 0.75 }}>Scope:</span>

            <div
              onClick={() => setAiScope("filtered")}
              style={pillStyle(aiScope === "filtered")}
              title="Uses the currently filtered entries (mode + tag)."
            >
              tags
            </div>

            <div
              onClick={() => setAiScope("all")}
              style={pillStyle(aiScope === "all")}
              title="Uses all entries for this student."
            >
              All entries
            </div>

            <button
              type="button"
              onClick={generateAiReflection}
              disabled={aiLoading || personEntries.length === 0}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor:
                  aiLoading || personEntries.length === 0
                    ? "not-allowed"
                    : "pointer",
                fontWeight: 900,
                opacity: aiLoading || personEntries.length === 0 ? 0.6 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {aiLoading ? "Working…" : "Generate"}
            </button>
          </div>
        </div>

        <div className="no-print" style={{ fontSize: 13, opacity: 0.75 }}>
          The reflection is based on the full language of the observations. Tags
          only control which entries are included.
        </div>

        {personEntries.length === 0 ? (
          <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.6 }}>
            Add a few entries first—this gets useful once there’s some time and
            repetition in the notes.
          </div>
        ) : aiError ? (
          <div style={{ fontSize: 13, color: "#b00020", lineHeight: 1.6 }}>
            {aiError}
          </div>
        ) : !aiSummary ? (
          <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.6 }}>
            This pulls a time-based reflection (strengths, emerging capacities,
            concerns, supports) and suggests Montessori materials to try. It
            only runs when you click Generate.
          </div>
        ) : (
          <div style={{ lineHeight: 1.7 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>Strengths</div>
              <ul style={{ marginTop: 0 }}>
                {aiSummary.strengths.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>
                Emerging capacities
              </div>
              <ul style={{ marginTop: 0 }}>
                {aiSummary.emerging_capacities.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>Concerns</div>
              <ul style={{ marginTop: 0 }}>
                {aiSummary.concerns.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>Supports</div>
              <ul style={{ marginTop: 0 }}>
                {aiSummary.supports.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 4 }}>
                Montessori materials / lessons to consider
              </div>

              {aiSummary.suggested_montessori_materials.length === 0 ? (
                <div style={{ fontSize: 13, opacity: 0.75 }}>
                  None suggested yet.
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {aiSummary.suggested_montessori_materials.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        border: "1px solid rgba(0,0,0,0.10)",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      <div style={{ fontWeight: 900 }}>
                        {s.title}
                        {s.confidence ? (
                          <span style={{ fontWeight: 600, opacity: 0.65 }}>
                            {" "}
                            · {s.confidence}
                          </span>
                        ) : null}
                      </div>
                      {s.tag ? (
                        <div style={{ fontSize: 12, opacity: 0.7 }}>
                          Tag: {s.tag}
                        </div>
                      ) : null}
                      <div style={{ marginTop: 6 }}>{s.rationale}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {aiSummary.notes ? (
              <div style={{ fontSize: 13, opacity: 0.75 }}>
                {aiSummary.notes}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Modes */}
      <div
        className="no-print"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}
      >
        <div onClick={() => setMode("all")} style={pillStyle(mode === "all")}>
          All
        </div>
        <div onClick={() => setMode("solo")} style={pillStyle(mode === "solo")}>
          Solo
        </div>
        <div
          onClick={() => setMode("group")}
          style={pillStyle(mode === "group")}
        >
          Group
        </div>
        <div
          onClick={() => setMode("patterns")}
          style={pillStyle(mode === "patterns")}
        >
          Patterns
        </div>
      </div>

      {/* Tags */}
      <div className="no-print" style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 900, marginBottom: 6 }}>Tags</div>

        {tagCounts.length === 0 ? (
          <div style={{ fontSize: 13, opacity: 0.75 }}>
            No tags yet (you’ll see them here once tags are saved with entries).
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <div
                onClick={() => setActiveTag(null)}
                style={pillStyle(activeTag === null)}
              >
                All tags
              </div>

              {tagCounts.map(([tag, count]) => (
                <div
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={pillStyle(activeTag === tag)}
                  title={`Show only ${tag}`}
                >
                  {tag} · {count}
                </div>
              ))}
            </div>

            {activeTag ? (
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
                Filtering by: <strong>{activeTag}</strong>{" "}
                <span
                  onClick={() => setActiveTag(null)}
                  style={{ textDecoration: "underline", cursor: "pointer" }}
                >
                  (clear)
                </span>
              </div>
            ) : null}
          </>
        )}
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div style={{ opacity: 0.75, lineHeight: 1.6 }}>
          <p style={{ marginBottom: 8 }}>No moments yet.</p>
          {usedKey ? (
            <p className="no-print" style={{ marginTop: 0, fontSize: 12 }}>
              (Nothing is broken—this person just hasn’t appeared in an entry
              yet.)
            </p>
          ) : null}
        </div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {entries.map((e) => (
            <div
              key={e.id}
              id={`entry-${e.id}`}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>
                {new Date(e.createdAt).toLocaleString()}
              </div>

              {e.people?.length ? (
                <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 8 }}>
                  {(e.people ?? []).join(", ")}
                </div>
              ) : null}

              {e.tags?.length ? (
                <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>
                  Tags: {(e.tags ?? []).join(", ")}
                </div>
              ) : null}

              <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                {e.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

