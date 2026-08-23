import { useAppState } from "../store";
import { ENTITY_LABELS, type EntityId } from "../types";

import "./SystemHealth.css";

const ORDER: EntityId[] = ["red_team", "blue_team", "honeypot"];

function meterClass(health: { cpu: number; memory: number; status: string }) {
  if (health.status === "offline") return "meter-offline";
  const avg = (health.cpu + health.memory) / 2;
  if (avg >= 85) return "meter-critical";
  if (avg >= 65) return "meter-warning";
  return "meter-healthy";
}

export function SystemHealth() {
  const state = useAppState();

  return (
    <div className="health-list">
      {ORDER.map((id) => {
        const h = state.health[id];
        const cls = meterClass(h);
        return (
          <div key={id} className="health-item">
            <div className="health-row">
              <span className="health-name">{ENTITY_LABELS[id]}</span>
              <span className="health-status">
                {h.status === "offline" ? (
                  <span className="status-text" style={{ color: "var(--status-critical)" }}>
                    OFFLINE
                  </span>
                ) : (
                  <span className="status-text" style={{ color: "var(--status-success)" }}>
                    HEALTHY
                  </span>
                )}
              </span>
            </div>
            <div className="meter-row">
              <span className="meter-label">CPU</span>
              <div className="meter">
                <div className={`meter-fill ${cls}`} style={{ width: `${h.cpu}%` }} role="meter" aria-valuenow={Math.round(h.cpu)} aria-valuemin={0} aria-valuemax={100} aria-label={`${ENTITY_LABELS[id]} CPU`} />
              </div>
              <span className="meter-value">{Math.round(h.cpu)}%</span>
            </div>
            <div className="meter-row">
              <span className="meter-label">MEM</span>
              <div className="meter">
                <div className={`meter-fill ${cls}`} style={{ width: `${h.memory}%` }} role="meter" aria-valuenow={Math.round(h.memory)} aria-valuemin={0} aria-valuemax={100} aria-label={`${ENTITY_LABELS[id]} memory`} />
              </div>
              <span className="meter-value">{Math.round(h.memory)}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}