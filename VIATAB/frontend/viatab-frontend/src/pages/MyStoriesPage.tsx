import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchMyStories, updateStory, deleteStory } from '../api/stories'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { StatCard } from '../components/ui/StatCard'
import { StoryCard } from '../components/stories/StoryCard'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { InputField } from '../components/ui/InputField'
import { SelectDropdown } from '../components/ui/SelectDropdown'
import type { Story, StoryForm } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const tabs = ['All', 'PUBLISHED', 'DRAFT'] as const

const departmentOptions = [
  { label: 'Software Engineering', value: 'SOFTWARE_ENGINEERING' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Construction', value: 'CONSTRUCTION' },
]

const statusOptions = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
]

export function MyStoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All')
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState('')
  const [searchParams] = useSearchParams()
  const [editForm, setEditForm] = useState<StoryForm>({
    title: '',
    caption: '',
    content: '',
    department: 'SOFTWARE_ENGINEERING',
    status: 'DRAFT',
    imageUrl: '',
    category: '',
  })

  const query = useMemo(() => (searchParams.get('q') || '').trim().toLowerCase(), [searchParams])

  useEffect(() => {
    async function loadMyStories() {
      setError('')
      setLoading(true)

      try {
        const response = await fetchMyStories()
        setStories(response.content)
      } catch (err) {
        setError(getApiErrorMessage(err, 'Unable to load your stories.'))
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
    return stories
      .filter((story) => activeTab === 'All' || story.status === activeTab)
      .filter((story) => {
        if (!query) return true
        return [story.title, story.caption, story.category].some((value) => value.toLowerCase().includes(query))
      })
  }, [stories, activeTab, query])

  const startEditing = (story: Story) => {
    setEditingStory(story)
    setEditError('')
    setEditForm({
      title: story.title,
      caption: story.caption,
      content: story.content,
      department: story.department,
      status: story.status,
      imageUrl: story.imageUrl,
      category: story.category,
    })
  }

  const cancelEditing = () => {
    setEditingStory(null)
    setEditError('')
  }

  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editingStory) return

    setEditLoading(true)
    setEditError('')

    try {
      const updated = await updateStory(editingStory.id, editForm)
      setStories((prev) => prev.map((story) => (story.id === updated.id ? updated : story)))
      setEditingStory(null)
    } catch (err) {
      setEditError(getApiErrorMessage(err, 'Unable to update story.'))
    } finally {
      setEditLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('Delete this story? This action cannot be undone.')
    if (!confirmed) return

    try {
      await deleteStory(id)
      setStories((prev) => prev.filter((story) => story.id !== id))
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to delete story.'))
    }
  }

  return (
    <PageTransition>
      <div className="space-y-8">
        <SectionWrapper className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <SectionHeader
              eyebrow="Author dashboard"
              title="Your stories at a glance"
              description="Monitor drafts, published work, and update or remove your own posts from a polished content dashboard."
            />
            {query ? (
              <p className="mt-4 text-sm text-text-secondary">
                Filtering your stories by <span className="font-semibold text-text-primary">"{query}"</span> from the header search.
              </p>
            ) : null}
          </div>
          <Link to="/create">
            <Button type="button">Create new story</Button>
          </Link>
        </SectionWrapper>

        {editingStory ? (
          <SectionWrapper>
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-secondary">Editing story</p>
                    <h2 className="text-2xl font-semibold text-text-primary">{editingStory.title}</h2>
                  </div>
                  <Button type="button" variant="ghost" className="text-sm text-text-secondary" onClick={cancelEditing}>
                    Cancel edit
                  </Button>
                </div>

                <form className="space-y-6" onSubmit={handleEditSave}>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <InputField
                      label="Title"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />
                    <InputField
                      label="Category"
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <InputField
                    label="Caption"
                    name="caption"
                    value={editForm.caption}
                    onChange={handleEditChange}
                    required
                  />

                  <InputField
                    label="Image URL"
                    name="imageUrl"
                    value={editForm.imageUrl}
                    onChange={handleEditChange}
                  />

                  <div>
                    <label className="block text-sm font-medium text-text-secondary">Content</label>
                    <textarea
                      name="content"
                      value={editForm.content}
                      onChange={handleEditChange}
                      required
                      rows={8}
                      className="mt-3 w-full rounded-[1.5rem] border border-border bg-background px-4 py-4 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <SelectDropdown
                      label="Department"
                      name="department"
                      value={editForm.department}
                      onChange={handleEditChange}
                      options={departmentOptions}
                    />
                    <SelectDropdown
                      label="Status"
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                      options={statusOptions}
                    />
                  </div>

                  {editError ? (
                    <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{editError}</div>
                  ) : null}

                  <Button type="submit" disabled={editLoading} className="w-full">
                    {editLoading ? 'Saving changes…' : 'Save changes'}
                  </Button>
                </form>
              </div>

              <div className="rounded-[1.75rem] border border-border bg-background p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-secondary">Tips</p>
                <ul className="mt-5 space-y-3 text-text-secondary">
                  <li>• Keep your title concise and research-focused.</li>
                  <li>• Update the status to published only after final review.</li>
                  <li>• Use category tags that are easy to discover.</li>
                </ul>
              </div>
            </div>
          </SectionWrapper>
        ) : null}

        {loading ? (
          <SectionWrapper>
            <div className="text-center text-text-secondary">Loading your stories…</div>
          </SectionWrapper>
        ) : error ? (
          <SectionWrapper>
            <div className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-8 text-rose-700 shadow-soft">{error}</div>
          </SectionWrapper>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard label="Total stories" value={stories.length} hint="All drafts and published work." />
                <StatCard label="Published" value={publishedCount} hint="Live stories available in feed." />
                <StatCard label="Drafts" value={draftCount} hint="Stories still in progress." />
              </div>

              <SectionWrapper>
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

                <div className="mt-6 rounded-[1.5rem] border border-border bg-background p-4">
                  <p className="text-sm text-text-secondary">Search your stories from the header search.</p>
                  <p className="mt-2 text-sm text-text-secondary">
                    Use the top navigation search to filter titles, categories, and captions.
                  </p>
                </div>
              </SectionWrapper>

              {filteredStories.length === 0 ? (
                <EmptyState
                  title="No stories found"
                  description="Update your search or switch between drafts and published stories to see matched results."
                />
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                  {filteredStories.map((story) => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      actions={
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            className="border border-border px-4 py-2 text-sm text-text-primary"
                            onClick={() => startEditing(story)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className="border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100"
                            onClick={() => handleDelete(story.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <SectionWrapper>
                <p className="text-sm uppercase tracking-[0.24em] text-secondary">Snapshot</p>
                <p className="mt-4 text-lg font-semibold text-text-primary">Last published</p>
                <p className="mt-3 text-text-secondary">{lastPublished}</p>
              </SectionWrapper>

              <SectionWrapper>
                <p className="text-sm uppercase tracking-[0.24em] text-secondary">Quick tips</p>
                <ul className="mt-4 space-y-3 text-text-secondary">
                  <li>• Use strong titles to increase feed visibility.</li>
                  <li>• Keep captions concise and engaging.</li>
                  <li>• Publish drafts when your story is ready for review.</li>
                </ul>
              </SectionWrapper>
            </aside>
          </div>
        )}
      </div>
    </PageTransition>
  )
}
