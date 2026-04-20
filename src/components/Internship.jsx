import { useState } from 'react'

// Add your daily entries here — description, images, docs are all optional
const entries = {
  // 'YYYY-MM-DD': { description: '...', images: ['/internship/...'], docs: ['/internship/...'] }
  '2025-06-02': {
    description: 'Orientation and setup ng development environment.',
    images: [],
    docs: [],
  },
}

// Internship date range — adjust as needed
const START_DATE = new Date('2025-06-02')
const END_DATE = new Date('2025-09-30')

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function toKey(date) {
  return date.toISOString().split('T')[0]
}

export default function Internship() {
  const [currentMonth, setCurrentMonth] = useState(new Date(START_DATE.getFullYear(), START_DATE.getMonth(), 1))
  const [selected, setSelected] = useState(null)

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = getDaysInMonth(year, month)

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))

  const monthLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })

  const selectedEntry = selected ? entries[selected] : null

  return (
    <section id="internship">
      <div className="section-header">
        <span className="section-eyebrow">Experience</span>
        <h2>Internship</h2>
        <div className="section-line" />
      </div>
      <div className="internship-card">
        <span className="project-year">2025</span>
        <h3>Provincial Treasurer's Office</h3>
        <p className="internship-role">Web Developer Intern — 486 Hours</p>
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

      <div className="calendar-wrapper">
        <div className="calendar-nav">
          <button onClick={prevMonth} aria-label="Previous month">&#8592;</button>
          <span>{monthLabel}</span>
          <button onClick={nextMonth} aria-label="Next month">&#8594;</button>
        </div>

        <div className="calendar-grid">
          {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
            <div className="calendar-day-label" key={d}>{d}</div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const date = new Date(year, month, day)
            const key = toKey(date)
            const isInRange = date >= START_DATE && date <= END_DATE
            const hasEntry = !!entries[key]
            const isSelected = selected === key

            return (
              <button
                key={key}
                className={`calendar-day ${isInRange ? 'in-range' : ''} ${hasEntry ? 'has-entry' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => isInRange && setSelected(isSelected ? null : key)}
                disabled={!isInRange}
                aria-label={`${key}${hasEntry ? ', has entry' : ''}`}
              >
                {day}
                {hasEntry && <span className="entry-dot" aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        {selected && (
          <div className="entry-detail">
            <h4>{selected}</h4>
            {selectedEntry?.description
              ? <p>{selectedEntry.description}</p>
              : <p className="no-entry">No description added.</p>
            }
            {selectedEntry?.images?.length > 0 && (
              <div className="entry-images">
                {selectedEntry.images.map((src) => (
                  <img key={src} src={src} alt="internship entry" />
                ))}
              </div>
            )}
            {selectedEntry?.docs?.length > 0 && (
              <div className="entry-docs">
                {selectedEntry.docs.map((doc) => (
                  <a key={doc} href={doc} target="_blank" rel="noreferrer">📄 View Document</a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
