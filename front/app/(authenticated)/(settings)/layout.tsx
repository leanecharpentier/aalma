import SettingsSidebar from "@/components/layout/SettingsSidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <SettingsSidebar />
      <main className="flex flex-col grow overflow-y-auto p-6">{children}</main>
    </div>
  );
}
