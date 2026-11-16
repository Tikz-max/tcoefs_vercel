"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import type { HeroSlide } from "@/lib/types/database";
import {
  addHeroSlide,
  deleteHeroSlide,
  getAllHeroSlides,
  refreshPublicSite,
  saveHeroOrder,
  updateHeroSlide,
} from "@/lib/services/content";
import { ImageUploadField } from "@/components/admin/image-upload-field";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent";

export function HeroSlidesPanel({ updatedBy }: { updatedBy?: string }) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [missingTable, setMissingTable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState({ image_url: "", alt_text: "", caption: "" });

  const load = useCallback(async () => {
    const result = await getAllHeroSlides();
    setSlides(result.slides);
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

  const afterChange = async (text: string) => {
    await load();
    await refreshPublicSite(["/"]);
    report(true, text);
  };

  const handleAdd = async () => {
    if (!draft.image_url) return report(false, "Please upload a picture first.");
    const result = await addHeroSlide(draft, slides.length + 1, updatedBy);
    if (!result.success) return report(false, result.error ?? "Could not add the picture.");
    setDraft({ image_url: "", alt_text: "", caption: "" });
    setAdding(false);
    await afterChange("Picture added to the homepage.");
  };

  const move = async (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= slides.length) return;
    const next = [...slides];
    [next[index], next[target]] = [next[target], next[index]];
    setSlides(next);
    const result = await saveHeroOrder(next.map((s) => s.id));
    if (!result.success) return report(false, result.error ?? "Could not save the order.");
    await afterChange("Order saved.");
  };

  const toggle = async (slide: HeroSlide) => {
    const result = await updateHeroSlide(slide.id, { is_active: !slide.is_active }, updatedBy);
    if (!result.success) return report(false, result.error ?? "Could not update.");
    await afterChange(slide.is_active ? "Picture hidden from the homepage." : "Picture is showing again.");
  };

  const saveText = async (slide: HeroSlide, field: "alt_text" | "caption", value: string) => {
    if (value === slide[field]) return;
    const result = await updateHeroSlide(slide.id, { [field]: value }, updatedBy);
    if (!result.success) return report(false, result.error ?? "Could not save.");
    await afterChange("Saved.");
  };

  const replaceImage = async (slide: HeroSlide, url: string) => {
    if (!url) return;
    const result = await updateHeroSlide(slide.id, { image_url: url }, updatedBy);
    if (!result.success) return report(false, result.error ?? "Could not save.");
    await afterChange("Picture replaced.");
  };

  const remove = async (slide: HeroSlide) => {
    if (!window.confirm("Remove this picture from the homepage?")) return;
    const result = await deleteHeroSlide(slide.id);
    if (!result.success) return report(false, result.error ?? "Could not remove.");
    await afterChange("Picture removed.");
  };

  if (loading) return <p className="text-gray-600">Loading…</p>;

  if (missingTable) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-900">
        <h3 className="font-semibold mb-2">One-time setup needed</h3>
        <p className="text-sm">
          The homepage pictures table has not been created yet. In Supabase open
          the <strong>SQL Editor</strong>, paste the contents of{" "}
          <code>supabase/cms.sql</code> from the project, and click{" "}
          <strong>Run</strong>. Then reload this page. Until then the homepage
          keeps showing its default pictures.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2f3e2f]">Homepage pictures</h2>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            These pictures rotate behind the main headline on the homepage. Use
            wide, bright photographs (landscape works best). Changes appear on
            the live site within moments.
          </p>
        </div>
        <button
          onClick={() => setAdding((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d]"
        >
          <Plus className="w-4 h-4" /> Add picture
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

      {adding && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <ImageUploadField
            label="Picture"
            value={draft.image_url}
            onChange={(url) => setDraft({ ...draft, image_url: url })}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short caption (optional)
              </label>
              <input
                className={inputClass}
                value={draft.caption}
                onChange={(e) => setDraft({ ...draft, caption: e.target.value })}
                placeholder="e.g. Greenhouse complex"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Describe the picture (for screen readers)
              </label>
              <input
                className={inputClass}
                value={draft.alt_text}
                onChange={(e) => setDraft({ ...draft, alt_text: e.target.value })}
                placeholder="e.g. Staff inspecting seedlings in the greenhouse"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="px-5 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d]">
              Save picture
            </button>
            <button onClick={() => setAdding(false)} className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}

      {slides.length === 0 ? (
        <p className="text-gray-600 bg-white border border-gray-200 rounded-lg p-6">
          No pictures yet, so the homepage uses its default pictures. Add one
          above to take control.
        </p>
      ) : (
        <ul className="space-y-4">
          {slides.map((slide, index) => (
            <li
              key={slide.id}
              className={`bg-white border rounded-lg p-4 sm:p-5 ${slide.is_active ? "border-gray-200" : "border-dashed border-gray-300 opacity-70"}`}
            >
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="lg:w-1/2">
                  <ImageUploadField
                    label={`Picture ${index + 1}`}
                    value={slide.image_url}
                    onChange={(url) => replaceImage(slide, url)}
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Caption</label>
                    <input
                      className={inputClass}
                      defaultValue={slide.caption}
                      onBlur={(e) => saveText(slide, "caption", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description for screen readers</label>
                    <input
                      className={inputClass}
                      defaultValue={slide.alt_text}
                      onBlur={(e) => saveText(slide, "alt_text", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button onClick={() => move(index, -1)} disabled={index === 0} className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40">
                      <ArrowUp className="w-4 h-4" /> Move up
                    </button>
                    <button onClick={() => move(index, 1)} disabled={index === slides.length - 1} className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40">
                      <ArrowDown className="w-4 h-4" /> Move down
                    </button>
                    <button onClick={() => toggle(slide)} className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                      {slide.is_active ? (<><EyeOff className="w-4 h-4" /> Hide</>) : (<><Eye className="w-4 h-4" /> Show</>)}
                    </button>
                    <button onClick={() => remove(slide)} className="inline-flex items-center gap-1 px-3 py-2 border border-red-200 text-red-700 rounded-lg text-sm hover:bg-red-50">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
