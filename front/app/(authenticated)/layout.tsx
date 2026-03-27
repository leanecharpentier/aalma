import Header from "@/components/layout/Header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-40">
      <Header />
      <main className="flex flex-col grow overflow-y-auto h-full">
        {children}
      </main>
    </div>
  );
}
