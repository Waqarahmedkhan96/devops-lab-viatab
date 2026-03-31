import { useMemo, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { createStory } from '../api/stories'
import type { StoryForm } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { InputField } from '../components/ui/InputField'
import { SelectDropdown } from '../components/ui/SelectDropdown'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const departments = [
  { label: 'Software Engineering', value: 'SOFTWARE_ENGINEERING' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Construction', value: 'CONSTRUCTION' },
]

const statuses = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
]

const previewFallback = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'

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
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to create story. Please check your input.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionWrapper>
          <SectionHeader
            eyebrow="Create story"
            title="Publish a new academic narrative"
            description="Write a story, assign metadata, and preview your draft before you publish."
          />

          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <InputField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter your story title"
              />
              <InputField
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="e.g. Research, Announcement"
              />
            </div>

            <InputField
              label="Caption"
              name="caption"
              value={form.caption}
              onChange={handleChange}
              required
              placeholder="Write a brief summary of your story"
            />

            <InputField
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />

            <div>
              <label className="block text-sm font-medium text-text-secondary">
                Content
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={10}
                className="mt-3 w-full rounded-[1.5rem] border border-border bg-background px-4 py-4 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="Write the full story content here"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <SelectDropdown
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
                options={departments}
              />
              <SelectDropdown
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
                options={statuses}
              />
            </div>

            {error ? (
              <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>
            ) : null}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Publishing story…' : 'Publish story'}
            </Button>
          </form>
        </SectionWrapper>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="space-y-6"
        >
          <SectionWrapper className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-secondary">Live preview</p>
                <h2 className="text-2xl font-semibold text-text-primary">Story preview</h2>
              </div>
              <Badge variant="accent">{form.status.toLowerCase()}</Badge>
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
                  <span className="rounded-full border border-border bg-background px-3 py-1">{form.department.replaceAll('_', ' ')}</span>
                  <span className="rounded-full border border-border bg-background px-3 py-1">{form.category || 'General'}</span>
                </div>

                <h3 className="text-2xl font-semibold text-text-primary">{form.title || 'Your story title will appear here'}</h3>

                <p className="mt-3 text-text-secondary">{form.caption || 'Add a short caption to introduce your narrative.'}</p>

                <div className="mt-6 rounded-[1.5rem] bg-background p-4 text-sm text-text-secondary">
                  {form.content
                    ? form.content.slice(0, 180) + (form.content.length > 180 ? '...' : '')
                    : 'Your story content will be rendered in this section as you type.'}
                </div>
              </div>
            </div>
          </SectionWrapper>
        </motion.section>
      </div>
    </PageTransition>
  )
}
