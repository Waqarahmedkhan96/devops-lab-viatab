import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { fetchStories } from '../api/stories'
import { StoryCard } from '../components/stories/StoryCard'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { Badge } from '../components/ui/Badge'
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const departments = ['All', 'SOFTWARE_ENGINEERING', 'BUSINESS', 'CONSTRUCTION']
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
]
const statusOptions = [
  { label: 'All statuses', value: 'All' },
  { label: 'Published', value: 'PUBLISHED' },
  { label: 'Draft', value: 'DRAFT' },
]

export function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [department, setDepartment] = useState('All')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    async function loadStories() {
      setError('')
      setLoading(true)

      try {
        const response = await fetchStories()
        setStories(response.content)
      } catch (err) {
        setError(getApiErrorMessage(err, 'Unable to load stories at this time.'))
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  const query = useMemo(() => (searchParams.get('q') || '').trim().toLowerCase(), [searchParams])

  const categories = useMemo(
    () => Array.from(new Set(stories.map((story) => story.category || 'General'))).sort(),
    [stories],
  )

  const filteredStories = useMemo(() => {
    return stories
      .filter((story) => {
        const matchesSearch = [story.title, story.caption, story.authorName].some((value) =>
          value.toLowerCase().includes(query),
        )
        const matchesDept = department === 'All' || story.department === department
        const matchesCategory = category === 'All' || (story.category || 'General') === category
        const matchesStatus = status === 'All' || story.status === status
        return matchesSearch && matchesDept && matchesCategory && matchesStatus
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
  }, [stories, query, department, category, status, sortOrder])

  const resetFilters = () => {
    setDepartment('All')
    setCategory('All')
    setStatus('All')
    setSortOrder('newest')
    setSearchParams(query ? { q: query } : {})
  }

  return (
    <PageTransition>
      <div className="grid gap-8">
        <SectionWrapper>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionHeader
                eyebrow="Stories"
                title="Campus feed for the most compelling academic stories"
                description="Filter content by department, category and publication status while discovering faculty narratives."
              />
              {query ? (
                <p className="mt-3 text-sm text-text-secondary">
                  Showing results for <span className="font-semibold text-text-primary">"{query}"</span>
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-3xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-slate-50"
            >
              Reset filters
            </button>
          </div>
        </SectionWrapper>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.9fr]">
          <div className="space-y-6">
            <SectionWrapper>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Department</p>
                  <select
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept === 'All' ? 'All departments' : dept.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary">Category</p>
                  <select
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    <option value="All">All categories</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm font-medium text-text-secondary">Status</p>
                  <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-text-secondary">Sort</p>
                  <select
                    value={sortOrder}
                    onChange={(event) => setSortOrder(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="rounded-[1.75rem] border border-border bg-background p-4">
                  <p className="text-sm text-text-secondary">Search note</p>
                  <p className="mt-3 text-sm text-text-primary">
                    Use the search bar in the header to filter stories across the platform.
                  </p>
                </div>
              </div>
            </SectionWrapper>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <LoadingSkeleton rows={5} />
                <LoadingSkeleton rows={5} />
                <LoadingSkeleton rows={5} />
              </div>
            ) : error ? (
              <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-8 text-text-secondary shadow-soft">{error}</div>
            ) : filteredStories.length === 0 ? (
              <EmptyState
                title="No stories match your filters"
                description="Adjust the department, category, or sort options to explore more stories."
                action={{ label: 'Reset filters', href: '/stories' }}
              />
            ) : (
              <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {filteredStories.map((story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </motion.div>
            )}
          </div>

          <aside className="space-y-6">
            <SectionWrapper>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-secondary">Trending</p>
                  <h3 className="mt-3 text-xl font-semibold text-text-primary">Popular departments</h3>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {departments.slice(1).map((dept) => (
                  <div key={dept} className="flex items-center justify-between rounded-3xl border border-border bg-background px-4 py-3">
                    <span className="text-sm text-text-primary">{dept.replace('_', ' ')}</span>
                    <Badge variant="accent">{dept.replace('_', ' ').split(' ').map((word) => word[0]).join('')}</Badge>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            <SectionWrapper>
              <p className="text-sm uppercase tracking-[0.28em] text-secondary">Overview</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.5rem] border border-border bg-white p-4">
                  <p className="text-sm text-text-secondary">Total stories</p>
                  <p className="mt-2 text-3xl font-semibold text-text-primary">{stories.length}</p>
                </div>
                <div className="rounded-[1.5rem] border border-border bg-white p-4">
                  <p className="text-sm text-text-secondary">Matching results</p>
                  <p className="mt-2 text-3xl font-semibold text-text-primary">{filteredStories.length}</p>
                </div>
              </div>
            </SectionWrapper>
          </aside>
        </div>
      </div>
    </PageTransition>
  )
}
