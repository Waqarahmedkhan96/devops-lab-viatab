import { useEffect, useMemo, useState } from 'react'
import { fetchMyStories } from '../api/stories'
import { StoryCard } from '../components/stories/StoryCard'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { EmptyState } from '../components/ui/EmptyState'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const tabs = ['All', 'PUBLISHED', 'DRAFT'] as const

export function MyStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [search, setSearch] = useState('')

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

  const publishedCount = useMemo(
    () => stories.filter((story) => story.status === 'PUBLISHED').length,
    [stories],
  )

  const draftCount = useMemo(
    () => stories.filter((story) => story.status === 'DRAFT').length,
    [stories],
  )

  const lastPublished = useMemo(() => {
    const sorted = stories
      .filter((story) => story.status === 'PUBLISHED')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return sorted[0]?.title ?? 'No published stories yet'
  }, [stories])

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase()

    return stories
      .filter((story) => activeTab === 'All' || story.status === activeTab)
      .filter((story) => {
        return (
          story.title.toLowerCase().includes(query) ||
          story.caption.toLowerCase().includes(query) ||
          story.category.toLowerCase().includes(query)
        )
      })
  }, [stories, activeTab, search])

  return (
    <PageTransition>
      <div className="space-y-8">
        <div className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft">
          <SectionHeader
            eyebrow="Author dashboard"
            title="Your stories at a glance"
            description="Monitor your drafts, published work, and quickly locate your latest pieces in one refined view."
          />
        </div>

        {loading ? (
          <div className="rounded-[1.75rem] border border-border bg-white p-8 text-center shadow-soft">
            Loading your stories…
          </div>
        ) : error ? (
          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-soft">
            {error}
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="grid gap-6">
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard label="Total stories" value={stories.length} hint="All drafts and published work." />
                <StatCard label="Published" value={publishedCount} hint="Live stories available in feed." />
                <StatCard label="Drafts" value={draftCount} hint="Stories still in progress." />
              </div>

              <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-secondary">Filter</p>
                    <h2 className="text-xl font-semibold text-text-primary">My stories</h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                          activeTab === tab
                            ? 'bg-primary text-white shadow-soft'
                            : 'border border-border bg-background text-text-secondary hover:bg-primary/5'
                        }`}
                      >
                        {tab === 'All' ? 'All' : tab.charAt(0) + tab.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-text-secondary">
                    Search your stories
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by title, category, or caption"
                      className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </label>
                </div>
              </div>

              {filteredStories.length === 0 ? (
                <EmptyState
                  title="No stories found"
                  description="Update your search or switch between drafts and published stories to see matched results."
                />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.24em] text-secondary">Snapshot</p>
                <p className="mt-4 text-lg font-semibold text-text-primary">Last published</p>
                <p className="mt-3 text-text-secondary">{lastPublished}</p>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
                <p className="text-sm uppercase tracking-[0.24em] text-secondary">Quick tips</p>
                <ul className="mt-4 space-y-3 text-text-secondary">
                  <li>• Use strong titles to increase feed visibility.</li>
                  <li>• Keep captions concise and engaging.</li>
                  <li>• Publish drafts when your story is ready for review.</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </PageTransition>
  )
}