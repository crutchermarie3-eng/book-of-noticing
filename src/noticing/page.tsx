"use client";

import { useEffect, useMemo, useState } from "react";

type Entry = {
  id: string;
  createdAt: string; // ISO
  frame?: string; // Who’s in the frame?
  text: string; // Noticing
};

const DRAFT_TEXT_KEY = "noticing_draft_text_v1";
const DRAFT_FRAME_KEY = "noticing_draft_frame_v1";
const ENTRIES_KEY = "noticing_entries_v1";

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default function NoticingPage() {
  const [frame, setFrame] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  // Load draft + entries once
  useEffect(() => {
    setFrame(localStorage.getItem(DRAFT_FRAME_KEY) ?? "");
    setText(localStorage.getItem(DRAFT_TEXT_KEY) ?? "");
    setEntries(safeParse<Entry[]>(localStorage.getItem(ENTRIES_KEY), []));
  }, []);

  // Autosave draft as you type
  useEffect(() => {
    localStorage.setItem(DRAFT_FRAME_KEY, frame);
  }, [frame]);

  useEffect(() => {
    localStorage.setItem(DRAFT_TEXT_KEY, text);
  }, [text]);

  // Persist entries whenever they change
  useEffect(() => {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }, [entries]);

  const sortedEntries = useMemo(() => {
    return [...entries].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }, [entries]);

  const handleSaveEntry = () => {
    const trimmedText = text.trim();
    const trimmedFrame = frame.trim();

    if (!trimmedText) return;

    const now = new Date();
    const entry: Entry = {
      id: crypto.randomUUID(),
      createdAt: now.toISOString(),
      frame: trimmedFrame || undefined,
      text: trimmedText,
    };

    setEntries((prev) => [entry, ...prev]);

    // clear draft after saving
    setFrame("");
    setText("");
    localStorage.removeItem(DRAFT_FRAME_KEY);
    localStorage.removeItem(DRAFT_TEXT_KEY);
  };

  const handleClearDraft = () => {
    setFrame("");
    setText("");
    localStorage.removeItem(DRAFT_FRAME_KEY);
    localStorage.removeItem(DRAFT_TEXT_KEY);
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

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 6 }}>
        Take a breath.
      </h1>

      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          marginBottom: 18,
          opacity: 0.85,
        }}
      >
        nonjudgmental, ongoing, and open-ended.
      </p>

      <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
        Who’s in the frame?
      </label>

      <input
        value={frame}
        onChange={(e) => setFrame(e.target.value)}
        placeholder="Names, team, role… (optional)"
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.15)",
          outline: "none",
          marginBottom: 14,
        }}
      />

      <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
        Noticing
      </label>

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

        <button
          onClick={handleClearDraft}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            cursor: "pointer",
          }}
        >
          Clear draft
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
                  {e.frame ? ` • ${e.frame}` : ""}
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
