import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import { useAuth } from '../../hooks/useAuth'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <Link to={ROUTES.HOME} className="text-xl font-semibold tracking-tight text-white">
            VIATAB
          </Link>
          <p className="text-sm text-slate-400">VIA Tabloid Application</p>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
          <Link className="transition hover:text-white" to={ROUTES.HOME}>
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link className="transition hover:text-white" to={ROUTES.STORIES}>
                Stories
              </Link>
              <Link className="transition hover:text-white" to={ROUTES.CREATE_STORY}>
                Create
              </Link>
              <Link className="transition hover:text-white" to={ROUTES.MY_STORIES}>
                My Stories
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="transition hover:text-white" to={ROUTES.LOGIN}>
                Login
              </Link>
              <Link
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-slate-200 transition hover:border-slate-500 hover:text-white"
                to={ROUTES.REGISTER}
              >
                Register
              </Link>
            </>
          )}
        </nav>

        {isAuthenticated && (
          <div className="hidden rounded-2xl bg-slate-900/80 px-4 py-2 text-sm text-slate-300 shadow-inner shadow-slate-950/30 sm:block">
            Signed in as <span className="text-slate-100 font-medium">{user?.fullName}</span>
          </div>
        )}
      </div>
    </header>
  )
}
