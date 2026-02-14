create type entity_type as enum (
  'character',
  'concept',
  'location',
  'item'
);

create type media_type as enum (
  'image',
  'audio',
  'youtube'
);

create type music_behavior as enum (
  'continue',
  'change',
  'stop'
);

create type page_status as enum (
  'draft',
  'published'
);

create type position_slots as enum (
  'centre',
  'left',
  'right'
);

create table media_asset (
  id uuid primary key default gen_random_uuid(),
  type media_type not null,
  url text not null,
  thumbnail_url text,
  created_at timestamptz default now()
);

create table volume (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  thumbnail_id uuid references media_asset(id),
  position int not null,
  unique (position)
);

create table chapter (
  id uuid primary key default gen_random_uuid(),
  volume_id uuid not null references volume(id) on delete cascade,
  title text not null,
  thumbnail_id uuid references media_asset(id),
  position int not null,
  unique (volume_id, position)
);

create table page (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid not null references chapter(id) on delete cascade,
  title text,
  background_id uuid references media_asset(id),
  thumbnail_id uuid references media_asset(id),
  status page_status not null default 'draft',
  music_behavior music_behavior not null default 'continue',
  music_track_id uuid,
  global_position int not null unique,
  position int not null,
  content text not null,
  unique (chapter_id, position)
);

create table music_track (
  id uuid primary key default gen_random_uuid(),
  media_asset_id uuid not null references media_asset(id) on delete cascade,
  start_time int default 0,
  end_time int,
  loop boolean default true,
  created_at timestamptz default now()
);

alter table page
add constraint fk_page_music
foreign key (music_track_id)
references music_track(id);

create table entity (
  id uuid primary key default gen_random_uuid(),
  type entity_type not null,
  slug text not null unique,
  title text not null,
  thumbnail_id uuid references media_asset(id),
  created_at timestamptz default now()
);

create table kb_chunk (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references entity(id) on delete cascade,
  unlock_page_id uuid references page(id),
  position int not null,
  content text not null,
  unique (entity_id, position)
);

create table character_image (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references entity(id) on delete cascade,
  label text not null,
  media_asset_id uuid not null references media_asset(id) on delete cascade
);

create table page_character (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references page(id) on delete cascade,
  character_image_id uuid not null references character_image(id) on delete cascade,
  position_slot position_slots not null,
  z_index int not null default 0
);