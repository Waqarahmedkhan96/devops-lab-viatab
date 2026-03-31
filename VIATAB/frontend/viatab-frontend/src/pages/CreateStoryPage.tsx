import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createStory } from '../api/stories'
import type { StoryForm } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'

const departments = [
  { label: 'Software Engineering', value: 'SOFTWARE_ENGINEERING' },
  { label: 'Business', value: 'BUSINESS' },
  { label: 'Construction', value: 'CONSTRUCTION' },
]

const statuses = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Published', value: 'PUBLISHED' },
]

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
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
    <section className="mx-auto max-w-4xl space-y-8 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 sm:p-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-viatab-100">Create story</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Add a new VIATAB story</h1>
        <p className="text-slate-400">Publish your campus story with category, department, and image metadata.</p>
      </div>

      <form className="grid gap-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            Category
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
            />
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-300">
          Caption
          <input
            name="caption"
            value={form.caption}
            onChange={handleChange}
            required
            className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Image URL
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Content
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={6}
            className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-300">
            Department
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
            >
              {departments.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-slate-300">
            Status
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
            >
              {statuses.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && <div className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</div>}

        <button
          disabled={loading}
          type="submit"
          className="w-full rounded-3xl bg-viatab-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-viatab-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Publishing story…' : 'Publish story'}
        </button>
      </form>
    </section>
  )
}