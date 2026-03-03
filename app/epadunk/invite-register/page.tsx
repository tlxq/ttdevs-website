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

  const usernameValid = /^[a-zA-Z0-9_]{3,32}$/.test(username);
  const passwordValid = password.length >= 8;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!usernameValid || !passwordValid) return;
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
        setStatus("success");
      } else {
        setStatus(data.error ?? "Något gick fel!");
      }
    } catch {
      setStatus("Fel vid kontakt med servern.");
    }
    setLoading(false);
  };

  if (status === "success") {
    return (
      <main style={mainStyle}>
        <div style={{ fontSize: 48 }}>🎉</div>
        <h2 style={{ color: "#4caf50", marginBottom: 8 }}>Konto skapat!</h2>
        <p style={{ color: "#555", textAlign: "center" }}>
          Du kan nu logga in i EPA-appen på mobilen med ditt användarnamn och lösenord.
        </p>
      </main>
    );
  }

  return (
    <main style={mainStyle}>
      <h1 style={{ marginBottom: 4 }}>🚗 EPA-appen</h1>
      <p style={{ color: "#666", marginBottom: 24, textAlign: "center" }}>
        Skapa ditt konto för att komma igång
      </p>

      {!token ? (
        <div style={{ color: "red" }}>Ingen giltig invite-länk. Kontakta administratören.</div>
      ) : (
        <form onSubmit={onSubmit} style={formStyle}>
          <label style={labelStyle}>Användarnamn</label>
          <input
            required
            type="text"
            placeholder="t.ex. therese123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: username && !usernameValid ? "red" : "#ccc",
            }}
          />
          {username && !usernameValid && (
            <span style={hintStyle}>
              3–32 tecken, endast bokstäver (a-z), siffror och understreck _
            </span>
          )}

          <label style={{ ...labelStyle, marginTop: 16 }}>Lösenord</label>
          <input
            required
            type="password"
            placeholder="Minst 8 tecken"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...inputStyle,
              borderColor: password && !passwordValid ? "red" : "#ccc",
            }}
          />
          {password && !passwordValid && (
            <span style={hintStyle}>Lösenordet måste vara minst 8 tecken</span>
          )}

          {status && status !== "success" && (
            <div style={{ color: "red", fontSize: 14, textAlign: "center", marginTop: 8 }}>
              {status}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !usernameValid || !passwordValid}
            style={{
              ...btnStyle,
              opacity: loading || !usernameValid || !passwordValid ? 0.5 : 1,
              cursor: loading || !usernameValid || !passwordValid ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Skapar konto..." : "Skapa konto"}
          </button>
        </form>
      )}
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

const mainStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 16px",
};

const formStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 340,
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "#444",
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1.5px solid #ccc",
  fontSize: 16,
  outline: "none",
};

const hintStyle: React.CSSProperties = {
  color: "red",
  fontSize: 12,
  marginTop: 4,
};

const btnStyle: React.CSSProperties = {
  marginTop: 24,
  padding: "13px",
  borderRadius: 8,
  border: "none",
  backgroundColor: "#ffc300",
  color: "#000",
  fontWeight: "bold",
  fontSize: 16,
};
