const orangeStats = [
  {
    value: "86%",
    description:
      "des salaries constatent une amelioration de leur sante mentale grace aux actions de prevention",
  },
  {
    value: "+12%",
    description:
      "de productivite moyenne dans les entreprises dotees de programmes bien-etre",
  },
];

const darkStats = [
  {
    value: "x4,4",
    description:
      "de retour sur investissement, chaque euro investi en genere 4,4 en gains mesurables",
  },
  {
    value: "-35%",
    description:
      "d'absenteisme et -25% de turnover dans les organisations qui investissent dans le bien-etre",
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
    <div className="flex items-center gap-6 py-8 px-6 lg:px-12">
      <p className="text-5xl lg:text-6xl font-bold shrink-0">{value}</p>
      <div className="w-px h-12 bg-current opacity-30" />
      <p className="text-sm leading-relaxed opacity-80 max-w-md">
        {description}
      </p>
    </div>
  );
}

export function Impact() {
  return (
    <section id="impact" className="w-full">
      {/* Header */}
      <div className="bg-background px-6 lg:px-12 py-16 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          Mesurez l&apos;impact reel de vos actions sur le
          <br />
          bien etre et la performance
        </h2>
        <p className="text-gray-500 text-sm">
          Des effets concrets sur le bien-etre au travail
        </p>
      </div>

      {/* Orange stats */}
      <div className="bg-primary-500 text-white">
        <div className="max-w-3xl mx-auto divide-y divide-white/20">
          {orangeStats.map((stat) => (
            <StatRow key={stat.value} {...stat} />
          ))}
        </div>
      </div>

      {/* Light stat */}
      <div className="bg-background text-foreground">
        <div className="max-w-3xl mx-auto">
          {darkStats.slice(0, 1).map((stat) => (
            <StatRow key={stat.value} {...stat} />
          ))}
        </div>
      </div>

      {/* Dark stats */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto">
          {darkStats.slice(1).map((stat) => (
            <StatRow key={stat.value} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
