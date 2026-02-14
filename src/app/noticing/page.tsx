"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Entry = {
  id: string;
  createdAt: string;
  text: string;
  frame?: string; // raw frame text
  people?: string[]; // parsed names
  tags?: string[];
};

const DRAFT_KEY = "noticing_draft_v1";
const ENTRIES_KEY = "noticing_entries_v1";
const FRAME_DRAFT_KEY = "noticing_frame_draft_v1";
const TAGS_DRAFT_KEY = "noticing_tags_draft_v1";

const PROMPTS: string[] = [
  "What did someone do that they didn’t realize you saw?",
  "Where did energy gather?",
  "Who surprised you?",
  "What felt steady today?",
  "What almost went unnoticed?",
  "What changed after lunch?",
  "What kept pulling focus?",
  "What's becoming easier over time?",
  "What needed support—and what didn’t?",
  "What pattern is starting to repeat?",
  "What was the quiet win today?",
  "What shifted when you changed nothing?",
  "Who carried the room for a moment?",
  "What was contagious—in a good way?",
  "What was avoided (gently or loudly)?",
  "What needs a follow-up tomorrow?",
];

const TAG_OPTIONS = [
  "Cognitive",
  "Social",
  "Regulation",
  "Moral",
  "Independence",
  "Motor",
  "Executive",
] as const;

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// NEW: normalize + clean names on save (Lucy/lucy, extra spaces, etc.)
function toDisplayName(input: string): string {
  const cleaned = input.trim().replace(/\s+/g, " ");
  if (!cleaned) return "";

  return cleaned
    .toLowerCase()
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export default function NoticingPage() {
  const [text, setText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [frame, setFrame] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  const startDictation = (target: "frame" | "text") => {
    setVoiceError(null);

    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setVoiceError("Voice input isn’t supported in this browser.");
      return;
    }

    try {
      recognitionRef.current?.stop?.();
    } catch {}

    const recognition = new SR();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    setListening(true);

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }

      const combined = (finalTranscript + " " + interim).trim();
      if (!combined) return;

      if (target === "frame") {
        setFrame(combined);
      } else {
        setText(combined);
      }
    };

    recognition.onerror = (e: any) => {
      setListening(false);
      recognitionRef.current = null;
      setVoiceError(e?.error ? `Voice error: ${e.error}` : "Voice error.");
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };

  const stopDictation = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch {}
    recognitionRef.current = null;
    setListening(false);
  };

  useEffect(() => {
    setText(localStorage.getItem(DRAFT_KEY) ?? "");
    setFrame(localStorage.getItem(FRAME_DRAFT_KEY) ?? "");
    setTags(safeParse<string[]>(localStorage.getItem(TAGS_DRAFT_KEY), []));
    setEntries(safeParse<Entry[]>(localStorage.getItem(ENTRIES_KEY), []));

    const randomPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    setPrompt(randomPrompt);
  }, []);

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, text);
  }, [text]);

  useEffect(() => {
    localStorage.setItem(FRAME_DRAFT_KEY, frame);
  }, [frame]);

  useEffect(() => {
    localStorage.setItem(TAGS_DRAFT_KEY, JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [entries]);

  const toggleTag = (t: string) => {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const handleSaveEntry = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // NEW: normalize names AND dedupe within entry
    const rawNames = frame
      .split(",")
      .map((n) => toDisplayName(n))
      .filter(Boolean);

    const people = Array.from(new Set(rawNames));

    const now = new Date();
    const entry: Entry = {
      id: crypto.randomUUID(),
      createdAt: now.toISOString(),
      text: trimmed,
      frame: frame.trim() || undefined,
      people: people.length ? people : undefined,
      tags: tags.length ? tags : undefined,
    };

    setEntries((prev) => [entry, ...prev]);
    setText("");
    setFrame("");
    setTags([]);
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(FRAME_DRAFT_KEY);
    localStorage.removeItem(TAGS_DRAFT_KEY);
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const tagPillStyle = (active: boolean) => ({
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.15)",
    fontSize: 13,
    cursor: "pointer" as const,
    background: active ? "rgba(0,0,0,0.06)" : "transparent",
    fontWeight: active ? 800 : 600,
    userSelect: "none" as const,
  });

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 12 }}>
        <a
          href="/noticed"
          style={{ fontSize: 14, textDecoration: "underline" }}
        >
          The Noticed →
        </a>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
        Take a breath.
      </h1>

      <p style={{ fontStyle: "italic", opacity: 0.7, marginBottom: 12 }}>
        {prompt}
      </p>

      <p
        style={{
          fontSize: 11,
          lineHeight: 1.6,
          marginBottom: 18,
          opacity: 0.85,
        }}
      >
        Notice without deciding anything about it.
      </p>

      {voiceError ? (
        <p style={{ marginTop: 8, marginBottom: 12, color: "#b00020" }}>
          {voiceError}
        </p>
      ) : null}

      <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
        Who&apos;s in the frame?
      </label>

      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <input
          value={frame}
          onChange={(e) => setFrame(e.target.value)}
          placeholder="River, Lucy, Journee…"
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            outline: "none",
          }}
        />

        <button
          type="button"
          onClick={() => startDictation("frame")}
          disabled={listening}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            cursor: listening ? "not-allowed" : "pointer",
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          🎙️
        </button>

        <button
          type="button"
          onClick={stopDictation}
          disabled={!listening}
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            cursor: !listening ? "not-allowed" : "pointer",
            fontWeight: 800,
            whiteSpace: "nowrap",
            opacity: listening ? 1 : 0.5,
          }}
        >
          ■ Stop
        </button>
      </div>

      <div style={{ fontWeight: 700, marginBottom: 8 }}>Tags</div>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
      >
        {TAG_OPTIONS.map((t) => (
          <div
            key={t}
            onClick={() => toggleTag(t)}
            style={tagPillStyle(tags.includes(t))}
          >
            {t}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <span style={{ fontWeight: 700 }}>Observation</span>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => startDictation("text")}
            disabled={listening}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: listening ? "not-allowed" : "pointer",
              fontWeight: 800,
            }}
          >
            🎙️
          </button>

          <button
            type="button"
            onClick={stopDictation}
            disabled={!listening}
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.15)",
              cursor: !listening ? "not-allowed" : "pointer",
              fontWeight: 800,
              opacity: listening ? 1 : 0.5,
            }}
          >
            ■ Stop
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What stands out? What’s changing? What feels important?"
        style={{
          width: "100%",
          minHeight: 220,
          padding: 14,
          fontSize: 16,
          lineHeight: 1.6,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.15)",
          outline: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 12,
          alignItems: "center",
        }}
      >
        <button
          onClick={handleSaveEntry}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Save as new entry
        </button>

        <span style={{ fontSize: 13, opacity: 0.7 }}>
          Draft autosaves. Saving creates a new entry.
        </span>
      </div>

      <hr style={{ margin: "22px 0", opacity: 0.25 }} />

      <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>
        Past entries
      </h2>

      {sortedEntries.length === 0 ? (
        <p style={{ opacity: 0.7 }}>
          No entries yet. Save your first noticing above.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {sortedEntries.map((e) => (
            <div
              key={e.id}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  {formatDate(e.createdAt)}
                </div>

                <button
                  onClick={() => handleDelete(e.id)}
                  style={{
                    fontSize: 13,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                >
                  Delete
                </button>
              </div>

              {e.people?.length ? (
                <div style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
                  {(e.people ?? []).join(", ")}
                </div>
              ) : null}

              {e.tags?.length ? (
                <div
                  style={{
                    marginTop: 8,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  {e.tags.map((t) => (
                    <div
                      key={t}
                      style={{
                        padding: "4px 8px",
                        borderRadius: 999,
                        border: "1px solid rgba(0,0,0,0.12)",
                        fontSize: 12,
                        opacity: 0.85,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              ) : null}

              <div
                style={{
                  marginTop: 8,
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.6,
                }}
              >
                {e.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
