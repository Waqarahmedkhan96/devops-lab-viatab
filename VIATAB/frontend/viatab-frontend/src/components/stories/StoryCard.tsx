import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Story } from '../../types'
import { formatTimestamp } from '../../utils/format'
import { Badge } from '../ui/Badge'

const departmentLabels: Record<string, string> = {
  SOFTWARE_ENGINEERING: 'Software Engineering',
  BUSINESS: 'Business',
  CONSTRUCTION: 'Construction',
}

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-slate-100 text-text-secondary border border-border',
  PUBLISHED: 'bg-accent/10 text-accent',
}

export function StoryCard({ story, actions }: { story: Story; actions?: ReactNode }) {
  const [imageError, setImageError] = useState(false)
  const department = departmentLabels[story.department] ?? story.department.replace('_', ' ')

  return (
    <motion.article
      layout
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-soft"
    >
      <div className="relative overflow-hidden bg-slate-100">
        {story.imageUrl && !imageError ? (
          <img
            src={story.imageUrl}
            alt={story.title}
            onError={() => setImageError(true)}
            className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-56 items-center justify-center bg-slate-100 text-4xl text-text-secondary">
            ✦
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-text-primary shadow-sm">
          {department}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Badge variant="muted">{story.category || 'General'}</Badge>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[story.status]}`}>
            {story.status.toLowerCase()}
          </span>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">{story.title}</h3>
          <p className="text-sm leading-6 text-text-secondary max-h-16 overflow-hidden">{story.caption}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-secondary">
          <span>{story.authorName}</span>
          <span>{formatTimestamp(story.createdAt)}</span>
        </div>
        {actions ? <div className="mt-4 border-t border-border pt-4">{actions}</div> : null}
      </div>
    </motion.article>
  )
}
