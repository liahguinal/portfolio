const education = [
  {
    period: '2022 – Present',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Mindanao State University at Naawan',
    icon: '🎓',
    status: 'Ongoing',
  },
  {
    period: '2015 – 2021',
    degree: 'High School Diploma',
    school: 'Iligan City National High School',
    icon: '🏫',
    status: 'Completed',
  },
]

export default function Education() {
  return (
    <section id="education">
      <div className="section-header">
        <span className="section-eyebrow">Academic Background</span>
        <h2>Education</h2>
        <div className="section-line" />
      </div>
      <div className="education-list">
        {education.map((e) => (
          <div className="education-item" key={e.school}>
            <div className="edu-icon-wrap">{e.icon}</div>
            <div className="edu-info">
              <div className="edu-top">
                <h3>{e.degree}</h3>
                <span className={`edu-status ${e.status === 'Ongoing' ? 'status-ongoing' : 'status-done'}`}>
                  {e.status}
                </span>
              </div>
              <p className="edu-school">{e.school}</p>
              <p className="edu-period">{e.period}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
