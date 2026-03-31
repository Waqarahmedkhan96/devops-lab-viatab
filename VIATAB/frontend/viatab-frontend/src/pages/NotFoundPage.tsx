import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/routes'

export function NotFoundPage() {
  return (
    <div className="grid min-h-[70vh] place-items-center rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
      <div className="max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-viatab-100">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Page not found</h1>
        <p className="mt-4 text-slate-400">The page you are looking for does not exist. Return to the VIATAB homepage or open the Stories feed.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className="rounded-full bg-viatab-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-viatab-400" to={ROUTES.HOME}>
            Home
          </Link>
          <Link className="rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500" to={ROUTES.STORIES}>
            Stories
          </Link>
        </div>
      </div>
    </div>
  )
}
