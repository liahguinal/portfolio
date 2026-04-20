create table if not exists internship_entries (
  date text primary key,
  description text,
  shift text,
  images text[] default '{}',
  docs text[] default '{}'
);
