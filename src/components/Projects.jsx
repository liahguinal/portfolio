const projects = [
  {
    year: '2024 – 2026',
    title: 'EduLink: School Curriculum Management System',
    tag: 'Capstone – Ongoing',
    description:
      'Developed a web-based system for Naawan Central School to secure academic records and simplify lesson plan management.',
    stack: ['Laravel', 'React', 'Inertia.js', 'PHP', 'TypeScript', 'Tailwind CSS', 'MySQL', 'DomPDF'],
  },
  {
    year: '2025',
    title: 'Djangobnb: Full-stack Airbnb Clone',
    tag: null,
    description:
      'Developed a fullstack Airbnb clone that allows users to browse and list properties, send real-time messages via WebSocket, and manage bookings.',
    stack: ['Django', 'Django REST Framework', 'Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'SQLite', 'Docker', 'Simple JWT'],
  },
  {
    year: '2025',
    title: 'DocuTrack: Document Tracking System',
    tag: 'Internship Project – Provincial Treasurer\'s Office',
    description:
      'Built a document tracking system for the Provincial Treasurer\'s Office with QR scanning, PDF generation, and real-time document status monitoring.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'Supabase', 'Railway', 'Vercel'],
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((p) => (
          <div className="project-card" key={p.title}>
            <span className="project-year">{p.year}</span>
            <h3>{p.title}</h3>
            {p.tag && <span className="project-tag">{p.tag}</span>}
            <p>{p.description}</p>
            <div className="project-stack">
              {p.stack.map((tech) => (
                <span className="tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
