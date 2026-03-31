import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { LoginPayload } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { ROUTES } from '../utils/routes'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'

export function LoginPage() {
  const { login } = useAuth()
  const [form, setForm] = useState<LoginPayload>({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(form)
    } catch (error) {
      setError(getApiErrorMessage(error, 'Unable to login. Check your credentials.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-3xl space-y-8">
        <div className="grid gap-8 rounded-[1.75rem] border border-border bg-white p-10 shadow-soft lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Member access"
              title="Welcome back to VIATAB"
              description="Sign in to manage stories, access the campus feed, and continue publishing academic content."
            />
            <div className="rounded-[1.5rem] bg-background p-6 text-sm text-text-secondary">
              <p className="font-semibold text-text-primary">Why VIATAB?</p>
              <p className="mt-3">A polished academic platform built for faculty storytelling, with backend-authenticated author workflows.</p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-text-secondary" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text-secondary" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="mt-3 w-full rounded-3xl border border-border bg-background px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              {error && <p className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

              <button
                disabled={loading}
                className="w-full rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              New to VIATAB?{' '}
              <Link className="text-primary transition hover:text-primary/80" to={ROUTES.REGISTER}>
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
