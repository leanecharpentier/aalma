import Header from "@/components/layout/Header";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <main className="flex grow overflow-hidden">{children}</main>
    </div>
  );
}
