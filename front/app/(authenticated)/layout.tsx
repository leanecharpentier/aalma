import Sidebar from "@/components/layout/Sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-screen bg-gray-40">
      <Sidebar />
      <main className="flex flex-col grow overflow-y-auto p-6">{children}</main>
    </div>
  );
}
