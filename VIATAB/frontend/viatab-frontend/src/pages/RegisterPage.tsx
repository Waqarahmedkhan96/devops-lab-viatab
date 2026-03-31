import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { RegisterPayload } from '../types'
import { getApiErrorMessage } from '../utils/getApiErrorMessage'
import { ROUTES } from '../utils/routes'

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
    } catch (error) {
      setError(getApiErrorMessage(error, 'Unable to register. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 sm:p-10">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-viatab-100">Create account</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Join VIATAB today</h1>
        <p className="text-slate-400">Register your account, then publish stories and manage your feed with full backend integration.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-slate-300" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            required
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={8}
            className="mt-3 w-full rounded-3xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-viatab-500 focus:ring-2 focus:ring-viatab-500/20"
          />
        </div>

        {error && <p className="rounded-3xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</p>}

        <button
          disabled={loading}
          className="w-full rounded-3xl bg-viatab-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-viatab-400 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-400">
        Already registered?{' '}
        <Link className="text-white transition hover:text-viatab-200" to={ROUTES.LOGIN}>
          Sign in
        </Link>
      </p>
    </section>
  )
}