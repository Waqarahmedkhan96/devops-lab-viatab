import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon?: ReactNode
}

export function StatCard({ label, value, hint, icon }: StatCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-slate-50 p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-text-secondary">{label}</p>
          <p className="mt-4 text-3xl font-semibold text-text-primary">{value}</p>
        </div>
        {icon ? <div className="h-12 w-12 rounded-3xl bg-primary/10 text-primary grid place-items-center">{icon}</div> : null}
      </div>
      {hint && <p className="mt-4 text-sm text-text-secondary">{hint}</p>}
    </div>
  )
}
