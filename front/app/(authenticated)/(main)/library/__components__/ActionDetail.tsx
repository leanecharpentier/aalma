import {
	Calendar,
	ChevronLeft,
	Heart,
	Phone,
	Star,
	Upload,
} from "lucide-react";

const PROGRAM_STEPS = [
	{
		title: "1.Accueil & cadre de confiance",
		content:
			"Claire pose les règles de bienveillance et de confidentialité. Chaque participant note anonymement sur un post-it sa principale source de stress du moment. Les post-its sont affichés et regroupés collectivement — sans jugement.",
	},
	{
		title: "2.Comprendre son stress apport théorique vivant",
		content:
			"Mini-conférence interactive : le modèle de Lazarus & Folkman, les 3 phases du stress (alarme, résistance, épuisement). Claire utilise des cas concrets tirés d'entreprises similaires. Questions/réponses en continu.",
	},
	{
		title: "3.Comprendre son stress apport théorique vivant",
		content:
			"Chaque participant complète une roue individuelle (8 dimensions : charge de travail, relation hiérarchique, reconnaissance, autonomie...). Puis partage en binôme. Mise en commun des patterns les plus fréquents dans le groupe.",
	},
	{
		title: "4.Atelier pratique : 3 outils de régulation",
		content:
			"Pratique guidée en groupe de 3 techniques : (1) Cohérence cardiaque 365 — 5 min de respiration rythmée à 6 cycles/min. (2) La méthode STOP — ancrage en pleine conscience en 4 étapes. (3) Restructuration cognitive — identifier et recadrer une pensée automatique stressante.",
	},
	{
		title: "5.Plan d'action personnel & clôture",
		content:
			'Chaque participant rédige son "contrat avec moi-même" : 1 habitude à changer cette semaine, 1 outil à tester, 1 ressource à activer. Remise du livret "Ma boîte à outils" (12 pages, imprimé). Tour de table de clôture : un mot qui résume la session.',
	},
];

const REVIEWS = [
	{
		stars: 5,
		company: "Clarins Group · DRH",
		details: "Cosmétique · 320 sal. · 2 sessions · Nov. 2024",
		text: "La roue du stress a été un déclencheur inattendu. Plusieurs collaborateurs ont réalisé en binôme qu'ils vivaient les mêmes choses — et n'en avaient jamais parlé. Le livret est encore affiché dans certains bureaux. On a reconduit avec une session dédiée managers.",
	},
	{
		stars: 4,
		company: "Rondeau & Barré · Bien-être",
		details: "Cabinet conseil · 55 sal. · 3 sessions · Fév. 2025",
		text: "On avait une culture \"on est des pros, on gère\". Claire a su désamorcer ça dès les 20 premières minutes avec les post-its anonymes. Personne ne se sentait jugé. L'exercice de cohérence cardiaque pratiqué en groupe a créé quelque chose d'inattendu : du calme collectif. Vraiment recommandé.",
	},
];

const KEYWORDS = [
	"Stress professionnel",
	"Burn-out",
	"Managers",
	"Managers",
	"Psychologue",
];

interface ActionDetailProps {
	onBack: () => void;
}

export default function ActionDetail({ onBack }: ActionDetailProps) {
	return (
		<div className="flex flex-col gap-8">
			{/* Back button */}
			<button
				type="button"
				className="flex items-center gap-1 cursor-pointer text-sm text-gray-900 hover:text-gray-700 transition-colors self-start"
				onClick={onBack}
			>
				<ChevronLeft size={20} />
				Retour
			</button>

			{/* Header card */}
			<div className="flex items-start justify-between bg-gray-40 rounded-xl p-5 shadow-card-light">
				<div className="flex flex-col gap-4">
					<span className="inline-flex items-center self-start border border-gray-500 rounded-full px-3 py-2 text-xs font-bold text-gray-500">
						Intervention externe
					</span>
					<div className="flex flex-col gap-1">
						<h1 className="text-3xl font-bold text-gray-900">
							Mieux vivre le stress
						</h1>
						<p className="text-sm text-gray-900">
							Dr. Claire Fontaine - Psychologue clinicienne du travail · 14 ans
							d&apos;expérience en entreprise
						</p>
					</div>
					<span className="inline-flex items-center self-start bg-red-500/10 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
						Réservation requise
					</span>
				</div>
				<button
					type="button"
					className="flex items-center gap-2 h-13 border border-gray-900 rounded-lg px-8 py-3.5 text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
				>
					<Phone size={20} />
					Contacter Claire
				</button>
			</div>

			{/* Stats row */}
			<div className="flex items-center justify-between px-24">
				<StatItem
					label="Durée de la session"
					value="2h30"
					sub="En présentiel"
				/>
				<StatItem label="Groupe idéal" value="10-16" sub="personnes" />
				<StatItem label="Tarif indicatif" value="1400€" sub="HT / session" />
				<StatItem
					label="Note"
					value="4.9"
					sub="29 sessions réalisées"
					showStar
				/>
			</div>

			{/* Main content */}
			<div className="flex gap-3 items-start">
				{/* Left column */}
				<div className="flex flex-1 flex-col gap-12 p-5 min-w-0">
					{/* About */}
					<div className="flex flex-col gap-3">
						<h2 className="text-lg font-bold text-gray-900">
							À propos de cet atelier
						</h2>
						<p className="text-sm text-gray-900 leading-normal">
							Un professionnel de santé mentale intervient directement dans
							votre entreprise pour animer une session interactive autour du
							bien-être psychologique au travail. L&apos;objectif : briser le
							tabou, outiller les collaborateurs et enclencher une dynamique
							collective durable.
						</p>
					</div>

					{/* Program */}
					<div className="flex flex-col gap-3">
						<h2 className="text-lg font-bold text-gray-900">Programme</h2>
						{PROGRAM_STEPS.map((step) => (
							<div
								key={step.title}
								className="flex flex-col text-sm text-gray-900"
							>
								<p className="font-bold">{step.title}</p>
								<p className="leading-normal">{step.content}</p>
							</div>
						))}
					</div>

					{/* Reviews */}
					<div className="flex flex-col gap-3">
						<h2 className="text-lg font-bold text-gray-900">
							Retours entreprises
						</h2>
						<div className="flex gap-3">
							{REVIEWS.map((review) => (
								<ReviewCard key={review.company} {...review} />
							))}
						</div>
					</div>

					{/* Keywords */}
					<div className="flex flex-col gap-3">
						<h2 className="text-lg font-bold text-gray-900">Mots clés:</h2>
						<div className="flex gap-2">
							{KEYWORDS.map((keyword) => (
								<span
									key={keyword}
									className="bg-gray-40 border border-gray-100 rounded-full px-2 py-1 text-xs font-bold text-gray-900"
								>
									{keyword}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Right column: Planifier */}
				<div className="shrink-0 w-110 sticky top-0">
					<PlanActionPanel />
				</div>
			</div>
		</div>
	);
}

function StatItem({
	label,
	value,
	sub,
	showStar,
}: {
	label: string;
	value: string;
	sub: string;
	showStar?: boolean;
}) {
	return (
		<div className="flex flex-col gap-2 p-3">
			<span className="text-sm font-bold text-gray-500">{label}</span>
			<div className="flex flex-col">
				<div className="flex items-center gap-2">
					<span className="text-lg font-bold text-gray-900">{value}</span>
					{showStar && (
						<Star size={20} className="text-yellow-500 fill-yellow-500" />
					)}
				</div>
				<span className="text-sm font-bold text-gray-900">{sub}</span>
			</div>
		</div>
	);
}

function ReviewCard({
	stars,
	company,
	details,
	text,
}: {
	stars: number;
	company: string;
	details: string;
	text: string;
}) {
	return (
		<div className="flex flex-1 flex-col gap-5 bg-gray-40 border border-gray-100 rounded-xl p-5 shadow-card-light min-w-0">
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-0.5 p-1">
					{"★"
						.repeat(stars)
						.split("")
						.map((s, idx) => `star-${idx}`)
						.map((key) => (
							<Star
								key={key}
								size={14}
								className="text-yellow-500 fill-yellow-500"
							/>
						))}
				</div>
				<p className="text-sm font-bold text-gray-900">{company}</p>
				<p className="text-xs text-gray-500">{details}</p>
			</div>
			<p className="text-xs text-gray-600 leading-normal">{text}</p>
		</div>
	);
}

function PlanActionPanel() {
	return (
		<div className="flex flex-col gap-5 bg-gray-40 rounded-xl p-5 shadow-card-light">
			<h3 className="text-lg font-bold text-gray-900">
				Planifier cette action
			</h3>
			<div className="flex items-center gap-2 h-11">
				<button
					type="button"
					className="flex items-center gap-2 border border-gray-900 rounded-lg px-3.5 py-2 h-full text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
				>
					<Calendar size={20} />
					Planifier
				</button>
				<button
					type="button"
					className="flex items-center gap-2 border border-gray-900 rounded-lg px-3.5 py-2 h-full text-sm font-bold text-gray-900 cursor-pointer hover:bg-gray-50 transition-colors"
				>
					<Upload size={20} />
					Assigner à un manager
				</button>
				<button
					type="button"
					className="flex items-center justify-center border border-gray-900 rounded-lg p-2.5 h-full cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
				>
					<Heart size={20} />
				</button>
			</div>
		</div>
	);
}
