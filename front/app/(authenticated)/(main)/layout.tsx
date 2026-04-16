import Sidebar from "@/components/layout/Sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <section className="flex flex-col grow overflow-y-auto p-6 min-h-0">
        {children}
      </section>
    </div>
  );
}
