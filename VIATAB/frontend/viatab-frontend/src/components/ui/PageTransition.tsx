import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const pageMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={pageMotion.initial}
      animate={pageMotion.animate}
      exit={pageMotion.exit}
      transition={pageMotion.transition}
      className="space-y-8"
    >
      {children}
    </motion.div>
  )
}
