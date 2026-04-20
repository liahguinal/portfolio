import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const staticTechnical = [
  { id: 'frontend', category: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { id: 'backend',  category: 'Backend',  items: ['Laravel (PHP)', 'Django', 'Node.js', 'Express'] },
  { id: 'database', category: 'Database', items: ['SQLite', 'PostgreSQL', 'MySQL', 'Supabase'] },
  { id: 'styling',  category: 'Styling',  items: ['Tailwind CSS', 'CSS Modules'] },
  { id: 'tools',    category: 'Tools',    items: ['Git', 'GitHub', 'Docker', 'Vite', 'VS Code', 'Vercel', 'Railway'] },
  { id: 'other',    category: 'Other',    items: ['REST API', 'WebSocket', 'JWT Auth', 'PDF Generation', 'QR Scanning'] },
]

const staticSoft = [
  { id: 's1', icon: '🤝', label: 'Team collaboration and communication' },
  { id: 's2', icon: '⏰', label: 'Time management and task organization' },
  { id: 's3', icon: '🧩', label: 'Problem-solving and analytical thinking' },
  { id: 's4', icon: '🎨', label: 'Attention to detail and creativity' },
]

export default function Skills() {
  const [technical, setTechnical] = useState(staticTechnical)
  const [soft, setSoft] = useState(staticSoft)

  // editing state
  const [editingCatId, setEditingCatId] = useState(null)
  const [tagInput, setTagInput] = useState('')

  // add category form
  const [showCatForm, setShowCatForm] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [newCatTags, setNewCatTags] = useState([])
  const [newCatInput, setNewCatInput] = useState('')

  // add soft skill form
  const [showSoftForm, setShowSoftForm] = useState(false)
  const [newSoftIcon, setNewSoftIcon] = useState('')
  const [newSoftLabel, setNewSoftLabel] = useState('')

  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchSkills() {
      const [{ data: tech }, { data: softData }] = await Promise.all([
        supabase.from('technical_skills').select('*').order('sort_order'),
        supabase.from('soft_skills').select('*').order('sort_order'),
      ])
      if (tech?.length) setTechnical(tech)
      if (softData?.length) setSoft(softData)
    }
    fetchSkills()
  }, [])

  // --- Technical: add tag to existing category ---
  const handleAddTag = async (cat) => {
    if (!tagInput.trim()) return
    const val = tagInput.trim()
    if (cat.items.includes(val)) { setTagInput(''); return }
    const updated = [...cat.items, val]
    setSaving(true)
    if (cat.id && typeof cat.id === 'string' && cat.id.includes('-')) {
      // from supabase
      await supabase.from('technical_skills').update({ items: updated }).eq('id', cat.id)
    }
    setTechnical((prev) => prev.map((c) => c.id === cat.id ? { ...c, items: updated } : c))
    setTagInput('')
    setSaving(false)
  }

  const handleRemoveTag = async (cat, tag) => {
    const updated = cat.items.filter((i) => i !== tag)
    if (cat.id && typeof cat.id === 'string' && cat.id.includes('-')) {
      await supabase.from('technical_skills').update({ items: updated }).eq('id', cat.id)
    }
    setTechnical((prev) => prev.map((c) => c.id === cat.id ? { ...c, items: updated } : c))
  }

  // --- Technical: add new category ---
  const handleNewCatTag = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && newCatInput.trim()) {
      e.preventDefault()
      const val = newCatInput.trim().replace(/,$/, '')
      if (val && !newCatTags.includes(val)) setNewCatTags((p) => [...p, val])
      setNewCatInput('')
    }
  }

  const handleSaveNewCat = async () => {
    if (!newCat.trim()) return
    setSaving(true)
    const payload = { category: newCat.trim(), items: newCatTags, sort_order: technical.length + 1 }
    const { data, error } = await supabase.from('technical_skills').insert(payload).select().single()
    const newEntry = error ? { ...payload, id: `local-${Date.now()}` } : data
    setTechnical((prev) => [...prev, newEntry])
    setNewCat(''); setNewCatTags([]); setNewCatInput(''); setShowCatForm(false)
    setSaving(false)
  }

  // --- Soft: add new ---
  const handleSaveNewSoft = async () => {
    if (!newSoftLabel.trim()) return
    setSaving(true)
    const payload = { icon: newSoftIcon || '⭐', label: newSoftLabel.trim(), sort_order: soft.length + 1 }
    const { data, error } = await supabase.from('soft_skills').insert(payload).select().single()
    const newEntry = error ? { ...payload, id: `local-${Date.now()}` } : data
    setSoft((prev) => [...prev, newEntry])
    setNewSoftIcon(''); setNewSoftLabel(''); setShowSoftForm(false)
    setSaving(false)
  }

  return (
    <section id="skills">
      <div className="section-header">
        <span className="section-eyebrow">What I Know</span>
        <h2>Skills</h2>
        <div className="section-line" />
      </div>
      <div className="skills-wrapper">

        {/* TECHNICAL */}
        <div className="skills-technical">
          <h3 className="skills-group-title">Technical Skills</h3>
          <div className="skills-categories">
            {technical.map((s) => (
              <div className="skill-category" key={s.id}>
                <span className="skill-cat-label">{s.category}</span>
                <div className="skill-tags">
                  {s.items.map((item) => (
                    <span className="skill-tag" key={item}>
                      {item}
                      {editingCatId === s.id && (
                        <button className="stack-tag-remove" onClick={() => handleRemoveTag(s, item)}>✕</button>
                      )}
                    </span>
                  ))}
                  {editingCatId === s.id && (
                    <input
                      className="skill-inline-input"
                      placeholder="Add skill..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); handleAddTag(s) }
                      }}
                      autoFocus
                    />
                  )}
                </div>
                  {user && (
                  <button
                    className="skill-edit-btn"
                    onClick={() => { setEditingCatId(editingCatId === s.id ? null : s.id); setTagInput('') }}
                  >
                    {editingCatId === s.id ? '✓ Done' : '✏️'}
                  </button>
                  )}
              </div>
            ))}
          </div>

          {/* Add category */}
          {user && (showCatForm ? (
            <div className="skill-add-form">
              <input placeholder="Category name" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
              <div className="stack-input-wrap">
                {newCatTags.map((t) => (
                  <span className="tech-badge stack-tag" key={t}>
                    {t}
                    <button type="button" className="stack-tag-remove" onClick={() => setNewCatTags((p) => p.filter((x) => x !== t))}>✕</button>
                  </span>
                ))}
                <input className="stack-tag-input" placeholder="Add skill, press Enter..." value={newCatInput} onChange={(e) => setNewCatInput(e.target.value)} onKeyDown={handleNewCatTag} />
              </div>
              <div className="form-actions">
                <button className="entry-save-btn" onClick={handleSaveNewCat} disabled={saving}>Save</button>
                <button className="entry-cancel-btn" onClick={() => { setShowCatForm(false); setNewCat(''); setNewCatTags([]) }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="add-project-btn" style={{ marginTop: '16px' }} onClick={() => setShowCatForm(true)}>
              + Add Category
            </button>
          ))}
        </div>

        {/* SOFT SKILLS */}
        <div className="skills-soft">
          <h3 className="skills-group-title">Soft Skills</h3>
          <div className="soft-list">
            {soft.map((s) => (
              <div className="soft-item" key={s.id}>
                <span className="soft-icon">{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          {user && (showSoftForm ? (
            <div className="skill-add-form" style={{ marginTop: '16px' }}>
              <div className="form-row">
                <input placeholder="Icon (emoji)" value={newSoftIcon} onChange={(e) => setNewSoftIcon(e.target.value)} style={{ maxWidth: '80px' }} />
                <input placeholder="Skill label" value={newSoftLabel} onChange={(e) => setNewSoftLabel(e.target.value)} />
              </div>
              <div className="form-actions">
                <button className="entry-save-btn" onClick={handleSaveNewSoft} disabled={saving}>Save</button>
                <button className="entry-cancel-btn" onClick={() => { setShowSoftForm(false); setNewSoftIcon(''); setNewSoftLabel('') }}>Cancel</button>
              </div>
            </div>
          ) : (
            <button className="add-project-btn" style={{ marginTop: '16px' }} onClick={() => setShowSoftForm(true)}>
              + Add Soft Skill
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
