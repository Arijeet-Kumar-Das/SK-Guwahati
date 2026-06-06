export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-green-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-slate-400 font-medium">Loading…</p>
      </div>
    </div>
  );
}
