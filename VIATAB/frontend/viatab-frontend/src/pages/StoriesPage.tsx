import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchStories } from '../api/stories'
import { StoryCard } from '../components/stories/StoryCard'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { EmptyState } from '../components/ui/EmptyState'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const departments = ['All', 'SOFTWARE_ENGINEERING', 'BUSINESS', 'CONSTRUCTION']
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]

export function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('All')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')

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

  const categories = useMemo(
    () => Array.from(new Set(stories.map((story) => story.category || 'General'))).sort(),
    [stories],
  )

  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase()
    return stories
      .filter((story) => {
        const matchesSearch = [story.title, story.caption, story.authorName].some((value) =>
          value.toLowerCase().includes(query),
        )
        const matchesDept = department === 'All' || story.department === department
        const matchesCategory = category === 'All' || story.category === category
        const matchesStatus = status === 'All' || story.status === status
        return matchesSearch && matchesDept && matchesCategory && matchesStatus
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
  }, [stories, search, department, category, status, sortOrder])

  return (
    <PageTransition>
      <section className="space-y-8">
        <div className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft">
          <SectionHeader
            eyebrow="Stories"
            title="Campus feed for the most compelling academic stories"
            description="Search, filter and explore faculty narratives with department, category and publishing status controls."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6 rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr]">
              <label className="space-y-2">
                <span className="text-sm font-medium text-text-secondary">Search</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by title, author or caption"
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-text-secondary">Sort</span>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2">
                <span className="text-sm font-medium text-text-secondary">Department</span>
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === 'All' ? 'All departments' : dept.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-text-secondary">Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="All">All categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-text-secondary">Status</span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  <option value="All">All statuses</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </label>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.28em] text-secondary">Overview</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] border border-border bg-background p-4">
                <p className="text-sm text-text-secondary">Total stories</p>
                <p className="mt-2 text-3xl font-semibold text-text-primary">{stories.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-background p-4">
                <p className="text-sm text-text-secondary">Matching results</p>
                <p className="mt-2 text-3xl font-semibold text-text-primary">{filteredStories.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-border bg-background p-4">
                <p className="text-sm text-text-secondary">Available categories</p>
                <p className="mt-2 text-lg font-semibold text-text-primary">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[1.75rem] border border-border bg-white p-12 text-center shadow-soft">Loading stories…</div>
        ) : error ? (
          <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-8 text-text-secondary shadow-soft">{error}</div>
        ) : filteredStories.length === 0 ? (
          <EmptyState
            title="No stories match your search"
            description="Try adjusting filters or search terms to find more academic stories across the platform."
            action={{ label: 'Reset filters', href: '/stories' }}
          />
        ) : (
          <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredStories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </motion.div>
        )}
      </section>
    </PageTransition>
  )
}
