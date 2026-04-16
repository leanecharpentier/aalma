export type ProgramStep = {
  title: string;
  content: string;
};

export type Review = {
  stars: number;
  company: string;
  details: string;
  text: string;
};

export type ActionDetailData = {
  id: string;
  category: string;
  title: string;
  expert: string;
  reservationRequired: boolean;
  duration: string;
  format: string;
  groupSize: string;
  price: string;
  rating: string;
  sessionsCount: string;
  about: string;
  program: ProgramStep[];
  reviews: Review[];
  keywords: string[];
};

// TODO: Replace with apiFetch<ActionDetailData>("/library/actions/${id}")
export async function fetchActionDetail(
  _id: string,
): Promise<ActionDetailData> {
  return {
    id: _id,
    category: "Intervention externe",
    title: "Mieux vivre le stress",
    expert:
      "Dr. Claire Fontaine - Psychologue clinicienne du travail · 14 ans d'expérience en entreprise",
    reservationRequired: true,
    duration: "2h30",
    format: "En présentiel",
    groupSize: "10-16",
    price: "1400€",
    rating: "4.9",
    sessionsCount: "29 sessions réalisées",
    about:
      "Un professionnel de santé mentale intervient directement dans votre entreprise pour animer une session interactive autour du bien-être psychologique au travail. L'objectif : briser le tabou, outiller les collaborateurs et enclencher une dynamique collective durable.",
    program: [
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
    ],
    reviews: [
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
    ],
    keywords: [
      "Stress professionnel",
      "Burn-out",
      "Managers",
      "Managers",
      "Psychologue",
    ],
  };
}
