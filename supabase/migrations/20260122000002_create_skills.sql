-- Technical skills: each row is a category with its items
create table if not exists technical_skills (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  items text[] default '{}',
  sort_order integer default 0
);

-- Soft skills
create table if not exists soft_skills (
  id uuid primary key default gen_random_uuid(),
  icon text not null,
  label text not null,
  sort_order integer default 0
);

-- Seed technical skills
insert into technical_skills (category, items, sort_order) values
('Frontend', array['React','Next.js','HTML','CSS','JavaScript','TypeScript'], 1),
('Backend',  array['Laravel (PHP)','Django','Node.js','Express'], 2),
('Database', array['SQLite','PostgreSQL','MySQL','Supabase'], 3),
('Styling',  array['Tailwind CSS','CSS Modules'], 4),
('Tools',    array['Git','GitHub','Docker','Vite','VS Code','Vercel','Railway'], 5),
('Other',    array['REST API','WebSocket','JWT Auth','PDF Generation','QR Scanning'], 6);

-- Seed soft skills
insert into soft_skills (icon, label, sort_order) values
('🤝', 'Team collaboration and communication', 1),
('⏰', 'Time management and task organization', 2),
('🧩', 'Problem-solving and analytical thinking', 3),
('🎨', 'Attention to detail and creativity', 4);
