import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const SHIFTS = ['8am-5pm', '8am-7pm']

const START_DATE = new Date(2026, 0, 22)
const END_DATE = new Date(2026, 8, 30)

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function toKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function Internship() {
  const [currentMonth, setCurrentMonth] = useState(new Date(START_DATE.getFullYear(), START_DATE.getMonth(), 1))
  const [selected, setSelected] = useState(null)
  const [entries, setEntries] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState('')
  const [editShift, setEditShift] = useState('8am-5pm')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = getDaysInMonth(year, month)

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1))
  const monthLabel = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })
  const selectedEntry = selected ? entries[selected] : null

  // Load all entries from Supabase on mount
  useEffect(() => {
    async function fetchEntries() {
      setLoading(true)
      const { data, error } = await supabase.from('internship_entries').select('*')
      if (!error && data) {
        const map = {}
        data.forEach((row) => { map[row.date] = row })
        setEntries(map)
      }
      setLoading(false)
    }
    fetchEntries()
  }, [])

  const handleEdit = () => {
    setEditText(selectedEntry?.description || '')
    setEditShift(selectedEntry?.shift || '8am-5pm')
    setIsEditing(true)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = {
      date: selected,
      description: editText,
      shift: editShift,
      images: selectedEntry?.images || [],
      docs: selectedEntry?.docs || [],
    }
    const { error } = await supabase
      .from('internship_entries')
      .upsert(payload, { onConflict: 'date' })

    if (!error) {
      setEntries((prev) => ({ ...prev, [selected]: payload }))
    }
    setSaving(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText('')
    setEditShift('8am-5pm')
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const newImages = [...(entries[selected]?.images || []), ev.target.result]
        const updated = { ...entries[selected], date: selected, images: newImages }
        await supabase.from('internship_entries').upsert(updated, { onConflict: 'date' })
        setEntries((prev) => ({ ...prev, [selected]: updated }))
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const handleRemoveImage = async (imgSrc) => {
    const newImages = entries[selected].images.filter((s) => s !== imgSrc)
    const updated = { ...entries[selected], images: newImages }
    await supabase.from('internship_entries').upsert(updated, { onConflict: 'date' })
    setEntries((prev) => ({ ...prev, [selected]: updated }))
  }

  return (
    <section id="internship">
      <div className="section-header">
        <span className="section-eyebrow">Experience</span>
        <h2>Internship</h2>
        <div className="section-line" />
      </div>

      <div className="internship-card">
        <span className="project-year">2026</span>
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

        {loading ? (
          <p className="no-entry" style={{ textAlign: 'center', padding: '24px 0' }}>Loading entries...</p>
        ) : (
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
        )}

        {selected && (
          <div className="entry-detail">
            <div className="entry-detail-header">
              <h4>{selected}</h4>
              {!isEditing && user && (
                <button className="entry-edit-btn" onClick={handleEdit} aria-label="Edit entry">
                  ✏️ Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="entry-edit-area">
                <div className="shift-selector">
                  <span className="shift-label">Shift</span>
                  <div className="shift-options">
                    {SHIFTS.map((s) => (
                      <button
                        key={s}
                        className={`shift-btn ${editShift === s ? 'shift-active' : ''}`}
                        onClick={() => setEditShift(s)}
                        type="button"
                      >
                        🕗 {s}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                  placeholder="Write your description here..."
                  autoFocus
                />
                <div className="entry-edit-actions">
                  <button className="entry-save-btn" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="entry-cancel-btn" onClick={handleCancel} disabled={saving}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                {selectedEntry?.shift && (
                  <span className="shift-badge">🕗 {selectedEntry.shift}</span>
                )}
                {selectedEntry?.description
                  ? <p>{selectedEntry.description}</p>
                  : <p className="no-entry">No description added. Click Edit to add one.</p>
                }
              </>
            )}

            {selectedEntry?.images?.length > 0 && (
              <div className="entry-images">
                {selectedEntry.images.map((src, idx) => (
                  <div key={idx} className="entry-image-wrap">
                    <img src={src} alt="internship entry" />
                    <button className="remove-image-btn" onClick={() => handleRemoveImage(src)} aria-label="Remove image">✕</button>
                  </div>
                ))}
              </div>
            )}

            {user && (
            <div className="entry-attach-section">
              <label className="attach-btn" htmlFor={`upload-${selected}`}>
                📎 Attach Image
              </label>
              <input
                id={`upload-${selected}`}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
