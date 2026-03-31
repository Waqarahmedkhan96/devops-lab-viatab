import type { Story } from '../../types'
import { formatTimestamp } from '../../utils/format'

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-slate-700 hover:shadow-slate-950/40">
      <img src={story.imageUrl} alt={story.title} className="h-56 w-full object-cover" />
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-400">
          <span className="rounded-full bg-slate-800 px-2.5 py-1">{story.department.replace('_', ' ')}</span>
          <span className="rounded-full bg-slate-800 px-2.5 py-1">{story.category}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{story.title}</h3>
          <p className="mt-2 text-slate-300">{story.caption}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400">
          <span>{story.authorName}</span>
          <span>{formatTimestamp(story.createdAt)}</span>
        </div>
      </div>
    </article>
  )
}
