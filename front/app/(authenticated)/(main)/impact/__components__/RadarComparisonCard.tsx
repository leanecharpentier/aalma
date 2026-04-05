const DIMENSIONS = [
	{ label: "90", valueBefore: 75, valueAfter: 90 },
	{ label: "84", valueBefore: 70, valueAfter: 84 },
	{ label: "92", valueBefore: 80, valueAfter: 92 },
	{ label: "65", valueBefore: 55, valueAfter: 65 },
	{ label: "72", valueBefore: 60, valueAfter: 72 },
	{ label: "76", valueBefore: 65, valueAfter: 76 },
];

const CENTER = 140;
const MAX_RADIUS = 90;
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

function dataPolygon(values: number[]) {
	return values
		.map((v, i) => {
			const r = (v / 100) * MAX_RADIUS;
			const { x, y } = polarToCartesian(i * 60, r);
			return `${x},${y}`;
		})
		.join(" ");
}

export default function RadarComparisonCard() {
	const beforeValues = DIMENSIONS.map((d) => d.valueBefore);
	const afterValues = DIMENSIONS.map((d) => d.valueAfter);

	return (
		<div className="flex flex-1 flex-col items-center gap-3 bg-gray-40 border border-gray-100 rounded-xl p-5 min-w-0">
			<h2 className="text-base font-bold text-gray-900">
				Score global aalma avant /après
			</h2>

			<svg
				viewBox="0 0 280 280"
				className="w-full h-auto max-w-[260px]"
				role="img"
				aria-label="Comparaison radar avant/après"
			>
				<title>Comparaison radar avant/après</title>

				{/* Grid */}
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

				{/* Before polygon (gray) */}
				<polygon
					points={dataPolygon(beforeValues)}
					fill="var(--color-gray-300)"
					fillOpacity="0.15"
					stroke="var(--color-gray-400)"
					strokeWidth="1.5"
					strokeDasharray="4 2"
				/>

				{/* After polygon (orange) */}
				<polygon
					points={dataPolygon(afterValues)}
					fill="var(--color-primary-500)"
					fillOpacity="0.15"
					stroke="var(--color-primary-500)"
					strokeWidth="2"
				/>

				{/* After data points */}
				{afterValues.map((v, i) => {
					const r = (v / 100) * MAX_RADIUS;
					const { x, y } = polarToCartesian(i * 60, r);
					return (
						<circle
							key={DIMENSIONS[i].label}
							cx={x}
							cy={y}
							r="4"
							fill="var(--color-primary-500)"
						/>
					);
				})}

				{/* Value labels */}
				{DIMENSIONS.map((d, i) => {
					const { x, y } = polarToCartesian(i * 60, MAX_RADIUS + 18);
					return (
						<text
							key={d.label}
							x={x}
							y={y}
							textAnchor="middle"
							dominantBaseline="middle"
							className="fill-gray-900 text-sm font-bold"
						>
							{d.label}
						</text>
					);
				})}
			</svg>

			{/* Legend */}
			<div className="flex items-center gap-4">
				<div className="flex items-center gap-1.5">
					<div className="size-2 rounded-full bg-gray-400" />
					<span className="text-xs text-gray-500">Avant</span>
				</div>
				<div className="flex items-center gap-1.5">
					<div className="size-2 rounded-full bg-primary-500" />
					<span className="text-xs text-gray-500">Après</span>
				</div>
			</div>
		</div>
	);
}
