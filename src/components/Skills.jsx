const technical = [
  { category: 'Frontend Development', items: 'React, Next.js, HTML, CSS, JavaScript, TypeScript' },
  { category: 'Backend Development', items: 'Laravel (PHP), Django, Node.js, Express' },
  { category: 'Database Management', items: 'SQLite, PostgreSQL, Supabase, MySQL' },
  { category: 'Styling', items: 'Tailwind CSS' },
  { category: 'Tools & Platforms', items: 'Git, GitHub, Bitbucket, VS Code, Docker, Vite, Inertia.js, Railway, Vercel' },
  { category: 'Other', items: 'REST API, WebSocket, JWT Auth, PDF Generation, QR Scanning' },
]

const soft = [
  'Team collaboration and communication',
  'Time management and task organization',
  'Problem-solving and analytical thinking',
  'Attention to detail and creativity',
]

export default function Skills() {
  return (
    <section id="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        <div>
          <h3>Technical Skills</h3>
          <ul className="skills-list">
            {technical.map((s) => (
              <li key={s.category}>
                <strong>{s.category}:</strong> {s.items}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Soft Skills</h3>
          <ul className="skills-list">
            {soft.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
