const DIMENSIONS = [
  { label: "Stresse", value: 90 },
  { label: "Reconnaissance", value: 84 },
  { label: "Vie perso/pro", value: 92 },
  { label: "Relation d'equipe", value: 72 },
  { label: "Charge de travail", value: 65 },
  { label: "Engagement", value: 76 },
];

const CENTER = 140;
const MAX_RADIUS = 95;
const LEVELS = [0.33, 0.66, 1];

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

function hexagonPoints(radius: number) {
  return Array.from({ length: 6 })
    .map((_, i) => {
      const { x, y } = polarToCartesian(i * 60, radius);
      return `${x},${y}`;
    })
    .join(" ");
}

export default function RadarChart() {
  const dataPoints = DIMENSIONS.map((d, i) => {
    const r = (d.value / 100) * MAX_RADIUS;
    return polarToCartesian(i * 60, r);
  });

  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg
      viewBox="0 0 280 280"
      className="w-full h-auto"
      role="img"
      aria-label="Score radar chart"
    >
      <title>Score radar chart</title>
      {/* Grid levels */}
      {LEVELS.map((level) => (
        <polygon
          key={level}
          points={hexagonPoints(MAX_RADIUS * level)}
          fill="none"
          stroke="var(--color-gray-100)"
          strokeWidth="1"
        />
      ))}

      {/* Axes */}
      {DIMENSIONS.map((d, i) => {
        const { x, y } = polarToCartesian(i * 60, MAX_RADIUS);
        return (
          <line
            key={d.label}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="var(--color-gray-100)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={dataPolygon}
        fill="var(--color-primary-500)"
        fillOpacity="0.15"
        stroke="var(--color-primary-500)"
        strokeWidth="2"
      />

      {/* Data points */}
      {/* {dataPoints.map((p, i) => (
        <circle
          key={DIMENSIONS[i].label}
          cx={p.x}
          cy={p.y}
          r="0"
          fill="var(--color-primary-500)"
        />
      ))} */}

      {/* Value labels */}
      {DIMENSIONS.map((d, i) => {
        const { x, y } = polarToCartesian(i * 60, MAX_RADIUS + 20);
        return (
          <text
            key={d.label}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gray-900 text-sm font-bold"
          >
            {d.value}
          </text>
        );
      })}
    </svg>
  );
}
