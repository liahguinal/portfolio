export default function About() {
  return (
    <section id="about">
      <div className="section-header">
        <span className="section-eyebrow">Who I Am</span>
        <h2>About Me</h2>
        <div className="section-line" />
      </div>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm an aspiring web developer seeking an internship to grow my skills
            and gain hands-on experience building real online tools. I'm eager to
            learn from experienced developers, contribute to meaningful projects,
            and develop my technical abilities in a professional environment.
          </p>
          <p style={{ marginTop: '16px' }}>
            Currently pursuing a <strong>Bachelor of Science in Information Technology</strong> at
            Mindanao State University at Naawan, I've built projects ranging from
            school management systems to full-stack clones and government office tools.
          </p>
        </div>
        <div className="about-highlights">
          {[
            { icon: '🎓', label: 'BS Information Technology', sub: 'MSU Naawan' },
            { icon: '💼', label: 'Web Developer Intern', sub: 'Provincial Treasurer\'s Office' },
            { icon: '📍', label: 'Tambacan, Iligan City', sub: 'Philippines' },
          ].map(h => (
            <div className="highlight-card" key={h.label}>
              <span className="highlight-icon">{h.icon}</span>
              <div>
                <p className="highlight-label">{h.label}</p>
                <p className="highlight-sub">{h.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
