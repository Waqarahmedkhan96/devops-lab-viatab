import { NavLink, Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useAuth } from '../../hooks/useAuth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition rounded-full px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-primary/10 text-primary shadow-soft' : 'text-text-secondary hover:text-text-primary'
  }`

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-[220px] items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary/10 text-primary shadow-soft">
            <span className="text-xl font-semibold">V</span>
          </div>
          <div>
            <Link to={ROUTES.HOME} className="text-lg font-semibold tracking-tight text-text-primary">
              VIATAB
            </Link>
            <p className="text-sm text-text-secondary">Academic storytelling for professors</p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          <NavLink className={navLinkClass} to={ROUTES.HOME}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink className={navLinkClass} to={ROUTES.STORIES}>
                Stories
              </NavLink>
              <NavLink className={navLinkClass} to={ROUTES.CREATE_STORY}>
                Create
              </NavLink>
              <NavLink className={navLinkClass} to={ROUTES.MY_STORIES}>
                My Stories
              </NavLink>
            </>
          ) : (
            <NavLink className={navLinkClass} to={ROUTES.LOGIN}>
              Login
            </NavLink>
          )}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="hidden rounded-full border border-border bg-slate-100 px-4 py-2 text-sm text-text-secondary sm:inline-flex">
                Signed in as <strong className="ml-2 text-text-primary">{user?.fullName}</strong>
              </span>
              <button
                onClick={logout}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              to={ROUTES.REGISTER}
            >
              Register
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
