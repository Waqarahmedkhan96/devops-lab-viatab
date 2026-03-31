import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { RegisterPayload } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { ROUTES } from '../utils/routes'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionHeader } from '../components/ui/SectionHeader'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { InputField } from '../components/ui/InputField'
import { Button } from '../components/ui/Button'

export function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState<RegisterPayload>({ fullName: '', email: '', password: '' })
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
      await register(form)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to register. Please try again.'))
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
              eyebrow="Create account"
              title="Join VIATAB today"
              description="Register your account and start publishing academic stories with editorial polish."
            />
            <div className="rounded-[1.5rem] bg-background p-6 text-sm text-text-secondary">
              <p className="font-semibold text-text-primary">Faculty storytelling made simple</p>
              <p className="mt-3">Create an account and manage your content with secure, backend-connected workflows.</p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white p-8 shadow-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />

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
                minLength={8}
                placeholder="Create a secure password"
              />

              {error && <div className="rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account…' : 'Create account'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              Already registered?{' '}
              <Link className="text-primary transition hover:text-primary/80" to={ROUTES.LOGIN}>
                Sign in
              </Link>
            </p>
          </div>
        </SectionWrapper>
      </div>
    </PageTransition>
  )
}
