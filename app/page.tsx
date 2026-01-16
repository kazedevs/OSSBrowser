export default function Home() {
  return (
    <div className="h-screen w-full bg-white p-2 overflow-hidden flex flex-col gap-2">
      <div className="w-full flex-1 bg-linear-to-br from-red-500 to-red-700 rounded-lg border border-red-400/20 relative shadow-xs">
        {/* Main Content */}
      </div>
      <div className="w-full h-14 flex items-center justify-between px-2">
        <span className="text-black font-bold font-instrument ml-2 text-xl">oss/browser</span>
        <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-zinc-800">
          Join the waitlist
        </button>
      </div>
    </div>
  );
}

