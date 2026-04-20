const technical = [
  { category: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { category: 'Backend', items: ['Laravel (PHP)', 'Django', 'Node.js', 'Express'] },
  { category: 'Database', items: ['SQLite', 'PostgreSQL', 'MySQL', 'Supabase'] },
  { category: 'Styling', items: ['Tailwind CSS', 'CSS Modules'] },
  { category: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Vite', 'VS Code', 'Vercel', 'Railway'] },
  { category: 'Other', items: ['REST API', 'WebSocket', 'JWT Auth', 'PDF Generation', 'QR Scanning'] },
]

const soft = [
  { icon: '🤝', label: 'Team collaboration and communication' },
  { icon: '⏰', label: 'Time management and task organization' },
  { icon: '🧩', label: 'Problem-solving and analytical thinking' },
  { icon: '🎨', label: 'Attention to detail and creativity' },
]

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-header">
        <span className="section-eyebrow">What I Know</span>
        <h2>Skills</h2>
        <div className="section-line" />
      </div>
      <div className="skills-wrapper">
        <div className="skills-technical">
          <h3 className="skills-group-title">Technical Skills</h3>
          <div className="skills-categories">
            {technical.map((s) => (
              <div className="skill-category" key={s.category}>
                <span className="skill-cat-label">{s.category}</span>
                <div className="skill-tags">
                  {s.items.map(item => (
                    <span className="skill-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-soft">
          <h3 className="skills-group-title">Soft Skills</h3>
          <div className="soft-list">
            {soft.map((s) => (
              <div className="soft-item" key={s.label}>
                <span className="soft-icon">{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
