import React from "react";

type PhoneFrameProps = {
  title?: string;
  children: React.ReactNode;
};

export default function PhoneFrame({ title, children }: PhoneFrameProps) {
  return (
    <div style={styles.stage}>
      <div style={styles.phone}>
        {/* notch */}
        <div style={styles.notch} />

        {/* status bar */}
        <div style={styles.statusBar}>
          <span style={styles.statusText}>9:41</span>
          <span style={styles.statusText}>◉ ︙▮▮▮</span>
        </div>

        {/* header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>{title ?? ""}</div>
        </div>

        {/* content */}
        <div style={styles.content}>{children}</div>

        {/* home indicator */}
        <div style={styles.homeArea}>
          <div style={styles.homeIndicator} />
        </div>
      </div>

      <div style={styles.caption}>
        <div style={styles.captionTitle}>Walking Closets</div>
        <div style={styles.captionSub}>Next.js + TypeScript prototype inside a phone frame</div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  stage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    gap: 16,
    background: "radial-gradient(1100px 700px at 20% 20%, #1c1c28 0%, #0b0b0f 55%, #07070a 100%)",
  },
  phone: {
    width: 390,
    height: 844,
    background: "#fff",
    borderRadius: 44,
    boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
    border: "10px solid rgba(255,255,255,0.08)",
    position: "relative",
    overflow: "hidden",
  },
  notch: {
    position: "absolute",
    top: 12,
    left: "50%",
    transform: "translateX(-50%)",
    width: 160,
    height: 28,
    background: "#0b0b0f",
    borderRadius: 18,
    opacity: 0.9,
    zIndex: 3,
  },
  statusBar: {
    height: 44,
    padding: "10px 18px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  statusText: {
    fontSize: 12,
    color: "#111827",
  },
  header: {
    padding: "10px 18px 12px",
    borderBottom: "1px solid #e5e7eb",
  },
  headerTitle: {
    fontSize: 13,
    color: "#6b7280",
  },
  content: {
    height: "calc(100% - 44px - 52px - 34px)",
    padding: 18,
    overflow: "auto",
  },
  homeArea: {
    height: 34,
    display: "grid",
    placeItems: "center",
  },
  homeIndicator: {
    width: 140,
    height: 5,
    borderRadius: 999,
    background: "#111827",
    opacity: 0.12,
  },
  caption: {
    textAlign: "center",
    maxWidth: 520,
  },
  captionTitle: {
    fontWeight: 700,
    color: "white",
  },
  captionSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginTop: 4,
  },
};
