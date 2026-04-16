"use client";

import { useState } from "react";
import { tv } from "tailwind-variants";

const tab = tv({
	base: "px-3 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors",
	variants: {
		active: {
			true: "",
			false: "",
		},
		variant: {
			dark: "",
			light: "",
		},
	},
	compoundVariants: [
		{ active: true, variant: "dark", className: "bg-gray-900 text-gray-40" },
		{
			active: false,
			variant: "dark",
			className: "bg-gray-40 text-gray-900 hover:bg-gray-50",
		},
		{
			active: true,
			variant: "light",
			className: "bg-gray-40 text-gray-900",
		},
		{
			active: false,
			variant: "light",
			className: "bg-gray-50 text-gray-900 hover:bg-gray-100",
		},
	],
	defaultVariants: {
		active: false,
		variant: "light",
	},
});

interface SegmentedControlProps {
	options: string[];
	defaultValue?: string;
	value?: string;
	variant?: "dark" | "light";
	onChange?: (value: string) => void;
}

export default function SegmentedControl({
	options,
	defaultValue,
	value,
	variant = "light",
	onChange,
}: SegmentedControlProps) {
	const [internal, setInternal] = useState(defaultValue ?? options[0]);
	const selected = value ?? internal;

	const containerBg = variant === "dark" ? "bg-gray-40" : "bg-gray-50";

	return (
		<div className={`flex items-center gap-2 p-1 rounded-xl ${containerBg}`}>
			{options.map((option) => (
				<button
					key={option}
					type="button"
					className={tab({ active: selected === option, variant })}
					onClick={() => {
						setInternal(option);
						onChange?.(option);
					}}
				>
					{option}
				</button>
			))}
		</div>
	);
}
