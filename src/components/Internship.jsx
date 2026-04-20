export default function Internship() {
  return (
    <section id="internship">
      <h2>Internship</h2>
      <div className="internship-card">
        <span className="project-year">2025</span>
        <h3>Provincial Treasurer's Office</h3>
        <p className="internship-role">Web Developer Intern</p>
        <p>
          Developed DocuTrack, a full-stack document tracking system with QR code
          scanning, PDF generation, and real-time document status monitoring.
          Deployed on Railway (backend) and Vercel (frontend).
        </p>
        <div className="project-stack">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'SQLite', 'Supabase', 'Railway', 'Vercel'].map((tech) => (
            <span className="tech-badge" key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
