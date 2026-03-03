"use client";
import React, { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function InviteRegisterForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const apiUrl = process.env.NEXT_PUBLIC_RAIL_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(undefined);
    try {
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Konto skapat! Du kan nu logga in i EPA-appen.");
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
        padding: "0 16px",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Registrera EPA-app-konto</h1>

      {!token ? (
        <div style={{ color: "red", margin: 16 }}>Ingen giltig invite-länk!</div>
      ) : status?.startsWith("✅") ? (
        <div style={{ color: "green", fontSize: 18, textAlign: "center" }}>{status}</div>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
            maxWidth: 320,
          }}
        >
          <input
            required
            type="text"
            placeholder="Välj ett användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />
          <input
            required
            type="password"
            placeholder="Välj ett lösenord (minst 8 tecken)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#ffc300",
              color: "#000",
              fontWeight: "bold",
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Registrerar..." : "Skapa konto"}
          </button>
          {status && (
            <div style={{ color: "red", fontSize: 14, textAlign: "center" }}>{status}</div>
          )}
        </form>
      )}

      <p style={{ fontSize: 13, marginTop: 32, color: "#888", textAlign: "center" }}>
        När du har registrerat dig kan du logga in i EPA-appen på mobilen.
      </p>
    </main>
  );
}

export default function InviteRegisterPage() {
  return (
    <Suspense>
      <InviteRegisterForm />
    </Suspense>
  );
}
