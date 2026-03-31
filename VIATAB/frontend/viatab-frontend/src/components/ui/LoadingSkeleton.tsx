export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
      <div className="space-y-4 animate-pulse">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="h-4 rounded-full bg-slate-200" />
        ))}
      </div>
    </div>
  )
}
