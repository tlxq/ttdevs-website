"use client";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface ContactModalProps {
  person: {
    recipientKey: "tom" | "therese";
    name: string; // display name
  };
  onClose: () => void;
}

// Palette:
// #1B262C (dark base)  #0F4C75 (deep blue)
// #3282B8 (accent)     #BBE1FA (light)

export default function ContactModal({ person, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientKey: person.recipientKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(data?.error ?? "Failed to send message.");
        return;
      }

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setFormData({ name: "", email: "", message: "", company: "" });
      }, 1500);
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  };

  return (
    <div
      className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-slideUp relative w-full max-w-xl overflow-hidden rounded-3xl border border-[#BBE1FA]/20 bg-[#1B262C]/95 p-8 shadow-[0_18px_60px_rgba(0,0,0,0.65)] md:p-10"
      >
        {/* soft gradient rim using palette */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className="absolute -top-32 -left-24 h-56 w-56 rounded-full bg-[#3282B8]/20 blur-3xl" />
          <div className="absolute right-0 -bottom-40 h-72 w-72 rounded-full bg-[#0F4C75]/30 blur-3xl" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#BBE1FA]/60 to-transparent" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 text-[#BBE1FA]/60 transition-colors transition-transform duration-200 hover:rotate-90 hover:text-[#BBE1FA]"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-7 w-7" />
        </button>

        {status === "success" ? (
          <div className="relative z-10 py-8 text-center">
            <CheckCircleIcon className="mx-auto mb-4 h-20 w-20 text-[#BBE1FA] drop-shadow-[0_0_18px_rgba(187,225,250,0.8)]" />
            <h3 className="mb-2 text-3xl font-bold text-[#BBE1FA]">Message Sent!</h3>
            <p className="text-sm text-[#BBE1FA]/80">{person.name} will get back to you soon.</p>
          </div>
        ) : (
          <>
            <div className="relative z-10 mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#BBE1FA]/30 bg-[#0F4C75]/60 px-3 py-1 text-xs font-medium text-[#BBE1FA]/80 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#BBE1FA] shadow-[0_0_10px_#BBE1FA]" />
                Contact {person.name}
              </div>

              <h2 className="mb-2 text-3xl font-bold text-[#BBE1FA] md:text-4xl">
                Let&apos;s talk about your project
              </h2>
              <p className="text-sm text-[#BBE1FA]/75">
                Share a bit about what you&apos;re building — we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>

            {status === "error" && error ? (
              <div className="relative z-10 mb-4 rounded-xl border border-red-400/40 bg-red-900/40 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) => setFormData((s) => ({ ...s, company: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#BBE1FA]/90">
                  Your Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#BBE1FA]/90">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((s) => ({ ...s, email: e.target.value }))}
                  required
                  className="w-full rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#BBE1FA]/90">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData((s) => ({ ...s, message: e.target.value }))}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#BBE1FA]/25 bg-[#0F4C75]/50 px-4 py-3 text-sm text-[#BBE1FA] outline-none placeholder:text-[#BBE1FA]/40 focus:border-[#BBE1FA]/70 focus:ring-0"
                  placeholder="Tell us about your idea, timeline, and goals…"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-gradient-to-r from-[#3282B8] to-[#BBE1FA] py-3 text-sm font-semibold text-[#1B262C] shadow-lg shadow-[#0F4C75]/40 transition-shadow transition-transform duration-200 hover:scale-[1.01] hover:shadow-[#3282B8]/50 disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
