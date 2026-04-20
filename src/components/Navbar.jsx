import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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

          <button
            className={`navbar-toggle ${open ? 'toggle-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </>
      )}
    </nav>
  )
}
