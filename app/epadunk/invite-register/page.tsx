"use client";
import React, { useState, FormEvent } from "react";

export default function InviteRegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  // Hämta token från URL
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  const token = params.get("token") || "";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(undefined);
    try {
      const res = await fetch("https://DIN-BACKEND/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Användare skapad! Du kan nu logga in i EPA-appen.");
      } else {
        setStatus(data.error ?? "Något gick fel!");
      }
    } catch {
      setStatus("Fel vid kontakt med servern.");
    }
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Registrera EPA-app-konto</h1>
      {!token ? (
        <div style={{ color: "red", margin: 16 }}>Ingen giltig invite-länk!</div>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 12, width: 300 }}
        >
          <input
            required
            type="text"
            placeholder="Användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registrerar..." : "Registrera konto"}
          </button>
        </form>
      )}
      {status && <div style={{ marginTop: 16 }}>{status}</div>}
      <p style={{ fontSize: 14, marginTop: 32 }}>
        När du har registrerat dig kan du logga in i EPA-appen på mobilen!
      </p>
    </main>
  );
}
