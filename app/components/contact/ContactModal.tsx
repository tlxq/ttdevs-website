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

export default function ContactModal({ person, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    company: "", // honeypot
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 rounded-3xl shadow-2xl max-w-xl w-full p-8 md:p-10 relative animate-slideUp border border-neutral-200 dark:border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors duration-200 hover:rotate-90 transition-transform"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-7 h-7" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <CheckCircleIcon className="w-20 h-20 text-emerald-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {person.name} will get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
                Contact {person.name}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            {status === "error" && error ? (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, company: e.target.value }))
                }
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                  Your Name
                </label>
                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, name: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, email: e.target.value }))
                  }
                  required
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((s) => ({ ...s, message: e.target.value }))
                  }
                  required
                  rows={5}
                  className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/60 px-4 py-3 outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 transition disabled:opacity-60"
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
