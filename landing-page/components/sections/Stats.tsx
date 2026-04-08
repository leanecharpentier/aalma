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
        <div className="border border-primary-500 bg-linear-to-b from-primary-40 to-primary-50 rounded-2xl p-6 min-w-[280px]">
          <p className="text-sm font-semibold text-foreground mb-2">
            Absentéisme en France
          </p>
          <p className="text-5xl font-bold text-primary-500 mb-1">23,3</p>
          <p className="text-md text-primary-500 font-medium">
            jours d&apos;absence par salarié par an
          </p>
        </div>

        {/* Right stats */}
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm font-bold text-foreground">
              Coût par salarié
            </p>
            <p className="text-5xl font-bold text-primary-500">4 059</p>
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">Coût national</p>
            <p className="text-5xl font-bold text-primary-500">117 Md&euro;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
