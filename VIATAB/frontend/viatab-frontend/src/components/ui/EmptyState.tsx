interface EmptyStateProps {
  title: string
  description: string
  action?: { label: string; href: string }
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-white px-6 py-12 text-center shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary">No results yet</p>
      <h2 className="mt-4 text-3xl font-semibold text-text-primary">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-text-secondary">{description}</p>
      {action ? (
        <a
          href={action.href}
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  )
}
