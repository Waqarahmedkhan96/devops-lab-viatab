import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/routes'

export function HomePage() {
  return (
    <section className="grid gap-10 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/40 md:p-14">
      <div className="max-w-3xl space-y-6">
        <p className="inline-flex rounded-full bg-viatab-900 px-3 py-1 text-sm uppercase tracking-[0.35em] text-viatab-100">
          VIATAB
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Elevate student stories with a polished SaaS feed.
        </h1>
        <p className="text-lg leading-8 text-slate-300">
          VIATAB is a university portfolio application with secure login, story publishing, and a modern feed built on React, TypeScript, Axios, React Router, Context API, and Tailwind CSS.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to={ROUTES.LOGIN} className="inline-flex items-center justify-center rounded-full bg-viatab-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-viatab-400">
            Get started
          </Link>
          <Link to={ROUTES.STORIES} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white">
            Browse stories
          </Link>
        </div>
      </div>
      <div className="grid gap-4 rounded-[2rem] bg-slate-950/70 p-6 text-slate-200 shadow-inner shadow-slate-950/30 sm:p-8">
        <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold text-white">Why VIATAB works</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• Token-based authentication with secure route protection.</li>
            <li>• Story feed and author dashboard aligned with backend APIs.</li>
            <li>• Responsive SaaS UI built for portfolio presentation.</li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Fast auth</p>
            <p className="mt-3 text-slate-200">Login, register, auto-login, and logout with JWT bearer token handling.</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Story feed</p>
            <p className="mt-3 text-slate-200">Create stories, browse the feed, and display category and department metadata.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
