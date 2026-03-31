import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Story } from '../../types'
import { formatTimestamp } from '../../utils/format'

const departmentLabels: Record<string, string> = {
  SOFTWARE_ENGINEERING: 'Software Engineering',
  BUSINESS: 'Business',
  CONSTRUCTION: 'Construction',
}

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-amber-100 text-amber-700',
  PUBLISHED: 'bg-accent/10 text-accent',
}

export function StoryCard({ story }: { story: Story }) {
  const [imageError, setImageError] = useState(false)
  const department = departmentLabels[story.department] ?? story.department.replace('_', ' ')

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
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
        <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
          {story.category || 'General'}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-text-primary">{story.title}</h3>
          <p className="text-sm leading-6 text-text-secondary max-h-16 overflow-hidden">{story.caption}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-secondary">
          <span>{story.authorName}</span>
          <span>{formatTimestamp(story.createdAt)}</span>
        </div>
        <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[story.status]}`}>
          {story.status.toLowerCase()}
        </div>
      </div>
    </motion.article>
  )
}
