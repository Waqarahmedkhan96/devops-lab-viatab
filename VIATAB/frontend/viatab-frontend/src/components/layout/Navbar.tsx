import { NavLink, Link, useNavigate } from 'react-router-dom'
import { type FormEvent, useState } from 'react'
import { ROUTES } from '../../utils/routes'
import { useAuth } from '../../hooks/useAuth'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition rounded-full px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-primary/10 text-primary shadow-soft' : 'text-text-secondary hover:text-text-primary'
  }`

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'VI'

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = search.trim()
    navigate(query ? `${ROUTES.STORIES}?q=${encodeURIComponent(query)}` : ROUTES.STORIES)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-xl shadow-soft">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-[240px] items-center gap-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-primary/10 text-primary shadow-soft">
              <span className="text-xl font-semibold">V</span>
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-text-primary">VIATAB</p>
              <p className="text-sm text-text-secondary">Campus Stories Across Departments</p>
            </div>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
          <NavLink className={navLinkClass} to={ROUTES.HOME}>
            Home
          </NavLink>
          <NavLink className={navLinkClass} to={ROUTES.STORIES}>
            Stories
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink className={navLinkClass} to={ROUTES.CREATE_STORY}>
                Create
              </NavLink>
              <NavLink className={navLinkClass} to={ROUTES.MY_STORIES}>
                My Stories
              </NavLink>
            </>
          )}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <form onSubmit={handleSearch} className="hidden w-full max-w-lg items-center gap-2 rounded-full border border-border bg-background px-4 py-2 shadow-sm sm:flex">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stories"
              className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
            />
            <button type="submit" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
              Search
            </button>
          </form>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-3 rounded-full border border-border bg-slate-100 px-4 py-2 text-sm text-text-secondary md:flex">
                <span className="font-semibold text-text-primary">{user?.fullName}</span>
              </div>
              <div className="grid h-12 w-12 place-items-center rounded-full bg-secondary/10 text-secondary font-semibold">
                {initials}
              </div>
              <button
                onClick={logout}
                className="rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 sm:inline-flex"
                to={ROUTES.REGISTER}
              >
                Register
              </Link>
              <Link
                className="rounded-3xl border border-border bg-background px-4 py-2 text-sm font-semibold text-text-primary transition hover:bg-slate-50"
                to={ROUTES.LOGIN}
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
