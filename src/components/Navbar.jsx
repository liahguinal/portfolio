import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'

const links = [
  { path: '/about',      label: 'About' },
  { path: '/projects',   label: 'Projects' },
  { path: '/internship', label: 'Internship' },
  { path: '/skills',     label: 'Skills' },
  { path: '/education',  label: 'Education' },
  { path: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isLanding = location.pathname === '/'
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <button className="navbar-brand" onClick={() => navigate('/')} aria-label="Go home">
        <span className="brand-initials">AMG</span>
      </button>

      {!isLanding && (
        <>
          <ul className={`navbar-links ${open ? 'open' : ''}`}>
            {links.map((l) => (
              <li key={l.path}>
                <button
                  className={`nav-link ${location.pathname === l.path ? 'nav-active' : ''}`}
                  onClick={() => { navigate(l.path); setOpen(false) }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="navbar-right">
            {user ? (
              <button className="nav-auth-btn" onClick={logout} title="Sign out">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            ) : (
              <button className="nav-auth-btn" onClick={() => navigate('/login')} title="Admin login">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="7.5" cy="15.5" r="5.5"/>
                  <path d="M21 2l-9.6 9.6"/>
                  <path d="M15.5 7.5l3 3L22 7l-3-3"/>
                </svg>
              </button>
            )}
            <button
              className={`navbar-toggle ${open ? 'toggle-open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </>
      )}
    </nav>
  )
}
