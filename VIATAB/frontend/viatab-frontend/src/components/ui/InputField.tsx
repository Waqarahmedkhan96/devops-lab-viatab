import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: ReactNode
}

export function InputField({ label, icon, className = '', ...props }: InputFieldProps) {
  return (
    <label className="block text-sm font-medium text-text-secondary">
      <span className="mb-2 block text-text-primary">{label}</span>
      <div className="relative">
        {icon ? <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-text-secondary">{icon}</span> : null}
        <input
          {...props}
          className={`w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${icon ? 'pl-12' : ''} ${className}`}
        />
      </div>
    </label>
  )
}
