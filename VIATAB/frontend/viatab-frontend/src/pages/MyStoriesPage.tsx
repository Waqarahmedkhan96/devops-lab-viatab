import { useEffect, useState } from 'react'
import { fetchMyStories } from '../api/stories'
import { StoryCard } from '../components/stories/StoryCard'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

export function MyStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadMyStories() {
      setError('')
      setLoading(true)

      try {
        const response = await fetchMyStories()
        setStories(response.content)
      } catch (error) {
        setError(getApiErrorMessage(error, 'Unable to load your stories.'))
      } finally {
        setLoading(false)
      }
    }

    loadMyStories()
  }, [])

  return (
    <section className="space-y-8">
      <header className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.35em] text-viatab-100">My Stories</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Your published stories</h1>
        <p className="mt-4 max-w-2xl text-slate-300">Manage your author feed and review your recent content contributions.</p>
      </header>

      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20">
          Loading your stories…
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 text-rose-100">
          {error}
        </div>
      ) : stories.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300 shadow-xl shadow-slate-950/20">
          You have not created any stories yet. Use Create Story to add your first story.
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