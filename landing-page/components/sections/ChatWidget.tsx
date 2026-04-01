export function ChatWidget() {
  return (
    <div className="fixed w-fit bottom-8 right-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 z-50">
      <span className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
        <span className="w-5 h-5 rounded-full border-2 border-primary-500" />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">
          Discuter avec Aalma
        </p>
        <p className="text-xs text-gray-400">IA</p>
      </div>
    </div>
  );
}
