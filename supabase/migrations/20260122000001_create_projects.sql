create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  subtitle text,
  tag text,
  description text,
  stack text[] default '{}',
  logo_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- seed existing projects
insert into projects (year, title, subtitle, tag, description, stack, logo_url, sort_order) values
(
  '2024 – 2026',
  'EduLink',
  'School Curriculum Management System',
  'Capstone – Completed',
  'A web-based system for Naawan Central School to secure academic records and simplify lesson plan management with PDF export.',
  array['Laravel','React','Inertia.js','PHP','TypeScript','Tailwind CSS','PostgreSQL','MySQL','DomPDF'],
  '/logos/ncs-edulink-logo-removebg-preview.png',
  1
),
(
  '2025',
  'Djangobnb',
  'Full-stack Airbnb Clone',
  'Completed',
  'A fullstack Airbnb clone with property listings, real-time messaging via WebSocket, booking management, and JWT authentication.',
  array['Django','DRF','Next.js','React','TypeScript','Tailwind CSS','PostgreSQL','Docker','Simple JWT'],
  '/logos/djangobnb-logo-removebg-preview.png',
  2
),
(
  '2026',
  'DocuTrack',
  'Document Tracking System',
  'Internship – Provincial Treasurer''s Office · Completed',
  'A full-stack document tracking system with QR code scanning, PDF generation, real-time status monitoring, deployed on Railway and Vercel.',
  array['React','TypeScript','Vite','Tailwind CSS','Node.js','Express','SQLite','Supabase','Railway','Vercel'],
  '/logos/pto-logo-removebg-preview.png',
  3
);
