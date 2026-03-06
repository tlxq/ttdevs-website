"use client";

import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useCallback, useState } from "react";
import type { SelectedPerson } from "../../lib/types";
import { Modal } from "../../lib/components/Modal";
import { Input } from "../../lib/components/Input";
import { Button } from "../../lib/components/Button";

interface ContactModalProps {
  person: SelectedPerson;
  onClose: () => void;
}

type Status = "idle" | "sending" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
  /** Honeypot field — must stay empty to pass spam check */
  company: string;
}

const INITIAL_FORM_STATE: FormState = { name: "", email: "", message: "", company: "" };

export default function ContactModal({ person, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");

  const updateField =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("sending");
      setSubmitError("");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ recipientKey: person.recipientKey, ...formData }),
        });
        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setSubmitError(data?.error ?? "Failed to send message.");
          return;
        }

        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData(INITIAL_FORM_STATE);
        }, 1500);
      } catch {
        setStatus("error");
        setSubmitError("Network error. Please try again.");
      }
    },
    [formData, onClose, person.recipientKey],
  );

  const isSending = status === "sending";
  const isSuccess = status === "success";

  return (
    <Modal onClose={onClose}>
      {/* Ambient glow decorations */}
      <div className="tt-modal-glow">
        <div className="tt-modal-glow-top" />
        <div className="tt-modal-glow-bottom" />
        <div className="tt-modal-glow-line" />
      </div>

      <Button
        variant="ghost"
        type="button"
        onClick={onClose}
        aria-label="Close modal"
        className="tt-modal-close"
      >
        <XMarkIcon className="h-7 w-7" />
      </Button>

      {isSuccess ? (
        <div className="tt-modal-success">
          <CheckCircleIcon className="tt-modal-success-icon" />
          <h3 className="tt-modal-success-title">Message sent!</h3>
          <p className="tt-modal-success-msg">{person.name} will get back to you soon.</p>
        </div>
      ) : (
        <>
          <header className="tt-modal-header">
            <div className="tt-modal-label">
              <span className="tt-online-dot" />
              Contact {person.name}
            </div>
            <h2 className="tt-modal-heading">Let&apos;s talk about your project</h2>
            <p className="tt-modal-subtext">
              Share a bit about what you&apos;re building — we&apos;ll get back to you as soon as
              possible.
            </p>
          </header>

          {status === "error" && submitError && (
            <div className="tt-form-error" role="alert">{submitError}</div>
          )}

          <form onSubmit={handleSubmit} className="tt-modal-form" noValidate>
            {/* Honeypot (hidden from real users) */}
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

            <Input
              label="Your Name"
              required
              placeholder="Jane Doe"
              value={formData.name}
              onChange={updateField("name")}
            />
            <Input
              label="Your Email"
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={updateField("email")}
            />
            <Input
              as="textarea"
              label="Message"
              required
              rows={5}
              placeholder="Tell us about your idea, timeline, and goals…"
              value={formData.message}
              onChange={updateField("message")}
            />

            <Button
              type="submit"
              disabled={isSending}
              className="tt-btn-submit"
              variant="primary"
            >
              {isSending ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
}
