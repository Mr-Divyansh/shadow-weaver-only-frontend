import { CONNECTION_LABELS } from "../types";
import { useAppState, store } from "../store";
import { provider } from "../simulation";

import "./Header.css";

function connectionDot(state: string) {
  switch (state) {
    case "connected":
      return <span className="dot dot-success dot-live" aria-hidden="true" />;
    case "connecting":
    case "reconnecting":
      return <span className="dot dot-warning" aria-hidden="true" />;
    default:
      return <span className="dot dot-critical" aria-hidden="true" />;
  }
}

export function Header() {
  const state = useAppState();
  const mode = state.mode;
  const connection = state.connection;

  function doToggle() {
    const next = mode === "autonomous" ? ("manual" as const) : ("autonomous" as const);
    provider.setMode(next);
  }

  const systemHealthy = state.overview.activeThreats === 0;

  return (
    <header className="app-header">
      <div className="header-brand">
        <span className="brand-mark" aria-hidden="true">
          ◈
        </span>
        <span className="brand-name">Shadow-Weaver</span>
        <span className="brand-sub">Suite</span>
      </div>

      <div className="header-center">
        <div className="header-status" role="status">
          <span
            className={`dot ${systemHealthy ? "dot-success" : "dot-critical"}`}
            aria-hidden="true"
          />
          <span className="status-text">
            {systemHealthy ? "SYSTEM ONLINE" : "THREAT ACTIVE"}
          </span>
        </div>

        <div className="header-divider" aria-hidden="true" />

        <div className="header-status" role="status">
          {connectionDot(connection)}
          <span className="status-text">{CONNECTION_LABELS[connection]}</span>
        </div>

        <div className="header-divider" aria-hidden="true" />

        <div className="header-status" role="status">
          <span
            className={`dot ${mode === "autonomous" ? "dot-info" : "dot-warning"}`}
            aria-hidden="true"
          />
          <span className="status-text">
            {mode === "autonomous" ? "AUTONOMOUS MODE" : "MANUAL APPROVAL"}
          </span>
        </div>

        {connection === "connected" && (
          <>
            <div className="header-divider" aria-hidden="true" />
            <div className="live-indicator" role="status">
              <span className="dot dot-success dot-live" aria-hidden="true" />
              LIVE
            </div>
          </>
        )}
      </div>

      <div className="header-actions">
        <button
          className="btn btn-secondary mode-toggle"
          onClick={doToggle}
          aria-label={`Switch to ${mode === "autonomous" ? "Manual Approval" : "Autonomous"} mode`}
          title={`Switch to ${mode === "autonomous" ? "Manual Approval" : "Autonomous"} mode`}
        >
          <span className={`dot ${mode === "autonomous" ? "dot-info" : "dot-warning"}`} aria-hidden="true" />
          {mode === "autonomous" ? "AUTO" : "MANUAL"}
        </button>
        <button className="btn btn-ghost" aria-label="Settings" onClick={() => store.openSettings()}>
          ⚙
        </button>
      </div>
    </header>
  );
}