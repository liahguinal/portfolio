const education = [
  {
    period: '2022 – Present',
    degree: 'Bachelor of Science in Information Technology',
    school: 'Mindanao State University at Naawan',
  },
  {
    period: '2015 – 2021',
    degree: 'High School',
    school: 'Iligan City National High School',
  },
]

export default function Education() {
  return (
    <section id="education">
      <h2>Education</h2>
      <div className="education-list">
        {education.map((e) => (
          <div className="education-item" key={e.school}>
            <span className="edu-period">{e.period}</span>
            <h3>{e.degree}</h3>
            <p>{e.school}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
