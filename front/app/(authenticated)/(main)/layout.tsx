import Sidebar from "@/components/layout/Sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="flex flex-col grow overflow-y-auto p-6">{children}</main>
    </div>
  );
}
