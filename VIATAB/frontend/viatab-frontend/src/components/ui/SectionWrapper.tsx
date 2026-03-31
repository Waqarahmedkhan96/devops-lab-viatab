import type { ReactNode } from 'react'

export function SectionWrapper({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[1.75rem] border border-border bg-white p-8 shadow-soft ${className}`}>{children}</section>
}
