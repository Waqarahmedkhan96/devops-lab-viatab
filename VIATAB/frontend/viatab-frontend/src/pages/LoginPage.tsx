import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { LoginPayload } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { ROUTES } from '../utils/routes'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { InputField } from '../components/ui/InputField'
import { Button } from '../components/ui/Button'

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
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to login. Check your credentials.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-8">
        <SectionWrapper className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
              <InputField
                label="Email address"
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="hello@university.edu"
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />

              {error && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              New to VIATAB?{' '}
              <Link className="text-primary transition hover:text-primary/80" to={ROUTES.REGISTER}>
                Create an account
              </Link>
            </p>
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  )
}
