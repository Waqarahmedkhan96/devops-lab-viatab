import { useEffect, useState } from 'react'
import { fetchStories } from '../api/stories'
import { StoryCard } from '../components/stories/StoryCard'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

export function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadStories() {
      setError('')
      setLoading(true)

      try {
        const response = await fetchStories()
        setStories(response.content)
      } catch (error) {
        setError(getApiErrorMessage(error, 'Unable to load stories at this time.'))
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.35em] text-viatab-100">Stories</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Campus feed for the latest student narratives</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Browse published stories with full image, category, department, and author context.</p>
      </header>

      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20">
          Loading stories…
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 text-rose-100">
          {error}
        </div>
      ) : stories.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300 shadow-xl shadow-slate-950/20">
          No stories available yet. Create a story to get started.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </section>
  )
}