import { useState } from "react";
import { useAppState } from "../store";
import { provider } from "../simulation";
import { PHASE_STEPS } from "../types";

import "./SimulationControls.css";

export function SimulationControls() {
  const state = useAppState();
  const sim = state.simulation;
  const connected = state.connection === "connected";
  const [confirmKill, setConfirmKill] = useState(false);

  const currentIdx = PHASE_STEPS.findIndex((s) => s.id === sim.phase);
  const running = sim.running;

  function start() {
    provider.startSimulation();
  }

  function kill() {
    if (!confirmKill) {
      setConfirmKill(true);
      return;
    }
    provider.stopSimulation();
    setConfirmKill(false);
  }

  return (
    <div className="sim-controls">
      <div className="sim-stepper" role="list" aria-label="Simulation lifecycle">
        {PHASE_STEPS.map((step, i) => {
          const done = i < currentIdx;
          const active = i === currentIdx;
          return (
            <div
              key={step.id}
              className={`sim-step ${active ? "active" : ""} ${done ? "done" : ""}`}
              role="listitem"
            >
              <span className="sim-step-dot" aria-hidden="true" />
              <span className="sim-step-label">{step.label}</span>
            </div>
          );
        })}
      </div>

      <div className="sim-actions">
        <button
          className="btn btn-primary"
          onClick={start}
          disabled={!connected || running || sim.phase === "completed"}
        >
          {sim.phase === "completed" ? "COMPLETED" : running ? "RUNNING..." : "START SIMULATION"}
        </button>

        <button
          className={`btn ${confirmKill ? "btn-danger" : "btn-secondary"} kill-btn`}
          onClick={kill}
          disabled={!connected || (!running && !confirmKill)}
          aria-label="Stop the active simulation"
        >
          {confirmKill ? "CONFIRM STOP?" : "KILL SWITCH"}
        </button>
      </div>

      {sim.stopped && (
        <div className="sim-stopped" role="status">
          <span className="status-text" style={{ color: "var(--status-warning)" }}>
            SIMULATION STOPPED
          </span>
        </div>
      )}
    </div>
  );
}