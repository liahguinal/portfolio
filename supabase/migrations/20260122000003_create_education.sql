create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  degree text not null,
  school text not null,
  icon text default '🎓',
  status text default 'Ongoing',
  sort_order integer default 0
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  education_id uuid references education(id) on delete cascade,
  title text not null,
  image_url text,
  sort_order integer default 0
);

-- Seed education
insert into education (period, degree, school, icon, status, sort_order) values
('2022 – Present', 'Bachelor of Science in Information Technology', 'Mindanao State University at Naawan', '🎓', 'Ongoing', 1),
('2015 – 2021', 'High School Diploma', 'Iligan City National High School', '🏫', 'Completed', 2);
