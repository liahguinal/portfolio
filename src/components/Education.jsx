import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/AuthContext'

const staticEducation = [
  {
    id: 'edu-1',
    period: '2022 – Present',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Mindanao State University at Naawan',
    icon: '🎓',
    status: 'Ongoing',
    certificates: [],
  },
  {
    id: 'edu-2',
    period: '2015 – 2021',
    degree: 'High School Diploma',
    school: 'Iligan City National High School',
    icon: '🏫',
    status: 'Completed',
    certificates: [],
  },
]

const EMPTY_EDU = { period: '', degree: '', school: '', icon: '🎓', status: 'Ongoing' }

export default function Education() {
  const [education, setEducation] = useState(staticEducation)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState(EMPTY_EDU)
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchEducation() {
      const { data: eduData, error } = await supabase
        .from('education')
        .select('*, certificates(*)')
        .order('sort_order')
      if (!error && eduData?.length) {
        setEducation(eduData.map((e) => ({ ...e, certificates: e.certificates || [] })))
      }
    }
    fetchEducation()
  }, [])

  // --- Edit existing ---
  const startEdit = (edu) => {
    setEditingId(edu.id)
    setEditForm({ period: edu.period, degree: edu.degree, school: edu.school, icon: edu.icon, status: edu.status })
  }

  const handleEditChange = (e) => setEditForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const handleSaveEdit = async (edu) => {
    setSaving(true)
    const isSupabase = edu.id && edu.id.includes('-') && !edu.id.startsWith('edu-')
    if (isSupabase) {
      await supabase.from('education').update(editForm).eq('id', edu.id)
    }
    setEducation((prev) => prev.map((e) => e.id === edu.id ? { ...e, ...editForm } : e))
    setEditingId(null)
    setSaving(false)
  }

  // --- Add new education ---
  const handleSaveAdd = async () => {
    if (!addForm.degree.trim() || !addForm.school.trim()) return
    setSaving(true)
    const payload = { ...addForm, sort_order: education.length + 1 }
    const { data, error } = await supabase.from('education').insert(payload).select().single()
    const newEntry = error
      ? { ...payload, id: `local-${Date.now()}`, certificates: [] }
      : { ...data, certificates: [] }
    setEducation((prev) => [...prev, newEntry])
    setAddForm(EMPTY_EDU)
    setShowAddForm(false)
    setSaving(false)
  }

  // --- Certificate image upload ---
  const handleCertUpload = async (eduId, e) => {
    const files = Array.from(e.target.files)
    const isSupabase = eduId && !eduId.startsWith('edu-') && !eduId.startsWith('local-')
    for (const file of files) {
      const reader = new FileReader()
      reader.onload = async (ev) => {
        const certPayload = {
          education_id: isSupabase ? eduId : null,
          title: file.name.replace(/\.[^/.]+$/, ''),
          image_url: ev.target.result,
          sort_order: 0,
        }
        let newCert = { ...certPayload, id: `cert-${Date.now()}-${Math.random()}` }
        if (isSupabase) {
          const { data } = await supabase.from('certificates').insert(certPayload).select().single()
          if (data) newCert = data
        }
        setEducation((prev) => prev.map((e) =>
          e.id === eduId ? { ...e, certificates: [...(e.certificates || []), newCert] } : e
        ))
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const handleRemoveCert = async (eduId, certId) => {
    const isSupabase = !certId.startsWith('cert-')
    if (isSupabase) await supabase.from('certificates').delete().eq('id', certId)
    setEducation((prev) => prev.map((e) =>
      e.id === eduId ? { ...e, certificates: e.certificates.filter((c) => c.id !== certId) } : e
    ))
  }

  return (
    <section id="education">
      <div className="section-header">
        <span className="section-eyebrow">Academic Background</span>
        <h2>Education</h2>
        <div className="section-line" />
      </div>

      <div className="education-list">
        {education.map((e) => (
          <div className="education-item edu-card" key={e.id}>
            {editingId === e.id ? (
              <div className="edu-edit-form">
                <div className="form-row">
                  <input name="icon" value={editForm.icon} onChange={handleEditChange} placeholder="Icon" style={{ maxWidth: '70px' }} />
                  <input name="period" value={editForm.period} onChange={handleEditChange} placeholder="Period" />
                  <select name="status" value={editForm.status} onChange={handleEditChange} className="edu-select">
                    <option>Ongoing</option>
                    <option>Completed</option>
                  </select>
                </div>
                <input name="degree" value={editForm.degree} onChange={handleEditChange} placeholder="Degree / Program" />
                <input name="school" value={editForm.school} onChange={handleEditChange} placeholder="School" />
                <div className="form-actions">
                  <button className="entry-save-btn" onClick={() => handleSaveEdit(e)} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button className="entry-cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <div className="edu-icon-wrap">{e.icon}</div>
                <div className="edu-info" style={{ flex: 1 }}>
                  <div className="edu-top">
                    <h3>{e.degree}</h3>
                    <span className={`edu-status ${e.status === 'Ongoing' ? 'status-ongoing' : 'status-done'}`}>
                      {e.status}
                    </span>
                    {user && <button className="skill-edit-btn" onClick={() => startEdit(e)}>✏️</button>}                  </div>
                  <p className="edu-school">{e.school}</p>
                  <p className="edu-period">{e.period}</p>

                  {/* Certificates */}
                  {e.certificates?.length > 0 && (
                    <div className="cert-list">
                      {e.certificates.map((cert) => (
                        <div className="cert-item" key={cert.id}>
                          <img src={cert.image_url} alt={cert.title} className="cert-thumb" />
                          <span className="cert-title">{cert.title}</span>
                          <button className="remove-image-btn" onClick={() => handleRemoveCert(e.id, cert.id)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {user && (
                  <label className="attach-btn edu-attach" htmlFor={`cert-upload-${e.id}`}>
                    📎 Attach Certificate
                    <input
                      id={`cert-upload-${e.id}`}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(ev) => handleCertUpload(e.id, ev)}
                      style={{ display: 'none' }}
                    />
                  </label>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add new education */}
      <div className="add-project-section">
        {user && (!showAddForm ? (
          <button className="add-project-btn" onClick={() => setShowAddForm(true)}>+ Add Education</button>
        ) : (
          <div className="project-form">
            <h3 className="form-title">New Education</h3>
            <div className="form-row">
              <input name="icon" value={addForm.icon} onChange={(e) => setAddForm((p) => ({ ...p, icon: e.target.value }))} placeholder="Icon (emoji)" style={{ maxWidth: '70px' }} />
              <input name="period" value={addForm.period} onChange={(e) => setAddForm((p) => ({ ...p, period: e.target.value }))} placeholder="Period (e.g. 2022 – Present)" />
              <select name="status" value={addForm.status} onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value }))} className="edu-select">
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>
            <input name="degree" value={addForm.degree} onChange={(e) => setAddForm((p) => ({ ...p, degree: e.target.value }))} placeholder="Degree / Program" />
            <input name="school" value={addForm.school} onChange={(e) => setAddForm((p) => ({ ...p, school: e.target.value }))} placeholder="School / Institution" />
            <div className="form-actions">
              <button className="entry-save-btn" onClick={handleSaveAdd} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button className="entry-cancel-btn" onClick={() => { setShowAddForm(false); setAddForm(EMPTY_EDU) }}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
