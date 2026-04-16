import {
  Calendar,
  ChevronLeft,
  Heart,
  Phone,
  Star,
  Upload,
} from "lucide-react";
import type { ActionDetailData } from "@/features/library/actions/fetch-action-detail";

interface ActionDetailProps {
  onBack: () => void;
  data: ActionDetailData;
}

export default function ActionDetail({ onBack, data }: ActionDetailProps) {
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
            {data.category}
          </span>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
            <p className="text-sm text-gray-900">{data.expert}</p>
          </div>
          {data.reservationRequired && (
            <span className="inline-flex items-center self-start bg-red-500/10 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
              Réservation requise
            </span>
          )}
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
          value={data.duration}
          sub={data.format}
        />
        <StatItem label="Groupe idéal" value={data.groupSize} sub="personnes" />
        <StatItem
          label="Tarif indicatif"
          value={data.price}
          sub="HT / session"
        />
        <StatItem
          label="Note"
          value={data.rating}
          sub={data.sessionsCount}
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
            <p className="text-sm text-gray-900 leading-normal">{data.about}</p>
          </div>

          {/* Program */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-gray-900">Programme</h2>
            {data.program.map((step) => (
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
              {data.reviews.map((review) => (
                <ReviewCard key={review.company} {...review} />
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-gray-900">Mots clés:</h2>
            <div className="flex gap-2">
              {data.keywords.map((keyword) => (
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
