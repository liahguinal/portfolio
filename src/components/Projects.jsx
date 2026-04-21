import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const EMPTY_FORM = {
  year: '',
  title: '',
  subtitle: '',
  tag: '',
  description: '',
  stack: [],
  logo_url: '',
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [stackInput, setStackInput] = useState('')
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
      if (!error && data) setProjects(data)
    }
    fetchProjects()
  }, [])

  const allProjects = projects

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAddStack = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && stackInput.trim()) {
      e.preventDefault()
      const val = stackInput.trim().replace(/,$/, '')
      if (val && !form.stack.includes(val)) {
        setForm((prev) => ({ ...prev, stack: [...prev.stack, val] }))
      }
      setStackInput('')
    }
  }

  const handleRemoveStack = (tech) => {
    setForm((prev) => ({ ...prev, stack: prev.stack.filter((s) => s !== tech) }))
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setForm((prev) => ({ ...prev, logo_url: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      sort_order: projects.length + 1,
    }
    const { data, error } = await supabase.from('projects').insert(payload).select().single()
    if (!error && data) {
      setProjects((prev) => [...prev, data])
      setForm(EMPTY_FORM)
      setStackInput('')
      setShowForm(false)
    }
    setSaving(false)
  }

  return (
    <section id="projects">
      <div className="section-header">
        <span className="section-eyebrow">What I've Built</span>
        <h2>Projects</h2>
        <div className="section-line" />
      </div>

      <div className="projects-list">
        {allProjects.map((p) => (
          <div className="project-card" key={p.id}>
            <div className="project-card-top">
              {p.logo_url && (
                <img src={p.logo_url} alt={`${p.title} logo`} className="project-logo" />
              )}
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
              {p.stack?.map((tech) => (
                <span className="tech-badge" key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="add-project-section">
        {user && (!showForm ? (
          <button className="add-project-btn" onClick={() => setShowForm(true)}>
            + Add Project
          </button>
        ) : (
          <form className="project-form" onSubmit={handleSubmit}>
            <h3 className="form-title">New Project</h3>
            <div className="form-row">
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
              <input name="year" placeholder="Year (e.g. 2026)" value={form.year} onChange={handleChange} required />
            </div>
            <input name="subtitle" placeholder="Subtitle (e.g. Document Tracking System)" value={form.subtitle} onChange={handleChange} />
            <input name="tag" placeholder="Tag (e.g. Completed)" value={form.tag} onChange={handleChange} />
            <textarea name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange} />
            <div className="stack-input-wrap">
              {form.stack.map((tech) => (
                <span className="tech-badge stack-tag" key={tech}>
                  {tech}
                  <button type="button" className="stack-tag-remove" onClick={() => handleRemoveStack(tech)}>✕</button>
                </span>
              ))}
              <input
                className="stack-tag-input"
                placeholder="Add tech, press Enter..."
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={handleAddStack}
              />
            </div>
            <div className="logo-upload-wrap">
              {form.logo_url ? (
                <div className="logo-preview">
                  <img src={form.logo_url} alt="logo preview" className="project-logo" />
                  <button type="button" className="entry-cancel-btn" onClick={() => setForm((p) => ({ ...p, logo_url: '' }))}>Remove</button>
                </div>
              ) : (
                <label className="attach-btn" htmlFor="project-logo-upload">
                  📎 Upload Logo
                  <input id="project-logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            <div className="form-actions">
              <button type="submit" className="entry-save-btn" disabled={saving}>{saving ? 'Saving...' : 'Save Project'}</button>
              <button type="button" className="entry-cancel-btn" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); setStackInput('') }}>Cancel</button>
            </div>
          </form>
        ))}
      </div>
    </section>
  )
}
