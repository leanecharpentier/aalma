import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

function Badge({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center border border-gray-500 rounded-full px-2 py-1 text-xs font-bold text-gray-500">
			{label}
		</span>
	);
}

function DiscoverLink() {
	return (
		<div className="flex items-center justify-end">
			<button
				type="button"
				className="flex items-center gap-1 p-1 rounded-full text-xs font-bold text-gray-500 cursor-pointer hover:text-gray-700 transition-colors"
			>
				Decouvrir
				<ArrowUpRight size={14} />
			</button>
		</div>
	);
}

function ArticleCardWithImage() {
	return (
		<div className="flex flex-col gap-3 bg-gray-50 border border-gray-100 rounded-xl p-3 h-[356px] w-[274px] shrink-0">
			<div className="relative flex-1 rounded-lg overflow-hidden">
				<Image
					src="/images/home/blog-article.jpg"
					alt="Article sante mentale"
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col gap-3.5">
				<Badge label="Grande cause" />
				<div className="flex flex-col gap-2 text-gray-900">
					<h3 className="text-base font-bold">
						Charte nationale sante mentale
					</h3>
					<p className="text-xs">28 aout 2026 - Gouvernement</p>
				</div>
			</div>
			<DiscoverLink />
		</div>
	);
}

function ArticleCardText({
	badge,
	title,
	source,
}: {
	badge: string;
	title: string;
	source: string;
}) {
	return (
		<div className="flex flex-1 flex-col justify-between bg-gray-50 border border-gray-100 rounded-xl p-3 min-h-0">
			<div className="flex flex-col gap-3.5">
				<Badge label={badge} />
				<div className="flex flex-col gap-2 text-gray-900">
					<h3 className="text-base font-bold">{title}</h3>
					<p className="text-xs">{source}</p>
				</div>
			</div>
			<DiscoverLink />
		</div>
	);
}

export default function BlogSection() {
	return (
		<div className="flex flex-1 flex-col gap-5 bg-gray-40 rounded-xl p-5 overflow-hidden shadow-card-light min-w-0">
			<h2 className="text-base font-bold text-gray-900">Blog</h2>

			<div className="flex flex-1 gap-5 min-h-0">
				<ArticleCardWithImage />

				<div className="flex flex-1 flex-col gap-5 min-w-0 min-h-0">
					<ArticleCardText
						badge="Article"
						title="Sante mentale au travail : les 4 grands constats 2025"
						source="Janvier 2026 - Moka.care x GHU Paris"
					/>
					<ArticleCardText
						badge="Evenement"
						title={`SISM 2025 — \u00ab Pour notre sante mentale, reparons le lien social \u00bb`}
						source="6-19 octobre 2025 - Semaines d'Information sur la Sante Mentale"
					/>
				</div>
			</div>
		</div>
	);
}
