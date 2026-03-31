import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchStories } from '../api/stories'
import { ROUTES } from '../utils/routes'
import { SectionHeader } from '../components/ui/SectionHeader'
import { StatCard } from '../components/ui/StatCard'
import { PageTransition } from '../components/ui/PageTransition'
import type { Story } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const highlights = [
  {
    title: 'Cross-department publishing',
    description: 'Professors in software, business and construction share stories with polished metadata and imagery.',
  },
  {
    title: 'Verified academic feed',
    description: 'A curated campus network designed for trusted, readable faculty storytelling.',
  },
  {
    title: 'Modern publishing workflow',
    description: 'Create, preview and manage stories without breaking backend integration.',
  },
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
      } catch (error) {
        setError(getApiErrorMessage(error, 'Unable to load featured stories.'))
      } finally {
        setLoading(false)
      }
    }

    loadStories()
  }, [])

  const publishedStories = useMemo(() => stories.filter((story) => story.status === 'PUBLISHED'), [stories])
  const departmentCount = useMemo(() => new Set(stories.map((story) => story.department)).size, [stories])
  const featuredStories = publishedStories.slice(0, 3)

  return (
    <PageTransition>
      <section className="grid gap-10 rounded-[2rem] border border-border bg-white p-8 shadow-soft md:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
              VIATAB • Academic publishing
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              Publish university stories with confidence and editorial polish.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary">
              VIATAB is designed for professors to create, share and discover academic narratives across departments in a modern light interface.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to={ROUTES.STORIES}
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Explore stories
              </Link>
              <Link
                to={ROUTES.CREATE_STORY}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition hover:border-primary hover:text-primary"
              >
                Publish your story
              </Link>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-background p-6 shadow-soft sm:p-8">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <span className="font-semibold text-text-primary">Latest campus stories</span>
              <span>{publishedStories.length} items</span>
            </div>
            <div className="mt-6 space-y-4">
              {loading ? (
                <div className="space-y-3">
                  <div className="h-24 rounded-[1.5rem] bg-slate-100" />
                  <div className="h-24 rounded-[1.5rem] bg-slate-100" />
                </div>
              ) : error ? (
                <div className="rounded-[1.5rem] bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
              ) : featuredStories.length === 0 ? (
                <div className="rounded-[1.5rem] bg-slate-100 p-6 text-sm text-text-secondary">No featured stories available yet.</div>
              ) : (
                featuredStories.map((story) => (
                  <div key={story.id} className="rounded-[1.5rem] border border-border bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-text-primary">{story.title}</p>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{story.caption}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <StatCard label="Author network" value={stories.length} hint="Stories flowing across departments." />
          <StatCard label="Active departments" value={departmentCount} hint="Faculty voices from multiple programs." />
          <StatCard label="Published stories" value={publishedStories.length} hint="Live academic content in the feed." />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft">
              <h3 className="text-xl font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-3 text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.75rem] border border-border bg-background p-8 shadow-soft">
          <SectionHeader
            eyebrow="Why VIATAB"
            title="A refined publishing platform for university storytellers"
            description="VIATAB brings clarity, editorial structure and academic style to campus narratives. It keeps your workflows simple while focusing on readability and content quality."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border bg-white p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Secure by design</p>
              <p className="mt-3 text-text-secondary">JWT-backed authentication and protected author routes keep faculty data safe.</p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-white p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-secondary">Editorial controls</p>
              <p className="mt-3 text-text-secondary">Category, department and status metadata support professional publishing structure.</p>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
