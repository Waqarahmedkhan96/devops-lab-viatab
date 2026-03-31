import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'
import logo from '../../assets/logo.png'

const footerLinks = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Stories', to: ROUTES.STORIES },
  { label: 'Create', to: ROUTES.CREATE_STORY },
  { label: 'My Stories', to: ROUTES.MY_STORIES },
]

const supportLinks = [
  { label: 'Help center', href: 'https://example.com/help' },
  { label: 'Terms', href: 'https://example.com/terms' },
  { label: 'Privacy', href: 'https://example.com/privacy' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/95 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white p-1 shadow-soft transition hover:scale-105">
  <img
    src={logo}
    alt="VIATAB Logo"
    className="h-full w-full object-contain"
  />
</div>
            <div>
              <p className="text-lg font-semibold text-text-primary">VIATAB</p>
              <p className="text-sm text-text-secondary">Campus Stories Across Departments</p>
            </div>
          </div>
          <p className="text-sm leading-7 text-text-secondary">
            A modern academic storytelling platform for faculty and campus communities.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Navigate</p>
            <div className="space-y-2 text-sm text-text-secondary">
              {footerLinks.map((link) => (
                <Link key={link.label} to={link.to} className="block transition hover:text-text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Support</p>
            <div className="space-y-2 text-sm text-text-secondary">
              {supportLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="block transition hover:text-text-primary">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-secondary">Contact</p>
            <p className="text-sm text-text-secondary">support@viatab.edu</p>
            <p className="text-sm text-text-secondary">© {new Date().getFullYear()} VIATAB</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
