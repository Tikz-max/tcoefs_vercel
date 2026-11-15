"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { EASE } from "@/components/site/motion";
import { SubmitButton } from "@/components/site/ui";

export type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  half?: boolean;
  rows?: number;
};

/**
 * Enquiry form with underlined fields and an animated confirmation.
 * Submission is simulated: connect `onSubmit` to a real endpoint to deliver
 * messages.
 */
export function EnquiryForm({
  id,
  fields,
  submitLabel,
  successTitle,
  successBody,
  footnote,
}: {
  id: string;
  fields: FieldSpec[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  footnote?: ReactNode;
}) {
  const [form, setForm] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, ""])),
  );
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Replace with your actual form submission endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="flex min-h-[22rem] flex-col justify-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-pine text-paper">
          <Check className="size-6" />
        </span>
        <h4 className="display display-md mt-8 text-ink">{successTitle}</h4>
        <p className="prose-body mt-4 max-w-md text-stone">{successBody}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      {fields.map((f) => {
        const fieldId = `${id}-${f.name}`;
        const common = {
          id: fieldId,
          name: f.name,
          required: f.required,
          value: form[f.name],
          onChange: handleChange,
          className: "field",
        };
        return (
          <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
            <label htmlFor={fieldId} className="field-label">
              {f.label}
              {!f.required && (
                <span className="ml-2 normal-case tracking-normal opacity-60">
                  optional
                </span>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea
                {...common}
                rows={f.rows ?? 4}
                placeholder={f.placeholder}
                className="field resize-y"
              />
            ) : f.type === "select" ? (
              <select
                {...common}
                className={`field appearance-none bg-[length:1rem] bg-[right_center] bg-no-repeat pr-8 ${
                  form[f.name] ? "" : "text-ink/40"
                }`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2308170f' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                }}
              >
                <option value="">{f.placeholder ?? "Select"}</option>
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={f.type ?? "text"}
                placeholder={f.placeholder}
              />
            )}
          </div>
        );
      })}
      <div className="flex flex-wrap items-center justify-between gap-5 pt-3 sm:col-span-2">
        <SubmitButton disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </SubmitButton>
        {footnote && <p className="text-[0.8125rem] text-stone">{footnote}</p>}
      </div>
    </form>
  );
}
