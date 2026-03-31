import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { PageTransition } from '../components/ui/PageTransition'

export function NotFoundPage() {
  return (
    <PageTransition>
      <div className="grid min-h-[70vh] place-items-center rounded-[1.75rem] border border-border bg-white p-10 shadow-soft">
        <div className="max-w-xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-text-primary">Page not found</h1>
          <p className="mt-4 text-text-secondary">The page you are looking for does not exist. Return to the VIATAB homepage or open the Stories feed.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90" to={ROUTES.HOME}>
              Home
            </Link>
            <Link className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-text-secondary transition hover:bg-background" to={ROUTES.STORIES}>
              Stories
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
