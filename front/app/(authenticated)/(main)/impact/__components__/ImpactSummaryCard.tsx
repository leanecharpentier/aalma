import { TrendingDown, TrendingUp } from "lucide-react";

interface Indicator {
	label: string;
	value: number;
	unit: string;
	change: string;
	trend: "up" | "down";
}

const INDICATORS: Indicator[] = [
	{
		label: "Score\naalma",
		value: 75,
		unit: "sur 100",
		change: "+5.6%",
		trend: "up",
	},
	{
		label: "Niveau\nde stress",
		value: 85,
		unit: "sur 100",
		change: "2.3%",
		trend: "down",
	},
	{
		label: "Charge\nde travail",
		value: 92,
		unit: "sur 100",
		change: "+4.1%",
		trend: "up",
	},
];

function IndicatorCard({ label, value, unit, change, trend }: Indicator) {
	const isUp = trend === "up";
	return (
		<div className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl p-2 flex-1 min-w-0">
			<p className="text-xs font-bold text-gray-900 text-center whitespace-pre-line">
				{label}
			</p>
			<div className="flex flex-col items-center gap-2">
				<span className="text-[40px] font-bold text-primary-500">{value}</span>
				<span className="text-sm text-gray-500">{unit}</span>
			</div>
			<div
				className={`flex items-center gap-1 px-2 py-1 rounded-3xl text-xs font-bold ${
					isUp ? "bg-green-50 text-green-600" : "bg-red-500/10 text-red-600"
				}`}
			>
				{isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
				{change}
			</div>
		</div>
	);
}

function EvolutionChart() {
	const points = [
		{ x: 40, y: 100, label: "2025" },
		{ x: 140, y: 90, label: "2025" },
		{ x: 240, y: 88, label: "" },
		{ x: 340, y: 70, label: "2026" },
	];

	return (
		<svg
			viewBox="0 0 380 120"
			className="w-full h-auto"
			role="img"
			aria-label="Évolution du score aalma"
		>
			<title>Évolution du score aalma</title>
			{/* Y axis labels */}
			{[0, 20, 40, 60, 80, 100].map((val) => {
				const y = 110 - val;
				return (
					<g key={val}>
						<line
							x1="30"
							y1={y}
							x2="360"
							y2={y}
							stroke="var(--color-gray-100)"
							strokeWidth="0.5"
						/>
						<text
							x="20"
							y={y + 3}
							textAnchor="end"
							className="fill-gray-500 text-[8px]"
						>
							{val}
						</text>
					</g>
				);
			})}
			{/* Line */}
			<polyline
				points={points.map((p) => `${p.x},${p.y}`).join(" ")}
				fill="none"
				stroke="var(--color-gray-500)"
				strokeWidth="2"
			/>
			{/* Points */}
			{points.map((p) => (
				<circle
					key={`${p.x}-${p.y}`}
					cx={p.x}
					cy={p.y}
					r="3"
					fill="var(--color-gray-500)"
				/>
			))}
			{/* Labels */}
			{points
				.filter((p) => p.label)
				.map((p) => (
					<text
						key={p.label + p.x}
						x={p.x}
						y={p.y - 8}
						textAnchor="middle"
						className="fill-gray-900 text-[8px] font-bold"
					>
						{p.label}
					</text>
				))}
		</svg>
	);
}

export default function ImpactSummaryCard() {
	return (
		<div className="flex flex-1 flex-col gap-5 bg-gray-40 rounded-xl p-5 shadow-card-light min-w-0">
			<h2 className="text-base font-bold text-gray-900">
				Résumé impact global 2026
			</h2>

			{/* Key indicators */}
			<div className="flex flex-col gap-3">
				<h3 className="text-xs font-bold text-gray-900">Indicateurs clés</h3>
				<div className="flex gap-2">
					{INDICATORS.map((indicator) => (
						<IndicatorCard key={indicator.label} {...indicator} />
					))}
				</div>
			</div>

			{/* Evolution chart */}
			<div className="flex flex-col gap-2">
				<div className="flex flex-col">
					<h3 className="text-xs font-bold text-gray-900">
						Évolution dans le temps
					</h3>
					<span className="text-xs text-gray-500">(Score aalma)</span>
				</div>
				<EvolutionChart />
			</div>
		</div>
	);
}
