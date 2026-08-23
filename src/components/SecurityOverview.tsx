import { useAppState } from "../store";

import "./SecurityOverview.css";

export function SecurityOverview() {
  const state = useAppState();
  const o = state.overview;

  const cards = [
    { label: "Active Threats", value: o.activeThreats, critical: o.activeThreats > 0 },
    { label: "Threats Detected", value: o.threatsDetected, critical: false },
    { label: "Threats Contained", value: o.threatsContained, critical: false },
    { label: "Honeypot Captures", value: o.honeypotCaptures, critical: false },
    { label: "Network Traffic", value: `${o.networkTraffic} req/s`, critical: o.activeThreats > 0 },
    { label: "System Health", value: o.systemHealth, critical: o.activeThreats > 0 },
  ];

  return (
    <section className="security-overview" aria-label="Security Overview">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`metric-card ${card.critical ? "metric-critical" : ""}`}
          role="status"
        >
          <span className="metric-label">{card.label}</span>
          <span className="metric-value">{card.value}</span>
        </div>
      ))}
    </section>
  );
}