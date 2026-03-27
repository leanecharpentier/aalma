import SettingsSidebar from "@/components/layout/SettingsSidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <SettingsSidebar />
      <section className="flex flex-col grow overflow-y-auto p-6">
        {children}
      </section>
    </div>
  );
}
