export default function Header() {
  return (
    <header className="flex flex-row items-center justify-between bg-white p-6 border border-gray-100 rounded-xl">
      <img src="/aalma.svg" alt="Aalma Logo" />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary-200 bg-primary-500">
        <p className="text-primary-200">A</p>
      </div>
    </header>
  );
}
