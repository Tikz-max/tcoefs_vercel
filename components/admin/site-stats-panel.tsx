"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import type { SiteStat } from "@/lib/types/database";
import {
  deleteSiteStat,
  getAllSiteStats,
  refreshPublicSite,
  saveSiteStat,
} from "@/lib/services/content";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent";

type Draft = { id: string | null; label: string; description: string; value: string; suffix: string };

const blank: Draft = { id: null, label: "", description: "", value: "0", suffix: "+" };

export function SiteStatsPanel({ updatedBy }: { updatedBy?: string }) {
  const [rows, setRows] = useState<Draft[]>([]);
  const [missingTable, setMissingTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busyIndex, setBusyIndex] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    const result = await getAllSiteStats();
    setRows(
      result.stats.map((s: SiteStat) => ({
        id: s.id,
        label: s.label,
        description: s.description,
        value: String(s.value),
        suffix: s.suffix,
      })),
    );
    setMissingTable(result.missingTable);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const report = (ok: boolean, text: string) => {
    setMessage({ ok, text });
    window.setTimeout(() => setMessage(null), 5000);
  };

  const update = (index: number, patch: Partial<Draft>) =>
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)));

  const save = async (index: number) => {
    const row = rows[index];
    if (!row.label.trim()) return report(false, "Please give the figure a title.");
    const value = Number(row.value);
    if (!Number.isFinite(value) || value < 0) return report(false, "The number must be zero or more.");
    setBusyIndex(index);
    const result = await saveSiteStat(
      { label: row.label.trim(), description: row.description.trim(), value: Math.round(value), suffix: row.suffix.trim() },
      row.id,
      index + 1,
      updatedBy,
    );
    setBusyIndex(null);
    if (!result.success) return report(false, result.error ?? "Could not save.");
    await load();
    await refreshPublicSite(["/"]);
    report(true, "Saved. The homepage will show the new figure.");
  };

  const remove = async (index: number) => {
    const row = rows[index];
    if (!row.id) return setRows((prev) => prev.filter((_, i) => i !== index));
    if (!window.confirm("Remove this figure from the homepage?")) return;
    const result = await deleteSiteStat(row.id);
    if (!result.success) return report(false, result.error ?? "Could not remove.");
    await load();
    await refreshPublicSite(["/"]);
    report(true, "Figure removed.");
  };

  if (loading) return <p className="text-gray-600">Loading…</p>;

  if (missingTable) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
        <h3 className="font-semibold mb-2">One-time setup needed</h3>
        <p className="text-sm">
          Run <code>supabase/cms.sql</code> in the Supabase SQL Editor, then
          reload this page. Until then the homepage shows its default figures.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2f3e2f]">Homepage figures</h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            The large numbers shown under the introduction on the homepage.
            Keep them accurate and up to date.
          </p>
        </div>
        <button
          onClick={() => setRows((prev) => [...prev, { ...blank }])}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d]"
        >
          <Plus className="w-4 h-4" /> Add figure
        </button>
      </div>

      {message && (
        <div
          role="status"
          className={`rounded-lg px-4 py-3 text-sm ${
            message.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <ul className="space-y-4">
        {rows.map((row, index) => (
          <li key={row.id ?? `new-${index}`} className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="grid sm:grid-cols-12 gap-4">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={0}
                    className={inputClass}
                    value={row.value}
                    onChange={(e) => update(index, { value: e.target.value })}
                  />
                  <input
                    aria-label="Symbol after the number"
                    className={`${inputClass} w-20`}
                    value={row.suffix}
                    onChange={(e) => update(index, { suffix: e.target.value })}
                    placeholder="+"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input className={inputClass} value={row.label} onChange={(e) => update(index, { label: e.target.value })} />
              </div>
              <div className="sm:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Short explanation</label>
                <input className={inputClass} value={row.description} onChange={(e) => update(index, { description: e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => save(index)}
                disabled={busyIndex === index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {busyIndex === index ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => remove(index)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
