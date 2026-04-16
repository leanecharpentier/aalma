const orangeStats = [
  {
    value: "86%",
    description:
      "des salariés constatent une amélioration de leur santé mentale grâce aux actions de prévention",
  },
  {
    value: "+12%",
    description:
      "de productivité moyenne dans les entreprises dotées de programmes bien-être",
  },
  {
    value: "-35%",
    description:
      "d'absentéisme et -25% de turnover dans les organisations qui investissent dans le bien-être",
  },
];

const darkStats = [
  {
    value: "x4,4",
    description:
      "de retour sur investissement, chaque euro investi en génère 4,4 en gains mesurables",
  },
];

function StatRow({
  value,
  description,
}: {
  value: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-center gap-6 py-14 px-6 lg:px-12">
      <p className="text-[56px] lg:text-[72px] font-bold text-primary-50 leading-none shrink-0 text-right w-[180px]">
        {value}
      </p>
      <div className="w-px h-[84px] bg-primary-50 shrink-0" />
      <p className="text-lg font-bold text-primary-50 leading-snug max-w-[415px]">
        {description}
      </p>
    </div>
  );
}

export function Impact() {
  return (
    <section id="impact" className="w-full pb-24">
      {/* Header */}
      <div className="bg-background px-6 lg:px-12 py-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Mesurez l&apos;impact réel de vos actions sur le
          <br />
          bien être et la performance
        </h2>
        <p className="text-gray-900 text-lg">
          Des effets concrets sur le bien-être au travail
        </p>
      </div>

      {/* Orange stats (first 2) */}
      <div className="bg-primary-500 pt-6">
        {orangeStats.slice(0, 2).map((stat) => (
          <StatRow key={stat.value} {...stat} />
        ))}
      </div>

      {/* Dark stat */}
      <div className="bg-gray-900">
        {darkStats.map((stat) => (
          <StatRow key={stat.value} {...stat} />
        ))}
      </div>

      {/* Last orange stat */}
      <div className="bg-primary-500 pb-6">
        {orangeStats.slice(2).map((stat) => (
          <StatRow key={stat.value} {...stat} />
        ))}
      </div>
    </section>
  );
}
