export default function GearCardSkeleton() {
  return (
    <div className="relative flex w-full max-w-sm mx-auto flex-col justify-between overflow-hidden rounded-2xl border-l-4 border-l-slate-800 border-y border-r border-slate-800/80 bg-[#060b13] p-3 shadow-md animate-pulse">
      <div className="relative h-56 w-full overflow-hidden rounded-xl bg-slate-800/70 border border-slate-800/60">
        <div className="absolute top-3 right-3 z-10">
          <div className="h-6 w-24 rounded-full bg-slate-700/80 backdrop-blur-md" />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between space-y-4 px-3 pt-5 pb-2">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="h-7 w-20 rounded-xl bg-slate-800" />
            <div className="h-7 w-20 rounded-xl bg-slate-800/70" />
          </div>

          <div className="pt-1">
            <div className="h-7 w-3/4 rounded-lg bg-slate-800" />
          </div>

          <div className="flex items-baseline gap-2 pt-3 border-t border-slate-800/60">
            <div className="h-9 w-28 rounded-lg bg-slate-800" />
            <div className="h-4 w-10 rounded bg-slate-800/60" />
          </div>
        </div>

        <div className="mt-4 h-11 w-full rounded-xl bg-slate-800/80" />
      </div>
    </div>
  );
}
