import type { ChangeEventHandler } from 'react'

interface SelectOption {
  label: string
  value: string
}

interface SelectDropdownProps {
  label: string
  name: string
  value: string
  options: SelectOption[]
  onChange: ChangeEventHandler<HTMLSelectElement>
  className?: string
}

export function SelectDropdown({ label, name, value, options, onChange, className = '' }: SelectDropdownProps) {
  return (
    <label className="block text-sm font-medium text-text-secondary">
      <span className="mb-2 block text-text-primary">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
