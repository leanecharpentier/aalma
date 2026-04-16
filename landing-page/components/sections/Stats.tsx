import Image from "next/image";

export function Stats() {
  return (
    <section className="relative w-full px-6 lg:px-12 py-16 bg-primary-50 overflow-hidden">
      <Image
        src="/a-orange.png"
        alt=""
        width={250}
        height={250}
        className="absolute right-0 bottom-0"
      />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
        {/* Card stat */}
        <div className="border border-primary-500 bg-linear-to-t from-primary-40 to-primary-50 rounded-xl p-6 min-w-[280px] shadow-card">
          <p className="text-lg font-bold text-foreground mb-2">
            Absentéisme en France
          </p>
          <p className="text-[56px] font-bold text-primary-500 leading-none mb-2">
            23,3
          </p>
          <p className="text-lg font-bold text-primary-500">
            jours d&apos;absence par salarié par an
          </p>
        </div>

        {/* Right stats */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-lg font-bold text-foreground mb-3">
              Coût par salarié
            </p>
            <p className="text-[40px] font-bold text-primary-500 leading-none">
              4 059&euro;
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground mb-3">
              Coût national
            </p>
            <p className="text-[40px] font-bold text-primary-500 leading-none">
              117 Md&euro;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
