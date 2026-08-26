import { ApiProperty } from "@nestjs/swagger";
import { Action } from "typeorm/entities/Action";

export class KpiRecommandedActionsDto {
  @ApiProperty({
    example: [{
        "id": "f198d234-b3a4-47bc-bafd-c24db62783f5",
        "name": "Mieux vivre le stress",
        "category_id": "e22f67cc-e743-4b28-aabd-fc7466a57ba4",
        "category": {
            "id": "e22f67cc-e743-4b28-aabd-fc7466a57ba4",
            "name": "Intervention externe"
        },
        "description": "Un professionnel de santé mentale intervient directement dans votre entreprise pour animer une session interactive autour du bien-être psychologique au travail. L''objectif : briser le tabou, outiller les collaborateurs et enclencher une dynamique collective durable.",
        "schedule": "1.Accueil & cadre de confiance\r\nClaire pose les règles de bienveillance et de confidentialité. Chaque participant note anonymement sur un post-it sa principale source de stress du moment. Les post-its sont affichés et regroupés collectivement — sans jugement.\r\n2.Comprendre son stress apport théorique vivant\r\nMini-conférence interactive : le modèle de Lazarus & Folkman, les 3 phases du stress (alarme, résistance, épuisement). Claire utilise des cas concrets tirés d''entreprises similaires. Questions/réponses en continu.\r\n3.Comprendre son stress  apport théorique vivant\r\nChaque participant complète une roue individuelle (8 dimensions : charge de travail, relation hiérarchique, reconnaissance, autonomie...). Puis partage en binôme. Mise en commun des patterns les plus fréquents dans le groupe.\r\n4.Atelier pratique : 3 outils de régulation\r\nPratique guidée en groupe de 3 techniques : (1) Cohérence cardiaque 365 — 5 min de respiration rythmée à 6 cycles/min. (2) La méthode STOP — ancrage en pleine conscience en 4 étapes. (3) Restructuration cognitive — identifier et recadrer une pensée automatique stressante.\r\n5.Plan d''action personnel & clôture\r\nChaque participant rédige son \"contrat avec moi-même\" : 1 habitude à changer cette semaine, 1 outil à tester, 1 ressource à activer. Remise du livret \"Ma boîte à outils\" (12 pages, imprimé). Tour de table de clôture : un mot qui résume la session.",
        "ideal_group_low": 10,
        "ideal_group_high": 16,
        "duration_in_minute": 150,
        "in_person": true,
        "price": 1400,
        "note": 49,
        "reservation": 1,
        "system": true
    },
  ],
    description: "Actions recommandées",
  })
  actions: Action[];

}
