import { Calendar } from "lucide-react";
import type { ImprovementsData } from "@/features/dashboard/actions/fetch-improvements";

interface TeamWithScore {
  name: string;
  score: number;
}

interface ImprovementSectionProps {
  improvements: ImprovementsData;
  teams: TeamWithScore[];
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1 flex-1 min-w-0">
      <span className="text-xs font-bold text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center">
          <div
            className="h-2.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-200"
            style={{ width: `${value}%` }}
          />
          <div
            className="h-2.5 rounded-r-full bg-gray-100"
            style={{ width: `${100 - value}%` }}
          />
        </div>
        <span className="text-base font-bold text-primary-500 shrink-0">
          {value}
        </span>
      </div>
    </div>
  );
}

function TeamScoreCard({ name, score }: { name: string; score: number }) {
  return (
    <div className="flex flex-1 items-center justify-between bg-gray-50 rounded-xl p-3 min-w-0">
      <div className="flex flex-col gap-1 max-w-[60%]">
        <span className="text-xs font-bold text-gray-500">Equipe</span>
        <span className="text-xs font-bold text-gray-900">{name}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-4xl font-bold text-primary-500">{score}</span>
        <span className="text-xs text-gray-500">Score aalma</span>
      </div>
    </div>
  );
}

function ActionCard({
  title,
  date,
  time,
  participants,
}: {
  title: string;
  date: string;
  time: string;
  participants: number;
}) {
  return (
    <div className="flex flex-1 items-start justify-between bg-gray-40 border border-gray-200 rounded-xl p-3 min-w-0">
      <div className="flex flex-col gap-1">
        <Calendar size={20} className="text-gray-900" />
        <span className="text-sm font-bold text-gray-900">{title}</span>
        <div className="flex items-center gap-1 text-gray-500">
          <span className="text-sm font-bold">{date}</span>
          <span className="text-xs">{time}</span>
        </div>
      </div>
      <span className="bg-gray-50 text-gray-500 text-xs font-bold px-2 py-1 rounded-full shrink-0">
        {participants} collaborateurs
      </span>
    </div>
  );
}

export default function ImprovementSection({
  improvements,
  teams,
}: ImprovementSectionProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 bg-gray-40 rounded-xl p-5 overflow-hidden shadow-card-light min-w-0">
      <h2 className="text-base font-bold text-gray-900">A ameliorer</h2>

      {/* Progress bars */}
      <div className="flex gap-2.5">
        {improvements.bars.map((bar) => (
          <ProgressBar key={bar.label} {...bar} />
        ))}
      </div>

      {/* Team scores */}
      <div className="flex gap-3">
        {teams.map((team) => (
          <TeamScoreCard key={team.name} {...team} />
        ))}
      </div>

      {/* Upcoming action plan */}
      <div className="flex flex-1 flex-col gap-3 bg-gray-50 border border-gray-200 rounded-xl p-3.5 shadow-card-light min-h-0">
        <h3 className="text-base font-bold text-gray-900">
          Plan d&apos;action a venir
        </h3>
        <div className="flex gap-2.5">
          {improvements.upcomingActions.map((action) => (
            <ActionCard key={action.title} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}
