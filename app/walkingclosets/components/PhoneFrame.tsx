import React from "react";

type PhoneFrameProps = {
  title?: string;
  leftSlot?: React.ReactNode;
  children: React.ReactNode;
};

export default function PhoneFrame({ title, leftSlot, children }: PhoneFrameProps) {
  return (
    <div style={styles.stage}>
      <div style={styles.shell}>
        {leftSlot ? <div style={styles.left}>{leftSlot}</div> : null}

        <div style={styles.center}>
          <div style={styles.phoneWrap}>
            <div style={styles.phone}>
              <div style={styles.notch} />

              <div style={styles.statusBar}>
                <span style={styles.statusText}>9:41</span>
                <span style={styles.statusText}>◉ ︙▮▮▮</span>
              </div>

              <div style={styles.header}>
                <div style={styles.headerTitle}>{title ?? ""}</div>
              </div>

              <div style={styles.content}>{children}</div>

              <div style={styles.homeArea}>
                <div style={styles.homeIndicator} />
              </div>
            </div>

            <div style={styles.caption}>
              <div style={styles.captionTitle}>Walking Closets</div>
              <div style={styles.captionSub}>Prototype inside a phone frame</div>
            </div>
          </div>
        </div>

        {/* right spacer to keep phone truly centered even with a left sidebar */}
        <div style={styles.rightSpacer} />
      </div>
    </div>
  );
}

const SIDEBAR_W = 260;

const styles: Record<string, React.CSSProperties> = {
  stage: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    background: "var(--wc-stage-bg)",
  },

  /* 3-column layout: left sidebar, centered phone, right spacer */
  shell: {
    width: "min(1100px, 100%)",
    display: "grid",
    gridTemplateColumns: `${SIDEBAR_W}px 1fr ${SIDEBAR_W}px`,
    alignItems: "start",
    gap: 18,
  },

  left: {
    position: "sticky",
    top: 24,
    alignSelf: "start",
    justifySelf: "start",
    width: SIDEBAR_W,
  },

  center: {
    display: "grid",
    justifyItems: "center",
  },

  rightSpacer: {
    width: SIDEBAR_W,
  },

  phoneWrap: {
    display: "grid",
    justifyItems: "center",
    gap: 16,
  },

  phone: {
    width: 390,
    height: 844,
    background: "var(--wc-surface)",
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
    color: "var(--wc-text)",
  },

  header: {
    padding: "10px 18px 12px",
    borderBottom: "1px solid var(--wc-border)",
  },

  headerTitle: {
    fontSize: 13,
    color: "var(--wc-muted)",
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
    background: "var(--wc-text)",
    opacity: 0.12,
  },

  caption: {
    textAlign: "center",
    maxWidth: 520,
  },

  captionTitle: {
    fontWeight: 800,
    color: "white",
  },

  captionSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    marginTop: 4,
  },
};
