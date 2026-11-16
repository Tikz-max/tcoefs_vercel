"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImage } from "@/lib/services/content";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316840] focus:border-transparent";

/** Upload a picture from the computer, or paste an address. Shows a preview. */
export function ImageUploadField({
  label,
  value,
  onChange,
  help,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  help?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    const result = await uploadImage(file);
    setBusy(false);
    if (!result.success || !result.data) {
      setError(result.error ?? "Upload failed.");
      return;
    }
    onChange(result.data.url);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative w-full sm:w-44 h-28 shrink-0 rounded-lg border border-dashed border-gray-300 bg-gray-50 overflow-hidden grid place-items-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <ImagePlus className="w-7 h-7 text-gray-400" />
          )}
          {busy && (
            <div className="absolute inset-0 bg-white/80 grid place-items-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#316840]" />
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#316840] text-white rounded-lg hover:bg-[#2d5a2d] disabled:opacity-50"
            >
              <ImagePlus className="w-4 h-4" />
              {value ? "Replace picture" : "Upload picture"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
            className="hidden"
            onChange={(e) => {
              handleFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…or paste a picture address"
            className={inputClass}
          />
          <p className="text-xs text-gray-500">
            {help ??
              "JPG, PNG or WebP up to 12 MB. Large pictures are resized automatically."}
          </p>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

/** Upload several pictures at once; calls back with the new addresses. */
export function GalleryUploadButton({
  onAdd,
}: {
  onAdd: (urls: string[]) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const result = await uploadImage(file);
      if (result.success && result.data) urls.push(result.data.url);
      else setError(result.error ?? "One picture could not be uploaded.");
    }
    setBusy(false);
    if (urls.length) onAdd(urls);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2 border border-[#316840] text-[#316840] rounded-lg hover:bg-[#316840]/5 disabled:opacity-50"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
        {busy ? "Uploading…" : "Upload pictures"}
      </button>
      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
