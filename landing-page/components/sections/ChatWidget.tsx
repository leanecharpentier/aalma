import Image from "next/image";

export function ChatWidget() {
  return (
    <div className="fixed w-fit bottom-8 right-8 bg-white rounded-2xl shadow-cardOrange px-4 py-3 flex items-center gap-3 z-50">
      <Image
        src="/halo-aalma.png"
        alt="Aalma"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold text-foreground">
          Discuter avec Aalma
        </p>
        <p className="text-xs text-gray-400">IA</p>
      </div>
    </div>
  );
}
