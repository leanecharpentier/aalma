export default function RoiCard() {
	return (
		<div className="flex flex-col gap-2.5 bg-gray-40 rounded-xl p-5 shadow-card-light shrink-0 w-92">
			{/* Header */}
			<div className="flex items-start justify-between">
				<h2 className="text-base font-bold text-gray-900">
					ROI santé mentale
				</h2>
				<span className="text-xs font-medium text-gray-900">
					Mesure : 2x/par
				</span>
			</div>

			{/* Main ROI value card */}
			<div className="flex flex-1 items-center justify-center bg-gray-50 border border-gray-100 rounded-xl p-2.5">
				<div className="flex gap-2.5 items-start justify-center">
					<div className="flex flex-col items-center gap-3">
						<div className="flex flex-col items-center gap-2">
							<span className="text-7xl font-bold text-primary-500">3.2x</span>
							<p className="text-sm text-gray-500 text-center font-medium">
								Retour sur investissement
								<br />
								global 2026
							</p>
						</div>
						<span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
							+0,4× vs 2025
						</span>
					</div>
					<div className="flex flex-col gap-2.5">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold text-gray-500 text-center">
								Coût actions
							</span>
							<span className="text-lg font-bold text-gray-900">18 400€</span>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-bold text-gray-500 text-center">
								Gains estimés
							</span>
							<span className="text-lg font-bold text-gray-900">58 900€</span>
						</div>
					</div>
				</div>
			</div>

			{/* ROI Evolution chart */}
			<RoiChart />
		</div>
	);
}

function RoiChart() {
	return (
		<div className="flex flex-col">
			<svg
				viewBox="0 0 300 120"
				className="w-full h-auto"
				role="img"
				aria-label="Évolution du ROI"
			>
				<title>Évolution du ROI</title>
				{/* Y axis */}
				{["0x", "1x", "2x", "3x", "4x"].map((label, i) => {
					const y = 95 - i * 20;
					return (
						<g key={label}>
							<line
								x1="30"
								y1={y}
								x2="280"
								y2={y}
								stroke="var(--color-gray-100)"
								strokeWidth="0.5"
							/>
							<text
								x="24"
								y={y + 3}
								textAnchor="end"
								className="fill-gray-500 text-[8px]"
							>
								{label}
							</text>
						</g>
					);
				})}

				{/* Vertical grid lines */}
				{[80, 155, 230].map((x) => (
					<line
						key={x}
						x1={x}
						y1="15"
						x2={x}
						y2="95"
						stroke="var(--color-gray-100)"
						strokeWidth="0.5"
					/>
				))}

				{/* Before line (gray) */}
				<polyline
					points="80,55 155,45"
					fill="none"
					stroke="var(--color-gray-400)"
					strokeWidth="1.5"
				/>
				{/* After line (orange) */}
				<polyline
					points="155,45 230,28"
					fill="none"
					stroke="var(--color-primary-500)"
					strokeWidth="2"
				/>

				{/* Points */}
				<circle cx="80" cy="55" r="3" fill="var(--color-gray-400)" />
				<circle cx="155" cy="45" r="3" fill="var(--color-gray-400)" />
				<circle cx="155" cy="45" r="3" fill="var(--color-primary-500)" />
				<circle cx="230" cy="28" r="3" fill="var(--color-primary-500)" />

				{/* X labels */}
				<text
					x="80"
					y="110"
					textAnchor="middle"
					className="fill-gray-500 text-[8px] font-medium"
				>
					Jan 2025
				</text>
				<text
					x="155"
					y="110"
					textAnchor="middle"
					className="fill-gray-500 text-[8px] font-medium"
				>
					Juil 2025
				</text>
				<text
					x="230"
					y="110"
					textAnchor="middle"
					className="fill-gray-500 text-[8px] font-medium"
				>
					Janv 2026
				</text>
			</svg>

			{/* Legend */}
			<div className="flex items-center gap-3 justify-center">
				<div className="flex items-center gap-1">
					<div className="size-2 rounded-full bg-gray-500" />
					<span className="text-xs text-gray-500">Avant</span>
				</div>
				<div className="flex items-center gap-1">
					<div className="size-2 rounded-full bg-primary-500" />
					<span className="text-xs text-gray-500">Après</span>
				</div>
			</div>
		</div>
	);
}
