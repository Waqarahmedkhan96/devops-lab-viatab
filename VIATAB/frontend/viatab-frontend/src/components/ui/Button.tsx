import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  children: ReactNode
}

const variants = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  ghost: 'bg-background text-text-primary hover:bg-slate-50 border border-border',
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center justify-center rounded-3xl px-5 py-3 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
