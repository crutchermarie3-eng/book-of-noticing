"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: string;
  createdAt: string;
  text: string;
  frame?: string;
  people?: string[];
  tags?: string[];
};

const POSSIBLE_ENTRY_KEYS = [
  "noticing_entries_v1",
  "montessori_entries_v1",
  "entries_v1",
];

export default function NoticedPage() {
  const [names, setNames] = useState<string[]>([]);
  const [usedKey, setUsedKey] = useState<string | null>(null);

  useEffect(() => {
    let entries: Entry[] = [];
    let keyFound: string | null = null;

    for (const key of POSSIBLE_ENTRY_KEYS) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;

      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          entries = parsed as Entry[];
          keyFound = key;
          break;
        }
      } catch {
        // ignore bad JSON
      }
    }

    setUsedKey(keyFound);

    const allNames: string[] = [];

    for (const e of entries) {
      if (Array.isArray(e.people) && e.people.length) {
        allNames.push(...e.people);
        continue;
      }

      if (typeof e.frame === "string" && e.frame.trim()) {
        const parts = e.frame
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);
        allNames.push(...parts);
      }
    }

    const uniqueNames = Array.from(new Set(allNames))
      .map((n) => n.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    setNames(uniqueNames);
  }, []);

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <a href="/noticing" style={{ fontSize: 14, textDecoration: "underline" }}>
        ← Noticing
      </a>

      <h1 style={{ fontSize: 32, marginTop: 12, marginBottom: 8 }}>
        The Noticed
      </h1>

      <p style={{ opacity: 0.75, marginBottom: 16 }}>
        The people who have appeared in your observations.
      </p>

      {names.length === 0 ? (
        <div style={{ opacity: 0.75, lineHeight: 1.6 }}>
          <p style={{ marginBottom: 8 }}>Nothing to list yet.</p>
          <p style={{ marginBottom: 0 }}>
            Add a new entry in Noticing with a couple names (comma-separated),
            save, then come back here.
          </p>

          {/* You can delete this debug line later */}
          <p style={{ marginTop: 12, fontSize: 12 }}>
            (Debug: entries key found: {usedKey ?? "none"})
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 10 }}>
          {names.map((name) => (
            <li key={name}>
              <a
                href={`/noticed/${encodeURIComponent(name)}`}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 10,
                  fontSize: 16,
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
