"use client";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";

type RecipientKey = "tom" | "therese";

interface Person {
  recipientKey: RecipientKey;
  name: string;
}

interface ContactModalProps {
  person: Person;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
  /** Honeypot field to catch bots */
  company: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export default function ContactModal({ person, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((previous) => ({ ...previous, [field]: event.target.value }));

  const resetForm = () => setFormData(INITIAL_FORM_STATE);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setStatus("sending");
      setError("");

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            recipientKey: person.recipientKey,
            ...formData,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setError(data?.error ?? "Failed to send message.");
          return;
        }

        setStatus("success");

        setTimeout(() => {
          onClose();
          setStatus("idle");
          resetForm();
        }, 1500);
      } catch {
        setStatus("error");
        setError("Network error. Please try again.");
      }
    },
    [formData, onClose, person.recipientKey]
  );

  const isSending = status === "sending";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-slideUp relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#BBE1FA]/20 bg-[#1B262C]/95 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.65)] md:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-32 -left-24 h-56 w-56 rounded-full bg-[#3282B8]/20 blur-3xl" />
          <div className="absolute right-0 -bottom-40 h-72 w-72 rounded-full bg-[#0F4C75]/30 blur-3xl" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#BBE1FA]/60 to-transparent" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-10 text-[#BBE1FA]/60 transition-colors transition-transform duration-200 hover:rotate-90 hover:text-[#BBE1FA]"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        {isSuccess ? (
          <SuccessState name={person.name} />
        ) : (
          <>
            <Header name={person.name} />

            {isError && error && (
              <div className="relative z-10 mb-4 rounded-xl border border-red-400/40 bg-red-900/40 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5" noValidate>
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={updateField("company")}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <Field label="Your Name" htmlFor="contact-name">
                <input
                  id="contact-name"
                  required
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={updateField("name")}
                  className="w-full rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                />
              </Field>

              <Field label="Your Email" htmlFor="contact-email">
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={updateField("email")}
                  className="w-full rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                />
              </Field>

              <Field label="Message" htmlFor="contact-message">
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Tell us about your idea, timeline, and goals…"
                  value={formData.message}
                  onChange={updateField("message")}
                  className="w-full resize-none rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                />
              </Field>

              <button
                type="submit"
                disabled={isSending}
                className="w-full rounded-xl bg-gradient-to-r from-[#3282B8] to-[#BBE1FA] py-3 text-sm font-semibold text-[#1B262C] shadow-lg shadow-[#0F4C75]/40 transition-shadow transition-transform duration-200 hover:scale-[1.01] hover:shadow-[#3282B8]/50 disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

interface SuccessStateProps {
  name: string;
}

function SuccessState({ name }: SuccessStateProps) {
  return (
    <div className="relative z-10 py-8 text-center">
      <CheckCircleIcon className="mx-auto mb-4 h-20 w-20 text-[#BBE1FA] drop-shadow-[0_0_18px_rgba(187,225,250,0.8)]" />
      <h3 className="mb-2 text-3xl font-bold text-[#BBE1FA]">Message sent!</h3>
      <p className="text-sm text-[#BBE1FA]/80">{name} will get back to you soon.</p>
    </div>
  );
}

interface HeaderProps {
  name: string;
}

function Header({ name }: HeaderProps) {
  return (
    <header className="relative z-10 mb-6">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#BBE1FA]/30 bg-[#0F4C75]/60 px-3 py-1 text-xs font-medium text-[#BBE1FA]/80 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-[#BBE1FA] shadow-[0_0_10px_#BBE1FA]" />
        Contact {name}
      </div>

      <h2 className="mb-2 text-3xl font-bold text-[#BBE1FA] md:text-4xl">
        Let&apos;s talk about your project
      </h2>
      <p className="text-sm text-[#BBE1FA]/75">
        Share a bit about what you&apos;re building — we&apos;ll get back to you as soon as
        possible.
      </p>
    </header>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-[#BBE1FA]/90">
        {label}
      </label>
      {children}
    </div>
  );
}
