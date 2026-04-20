const logos = {
  EduLink:   '/logos/ncs-edulink-logo-removebg-preview.png',
  Djangobnb: '/logos/djangobnb-logo-removebg-preview.png',
  DocuTrack: '/logos/pto-logo-removebg-preview.png',
}

const projects = [
  {
    year: '2024 – 2026',
    title: 'EduLink',
    subtitle: 'School Curriculum Management System',
    tag: 'Capstone – Completed',
    description:
      'A web-based system for Naawan Central School to secure academic records and simplify lesson plan management with PDF export.',
    stack: ['Laravel', 'React', 'Inertia.js', 'PHP', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'MySQL', 'DomPDF'],
  },
  {
    year: '2025',
    title: 'Djangobnb',
    subtitle: 'Full-stack Airbnb Clone',
    tag: 'Completed',
    description:
      'A fullstack Airbnb clone with property listings, real-time messaging via WebSocket, booking management, and JWT authentication.',
    stack: ['Django', 'DRF', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Simple JWT'],
  },
  {
    year: '2026',
    title: 'DocuTrack',
    subtitle: 'Document Tracking System',
    tag: "Internship – Provincial Treasurer's Office · Completed",
    description:
      'A full-stack document tracking system with QR code scanning, PDF generation, real-time status monitoring, deployed on Railway and Vercel.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'Supabase', 'Railway', 'Vercel'],
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-eyebrow">What I've Built</span>
        <h2>Projects</h2>
        <div className="section-line" />
      </div>
      <div className="projects-list">
        {projects.map((p) => {
          const logoSrc = logos[p.title]
          return (
            <div className="project-card" key={p.title}>
              <div className="project-card-top">
                <img src={logoSrc} alt={`${p.title} logo`} className="project-logo" />
                <h3>{p.title}</h3>
                <span className="project-year">{p.year}</span>
              </div>
              <div className="project-divider" />
              <div className="project-meta">
                <p className="project-subtitle">{p.subtitle}</p>
                {p.tag && <span className="project-tag">{p.tag}</span>}
              </div>
              <div className="project-divider" />
              <p className="project-desc">{p.description}</p>
              <div className="project-stack">
                {p.stack.map((tech) => (
                  <span className="tech-badge" key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
