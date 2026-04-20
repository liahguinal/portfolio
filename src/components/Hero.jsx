export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-lines" />
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          <span>Portfolio</span>
        </div>
        <h1>
          Hi, I'm<br />
          <span className="hero-name-italic">Aliah M. Guinal</span>
        </h1>
        <p className="hero-role">Information Technology Student</p>
        <p className="hero-bio">
          Aspiring web developer passionate about building real-world tools.
          Eager to learn, contribute, and grow in a professional environment.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Get in Touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">3</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">486</span>
            <span className="stat-label">Intern Hours</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">Technologies</span>
          </div>
        </div>
      </div>
    </section>
  )
}
