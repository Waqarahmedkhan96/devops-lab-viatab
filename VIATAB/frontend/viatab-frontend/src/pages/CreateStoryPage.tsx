import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createStory } from '../api/stories'
import type { StoryForm } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'

const departments = [
  { label: 'Software Engineering', value: 'SOFTWARE_ENGINEERING' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Construction', value: 'CONSTRUCTION' },
]

const statuses = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
]

const previewFallback =
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'

export function CreateStoryPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<StoryForm>({
    title: '',
    caption: '',
    content: '',
    department: 'SOFTWARE_ENGINEERING',
    status: 'PUBLISHED',
    imageUrl: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState(false)

  const previewImage = useMemo(() => {
    if (imageError || !form.imageUrl.trim()) {
      return previewFallback
    }
    return form.imageUrl
  }, [form.imageUrl, imageError])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'imageUrl') {
      setImageError(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await createStory(form)
      navigate('/my-stories')
    } catch (error) {
      setError(getApiErrorMessage(error, 'Unable to create story. Please check your input.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-border bg-white p-8 shadow-soft">
          <SectionHeader
            eyebrow="Create story"
            title="Publish a new academic narrative"
            description="Fill out the story details and preview the result live before you publish."
          />

          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-3 text-sm text-text-primary">
                <span className="font-medium">Title</span>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-3 text-sm text-text-primary">
                <span className="font-medium">Category</span>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>
            </div>

            <label className="space-y-3 text-sm text-text-primary">
              <span className="font-medium">Caption</span>
              <input
                name="caption"
                value={form.caption}
                onChange={handleChange}
                required
                className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-3 text-sm text-text-primary">
              <span className="font-medium">Image URL</span>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <label className="space-y-3 text-sm text-text-primary">
              <span className="font-medium">Content</span>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={8}
                className="w-full rounded-[1.5rem] border border-border bg-background px-4 py-4 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-3 text-sm text-text-primary">
                <span className="font-medium">Department</span>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {departments.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="space-y-3 text-sm text-text-primary">
                <span className="font-medium">Status</span>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {statuses.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {error && (
              <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Publishing story…' : 'Publish story'}
            </button>
          </form>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-[1.75rem] border border-border bg-white p-6 shadow-soft"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-secondary">Live preview</p>
              <h2 className="text-2xl font-semibold text-text-primary">Story preview</h2>
            </div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
              {form.status.toLowerCase()}
            </span>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-slate-100">
            <img
              src={previewImage}
              alt="Story preview"
              onError={() => setImageError(true)}
              className="h-64 w-full object-cover"
            />
            <div className="p-6">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-text-secondary">
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  {form.department.replaceAll('_', ' ')}
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1">
                  {form.category || 'General'}
                </span>
              </div>

              <h3 className="text-2xl font-semibold text-text-primary">
                {form.title || 'Your story title will appear here'}
              </h3>

              <p className="mt-3 text-text-secondary">
                {form.caption || 'Add a short caption to introduce your narrative.'}
              </p>

              <div className="mt-6 rounded-[1.5rem] bg-background p-4 text-sm text-text-secondary">
                {form.content
                  ? form.content.slice(0, 180) + (form.content.length > 180 ? '...' : '')
                  : 'Your story content will be rendered in this section as you type.'}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  )
}