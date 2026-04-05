export default function RoiCard() {
	return (
		<div className="flex flex-col gap-4 bg-gray-40 rounded-xl p-5 shadow-card-light shrink-0 w-[280px]">
			{/* Header */}
			<div className="flex items-start justify-between">
				<h2 className="text-base font-bold text-gray-900">ROI santé mentale</h2>
				<span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
					Mesure : 2x/an
				</span>
			</div>

			{/* Main ROI value */}
			<div className="flex items-center gap-4">
				<div className="flex flex-col items-center">
					<span className="text-5xl font-bold text-primary-500">3.2x</span>
					<span className="text-xs text-gray-500 text-center">
						Retour sur investissement
						<br />
						global 2026
					</span>
				</div>
				<div className="flex flex-col gap-2 text-xs">
					<div className="flex flex-col">
						<span className="text-gray-500">Coût actions</span>
						<span className="text-lg font-bold text-gray-900">18 400€</span>
					</div>
					<div className="flex flex-col">
						<span className="text-gray-500">Gains estimés</span>
						<span className="text-lg font-bold text-gray-900">58 900€</span>
					</div>
				</div>
			</div>

			{/* Badge */}
			<span className="self-start bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
				+0,4x vs 2025
			</span>

			{/* ROI Evolution mini chart */}
			<RoiChart />
		</div>
	);
}

function RoiChart() {
	return (
		<svg
			viewBox="0 0 240 100"
			className="w-full h-auto"
			role="img"
			aria-label="Évolution du ROI"
		>
			<title>Évolution du ROI</title>
			{/* Y axis */}
			{["0.x", "1.x", "2.x", "3.x", "4.x"].map((label, i) => {
				const y = 85 - i * 18;
				return (
					<g key={label}>
						<line
							x1="30"
							y1={y}
							x2="220"
							y2={y}
							stroke="var(--color-gray-100)"
							strokeWidth="0.5"
						/>
						<text
							x="25"
							y={y + 3}
							textAnchor="end"
							className="fill-gray-500 text-[7px]"
						>
							{label}
						</text>
					</g>
				);
			})}

			{/* Before line (gray dashed) */}
			<polyline
				points="50,67 100,58 150,49"
				fill="none"
				stroke="var(--color-gray-400)"
				strokeWidth="1.5"
				strokeDasharray="4 2"
			/>
			{/* After line (orange) */}
			<polyline
				points="150,49 200,40"
				fill="none"
				stroke="var(--color-primary-500)"
				strokeWidth="2"
			/>
			{/* Points */}
			<circle cx="50" cy="67" r="3" fill="var(--color-gray-400)" />
			<circle cx="100" cy="58" r="3" fill="var(--color-gray-400)" />
			<circle cx="150" cy="49" r="3" fill="var(--color-primary-500)" />
			<circle cx="200" cy="40" r="3" fill="var(--color-primary-500)" />

			{/* X labels */}
			<text
				x="50"
				y="96"
				textAnchor="middle"
				className="fill-gray-500 text-[7px]"
			>
				Jan 2025
			</text>
			<text
				x="130"
				y="96"
				textAnchor="middle"
				className="fill-gray-500 text-[7px]"
			>
				Juil 2025
			</text>
			<text
				x="200"
				y="96"
				textAnchor="middle"
				className="fill-gray-500 text-[7px]"
			>
				Janv 2026
			</text>

			{/* Legend */}
			<circle cx="60" cy="92" r="2" fill="var(--color-gray-400)" />
			<text x="65" y="94" className="fill-gray-500 text-[6px]">
				Avant
			</text>
			<circle cx="90" cy="92" r="2" fill="var(--color-primary-500)" />
			<text x="95" y="94" className="fill-gray-500 text-[6px]">
				Après
			</text>
		</svg>
	);
}
