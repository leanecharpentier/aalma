import { Linkedin } from "lucide-react";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

const shapeBase =
  "rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.35),inset_-2px_-2px_6px_rgba(0,0,0,0.08)]";

const rectBase =
  "rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.35),inset_-2px_-2px_6px_rgba(0,0,0,0.08)]";

export const AuthVisual = ({ className }: Props) => {
  return (
    <section
      className={twMerge(
        "overflow-hidden rounded-3xl px-30 py-12",
        "bg-linear-to-b from-primary-200 via-primary-500 to-primary-500",
        className,
      )}
    >
      {/* Texture grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative grid grid-cols-3 grid-rows-4 auto-rows-fr gap-10">
        {/* Ligne 1 : 3 cercles */}
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />

        {/* Ligne 2 : rectangle vertical (span 2 rows) + 2 cercles */}
        <div
          className={`col-start-1 row-start-2 row-span-2 aspect-[0.47] w-full justify-self-center ${rectBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />

        {/* Ligne 3 : cercle + rectangle horizontal */}
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div className={`col-span-2 aspect-[2.2] w-full ${rectBase}`} />

        {/* Ligne 4 : 2 cercles (dernier avec logo LinkedIn) */}

        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
        <div
          className={`aspect-square w-full justify-self-center ${shapeBase}`}
        />
      </div>
    </section>
  );
};
