import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import { PageTransition } from '../components/ui/PageTransition'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { Button } from '../components/ui/Button'

export function NotFoundPage() {
  return (
    <PageTransition>
      <SectionWrapper className="mx-auto max-w-xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-secondary">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-text-primary">Page not found</h1>
          <p className="mt-4 text-text-secondary">The page you are looking for does not exist. Return to the VIATAB homepage or open the Stories feed.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={ROUTES.HOME}>
              <Button type="button">Home</Button>
            </Link>
            <Link to={ROUTES.STORIES} className="rounded-3xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text-secondary transition hover:bg-slate-50">
              Stories
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  )
}
