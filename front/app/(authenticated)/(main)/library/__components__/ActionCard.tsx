import { Heart, Presentation } from "lucide-react";

interface ActionCardProps {
	category: string;
	title: string;
	description: string;
	participants: string;
	format: string;
	duration: string;
	onDiscover?: () => void;
}

function Badge({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center border border-gray-500 rounded-full px-3 py-2 text-xs font-bold text-gray-500">
			{label}
		</span>
	);
}

function Tag({ label }: { label: string }) {
	return (
		<span className="bg-gray-50 rounded-full px-3 py-1 text-xs font-bold text-gray-500">
			{label}
		</span>
	);
}

export default function ActionCard({
	category,
	title,
	description,
	participants,
	format,
	duration,
	onDiscover,
}: ActionCardProps) {
	return (
		<div className="flex flex-col justify-between bg-gray-40 rounded-xl p-5 shadow-card-light">
			<div className="flex flex-col gap-3.5">
				{/* Header: badge + icon */}
				<div className="flex items-start justify-between">
					<Badge label={category} />
					<Presentation size={24} className="text-gray-500 shrink-0" />
				</div>

				{/* Title */}
				<h3 className="text-lg font-bold text-gray-900 leading-normal">
					{title}
				</h3>

				{/* Description */}
				<p className="text-xs text-gray-500 leading-normal">{description}</p>

				{/* Tags */}
				<div className="flex gap-1">
					<Tag label={participants} />
					<Tag label={format} />
					<Tag label={duration} />
				</div>
			</div>

			{/* Actions */}
			<div className="flex gap-2.5 mt-5">
				<button
					type="button"
					className="flex flex-1 items-center justify-center h-[52px] border border-gray-900 rounded-lg px-8 py-3.5 text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
					onClick={onDiscover}
				>
					Découvrir
				</button>
				<button
					type="button"
					className="flex items-center justify-center h-[52px] w-[52px] border border-gray-900 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
				>
					<Heart size={24} />
				</button>
			</div>
		</div>
	);
}
