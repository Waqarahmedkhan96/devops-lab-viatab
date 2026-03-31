interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.28em] text-secondary">{eyebrow}</p>
      <h2 className="text-3xl font-semibold text-text-primary sm:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-text-secondary">{description}</p> : null}
    </div>
  )
}
