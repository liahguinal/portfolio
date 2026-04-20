const contacts = [
  { icon: '📞', label: 'Phone', value: '+63 950 006 5738', href: 'tel:+639500065738' },
  { icon: '✉️', label: 'Email', value: 'aliah.guinal@msunaawan.edu.ph', href: 'mailto:aliah.guinal@msunaawan.edu.ph' },
  { icon: '📍', label: 'Location', value: 'Tambacan, Iligan City', href: null },
]

export default function Contact() {
  return (
    <section id="contact">
      <div className="section-header">
        <span className="section-eyebrow">Let's Connect</span>
        <h2>Contact</h2>
        <div className="section-line" />
      </div>
      <p className="contact-intro">
        Interested in working together or have a question? Feel free to reach out.
      </p>
      <div className="contact-cards">
        {contacts.map((c) => (
          <div className="contact-card" key={c.label}>
            <span className="contact-icon">{c.icon}</span>
            <div>
              <p className="contact-label">{c.label}</p>
              {c.href
                ? <a href={c.href} className="contact-value">{c.value}</a>
                : <p className="contact-value">{c.value}</p>
              }
            </div>
          </div>
        ))}
      </div>
      <footer className="site-footer">
        <p>© 2025 Aliah M. Guinal · Built with React + Vite</p>
      </footer>
    </section>
  )
}
