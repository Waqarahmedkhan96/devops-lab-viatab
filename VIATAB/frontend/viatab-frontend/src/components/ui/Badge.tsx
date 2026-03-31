import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'status' | 'muted'
}

const variantStyles = {
  default: 'bg-secondary/10 text-secondary',
  accent: 'bg-accent/10 text-accent',
  secondary: 'bg-secondary/10 text-secondary',
  status: 'rounded-full bg-background border border-border text-text-secondary',
  muted: 'bg-slate-100 text-text-secondary',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${variantStyles[variant]}`}>{children}</span>
}
