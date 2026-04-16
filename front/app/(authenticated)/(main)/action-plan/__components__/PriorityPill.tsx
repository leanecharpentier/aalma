import { Pencil } from "lucide-react";

interface PriorityPillProps {
	index: number;
	label: string;
}

export default function PriorityPill({ index, label }: PriorityPillProps) {
	return (
		<div className="flex items-center gap-5 bg-primary-40 border-2 border-primary-200 rounded-full px-6 py-3 shadow-orange-glow">
			<div className="flex items-center gap-1 text-primary-500 font-bold whitespace-nowrap">
				<span className="text-lg">{index}.</span>
				<span className="text-sm">{label}</span>
			</div>
			<Pencil size={20} className="text-primary-500 shrink-0" />
		</div>
	);
}
