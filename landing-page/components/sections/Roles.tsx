const roles = [
  {
    title: "RH",
    description:
      "Comprenez mieux les besoins de vos equipes et mettez en place des actions adaptees au terrain",
  },
  {
    title: "Manager",
    description:
      "Comprenez mieux les besoins de vos equipes et mettez en place des actions adaptees au terrain",
  },
  {
    title: "PDG",
    description:
      "Comprenez mieux les besoins de vos equipes et mettez en place des actions adaptees au terrain",
  },
];

export function Roles() {
  return (
    <section className="w-full px-6 lg:px-12 py-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
          Une plateforme concue
          <br />
          pour piloter et agir a tous les niveaux
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-white border border-primary-100 rounded-2xl p-6 flex flex-col justify-between min-h-[240px]"
            >
              <h3 className="text-3xl font-bold text-primary-500">
                {role.title}
              </h3>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Role
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
