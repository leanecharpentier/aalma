export type LibraryAction = {
  id: string;
  category: string;
  title: string;
  description: string;
  participants: string;
  format: string;
  duration: string;
};

// TODO: Replace with apiFetch<LibraryAction[]>("/library/actions")
export async function fetchLibraryActions(): Promise<LibraryAction[]> {
	return [
		{
			id: "1",
			category: "Gestion du stress",
			title: "Mieux vivre le stress au quotidien",
			description:
				"Comprendre les mécanismes du stress, identifier ses signaux d'alerte et acquérir des outils concrets de régulation pour préserver son équilibre au travail.",
			participants: "10-16 pers.",
			format: "Présentiel",
			duration: "2h30",
		},
		{
			id: "2",
			category: "Performance & feedback",
			title: "Donner et recevoir du feedback efficacement",
			description:
				"Apprendre à formuler un feedback constructif, l'intégrer dans sa pratique managériale et créer une culture de la progression continue.",
			participants: "2-10 pers.",
			format: "Présentiel",
			duration: "30 min",
		},
		{
			id: "3",
			category: "Prévention des RPS",
			title: "Détecter et prévenir le burn-out",
			description:
				"Reconnaître les signes précurseurs de l'épuisement professionnel chez soi et chez ses collaborateurs, et mettre en place des actions de prévention adaptées.",
			participants: "10-20 pers.",
			format: "Présentiel",
			duration: "2 heures",
		},
		{
			id: "4",
			category: "Communication",
			title: "Libérer la parole en équipe",
			description:
				"Créer un espace de dialogue sécurisé où chacun peut exprimer ses difficultés, ses besoins et ses idées sans crainte de jugement.",
			participants: "2-10 pers.",
			format: "Présentiel",
			duration: "1 heure",
		},
		{
			id: "5",
			category: "Leadership",
			title: "Manager avec bienveillance et exigence",
			description:
				"Développer un style de management qui concilie performance et bien-être, en s'appuyant sur l'écoute active, la reconnaissance et le cadre.",
			participants: "2-10 pers.",
			format: "Distanciel",
			duration: "1 heure",
		},
		{
			id: "6",
			category: "Gestion du stress",
			title: "Initiation à la pleine conscience",
			description:
				"Découvrir les bases de la méditation de pleine conscience et apprendre des exercices simples applicables au bureau pour réduire l'anxiété.",
			participants: "10-16 pers.",
			format: "Hybride",
			duration: "Demi-journée",
		},
		{
			id: "7",
			category: "Prévention des RPS",
			title: "Premiers secours en santé mentale (PSSM)",
			description:
				"Formation certifiante pour apprendre à repérer les troubles psychiques, adopter les bons réflexes et orienter vers les professionnels adaptés.",
			participants: "20+ pers.",
			format: "Présentiel",
			duration: "2 heures",
		},
		{
			id: "8",
			category: "Communication",
			title: "Gérer les conflits avec la communication non violente",
			description:
				"S'approprier les principes de la CNV pour désamorcer les tensions, exprimer ses besoins et construire des relations de travail plus sereines.",
			participants: "2-10 pers.",
			format: "Présentiel",
			duration: "2 heures",
		},
		{
			id: "9",
			category: "Leadership",
			title: "Accompagner le retour après un arrêt long",
			description:
				"Outiller les managers pour préparer et réussir le retour d'un collaborateur après un arrêt maladie lié à un trouble psychique ou un burn-out.",
			participants: "2-10 pers.",
			format: "Distanciel",
			duration: "1 heure",
		},
	];
}
