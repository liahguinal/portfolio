import { useNavigate } from 'react-router-dom'

const cards = [
  { path: '/about',      icon: '✦', label: 'About',      desc: 'Who I am' },
  { path: '/projects',   icon: '◈', label: 'Projects',   desc: 'What I\'ve built' },
  { path: '/internship', icon: '◉', label: 'Internship', desc: 'My experience' },
  { path: '/skills',     icon: '◇', label: 'Skills',     desc: 'What I know' },
  { path: '/education',  icon: '◎', label: 'Education',  desc: 'My background' },
  { path: '/contact',    icon: '◌', label: 'Contact',    desc: 'Get in touch' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-lines" />
      </div>

      <div className="landing-content">
        <div className="landing-intro">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>Portfolio</span>
          </div>
          <h1>
            Hi, I'm<br />
            <span className="hero-name-italic">Aliah M. Guinal</span>
          </h1>
          <p className="landing-role">Information Technology Student</p>
          <p className="landing-bio">
            Aspiring web developer passionate about building real-world tools.
            Select a section below to explore.
          </p>
        </div>

        <div className="landing-cards">
          {cards.map((c) => (
            <button
              key={c.path}
              className="landing-card"
              onClick={() => navigate(c.path)}
            >
              <span className="landing-card-icon">{c.icon}</span>
              <span className="landing-card-label">{c.label}</span>
              <span className="landing-card-desc">{c.desc}</span>
              <span className="landing-card-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
