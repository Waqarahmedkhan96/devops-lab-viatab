import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fetchStories } from '../api/stories'
import { ROUTES } from '../utils/routes'
import { StoryCard } from '../components/stories/StoryCard'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { Badge } from '../components/ui/Badge'
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const highlights = [
  {
    label: 'Editorial-first workflow',
    description: 'Publish stories with structured metadata and a polished academic tone.',
  },
  {
    label: 'Cross-department discovery',
    description: 'Enable software, business and construction faculty to share campus research and updates.',
  },
  {
    label: 'Secure author experience',
    description: 'Authentication and personal story dashboards keep your content private and manageable.',
  },
]

type HomeDepartmentBadge = { name: string; variant: 'default' | 'accent' | 'status' | 'muted' }

const departments: HomeDepartmentBadge[] = [
  { name: 'Software Engineering', variant: 'default' },
  { name: 'Business', variant: 'accent' },
  { name: 'Construction', variant: 'status' },
]

export function HomePage() {
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
      } catch (err) {
        setError(getApiErrorMessage(err, 'Unable to load featured stories.'))
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  const publishedStories = useMemo(() => stories.filter((story) => story.status === 'PUBLISHED'), [stories])
  const departmentCount = useMemo(() => new Set(stories.map((story) => story.department)).size, [stories])
  const featuredStories = publishedStories.slice(0, 4)
  const recentActivity = useMemo(() => publishedStories.slice(0, 3), [publishedStories])

  return (
    <PageTransition>
      <div className="space-y-10">
        <SectionWrapper className="overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
                VIATAB • Campus storytelling
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl"
              >
                Share ideas across departments
              </motion.h1>
              <p className="max-w-2xl text-lg leading-8 text-text-secondary">
                Publish academic narratives, discover faculty research, and elevate campus conversation in a clean, modern publishing environment.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to={ROUTES.CREATE_STORY}
                  className="inline-flex items-center justify-center rounded-3xl bg-highlight px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-orange-500"
                >
                  Get started
                </Link>
                <Link
                  to={ROUTES.STORIES}
                  className="inline-flex items-center justify-center rounded-3xl border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-primary hover:text-primary"
                >
                  Browse stories
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="overflow-hidden rounded-[1.75rem] border border-border bg-white p-8 shadow-soft"
            >
              <div className="h-72 rounded-[1.5rem] bg-gradient-to-br from-secondary/10 via-slate-100 to-background p-6 shadow-inner">
                <div className="flex h-full flex-col justify-between">
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      Academic Dashboard
                    </span>
                    <div>
                      <h2 className="text-3xl font-semibold text-text-primary">Campus highlights</h2>
                      <p className="mt-3 max-w-xs text-sm text-text-secondary">
                        A polished feed for faculty stories, research notes and campus publication updates.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/90 p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.32em] text-secondary">Stories</p>
                      <p className="mt-3 text-2xl font-semibold text-text-primary">{publishedStories.length}</p>
                    </div>
                    <div className="rounded-3xl bg-white/90 p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.32em] text-secondary">Departments</p>
                      <p className="mt-3 text-2xl font-semibold text-text-primary">{departmentCount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <StatCard label="Published stories" value={publishedStories.length} hint="Latest academic content in the feed." />
              <StatCard label="Departments" value={departmentCount} hint="Featured research areas." />
              <StatCard label="Today" value="Live updates" hint="Fresh campus stories and insight." />
            </div>

            <SectionWrapper>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <SectionHeader
                    eyebrow="Featured Stories"
                    title="Recent campus narratives you should explore"
                    description="A curated selection of stories from the latest published faculty work."
                  />
                </div>
                <Link className="text-sm font-semibold text-primary transition hover:text-primary/90" to={ROUTES.STORIES}>
                  View all stories →
                </Link>
              </div>

              {loading ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  <LoadingSkeleton rows={5} />
                  <LoadingSkeleton rows={5} />
                  <LoadingSkeleton rows={5} />
                </div>
              ) : error ? (
                <div className="rounded-[1.5rem] bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {featuredStories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              )}
            </SectionWrapper>
          </div>

          <aside className="space-y-6">
            <SectionWrapper>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-secondary">Departments</p>
                  <h3 className="mt-3 text-xl font-semibold text-text-primary">Academic areas</h3>
                </div>
              </div>
              <div className="space-y-3">
                {departments.map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-3xl border border-border bg-background px-4 py-3">
                    <span className="text-sm text-text-primary">{item.name}</span>
                    <Badge variant={item.variant}>{item.name.split(' ').map((word) => word[0]).join('')}</Badge>
                  </div>
                ))}
              </div>
            </SectionWrapper>

            <SectionWrapper>
              <p className="text-sm uppercase tracking-[0.28em] text-secondary">Latest Activity</p>
              <div className="mt-6 space-y-4">
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-text-secondary">No activity yet. Publish a story to populate the feed.</p>
                ) : (
                  recentActivity.map((story) => (
                    <div key={story.id} className="rounded-3xl border border-border bg-background p-4">
                      <p className="text-sm font-semibold text-text-primary">{story.title}</p>
                      <p className="mt-2 text-sm text-text-secondary">{story.authorName} · {new Date(story.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))
                )}
              </div>
            </SectionWrapper>
          </aside>
        </div>

        <SectionWrapper>
          <SectionHeader
            eyebrow="Explore"
            title="Designed for academic collaboration and polished publication"
            description="VIATAB keeps content workflows minimal, readable and professional for university storytellers."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="space-y-3 rounded-[1.5rem] border border-border bg-background p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary/10 text-primary">★</div>
                <p className="text-lg font-semibold text-text-primary">{item.label}</p>
                <p className="text-sm leading-7 text-text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  )
}
