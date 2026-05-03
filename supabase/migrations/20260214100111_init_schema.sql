-- Enum types
CREATE TYPE entity_type AS ENUM (
  'character',
  'concept',
  'location',
  'item'
);

CREATE TYPE media_type AS ENUM (
  'image',
  'audio',
  'youtube'
);

CREATE TYPE music_behavior AS ENUM (
  'continue',
  'change',
  'stop'
);

CREATE TYPE page_status AS ENUM (
  'draft',
  'published'
);

CREATE TYPE position_slots AS ENUM (
  'centre',
  'left',
  'right'
);

-- Tables
CREATE TABLE media_asset (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type media_type NOT NULL,
  url text NOT NULL,
  thumbnail_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE volume (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  thumbnail_id uuid REFERENCES media_asset(id),
  position int NOT NULL,
  UNIQUE (position)
);

CREATE TABLE chapter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  volume_id uuid NOT NULL REFERENCES volume(id) ON DELETE CASCADE,
  title text NOT NULL,
  thumbnail_id uuid REFERENCES media_asset(id),
  position int NOT NULL,
  UNIQUE (volume_id, position)
);

CREATE TABLE page (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES chapter(id) ON DELETE CASCADE,
  title text,
  background_id uuid REFERENCES media_asset(id),
  thumbnail_id uuid REFERENCES media_asset(id),
  status page_status NOT NULL DEFAULT 'draft',
  music_behavior music_behavior NOT NULL DEFAULT 'continue',
  music_track_id uuid,
  position bigint NOT NULL,
  content text NOT NULL,
  UNIQUE (chapter_id, position)
);

CREATE TABLE music_track (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_asset_id uuid NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE,
  start_time int DEFAULT 0,
  end_time int,
  loop boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page
  ADD CONSTRAINT fk_page_music
  FOREIGN KEY (music_track_id)
  REFERENCES music_track(id);

CREATE TABLE entity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type entity_type NOT NULL,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  thumbnail_id uuid REFERENCES media_asset(id),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE kb_chunk (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES entity(id) ON DELETE CASCADE,
  unlock_page_id uuid NOT NULL REFERENCES page(id),
  position int NOT NULL,
  content text NOT NULL,
  UNIQUE (entity_id, position)
);

CREATE TABLE character_image (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_id uuid NOT NULL REFERENCES entity(id) ON DELETE CASCADE,
  label text NOT NULL,
  media_asset_id uuid NOT NULL REFERENCES media_asset(id) ON DELETE CASCADE
);

CREATE TABLE page_character (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES page(id) ON DELETE CASCADE,
  character_image_id uuid NOT NULL REFERENCES character_image(id) ON DELETE CASCADE,
  position_slot position_slots NOT NULL,
  z_index int NOT NULL DEFAULT 0
);

-- Indexes for foreign key columns and common lookup patterns
CREATE INDEX IF NOT EXISTS idx_volume_thumbnail_id ON public.volume (thumbnail_id);
CREATE INDEX IF NOT EXISTS idx_chapter_volume_id ON public.chapter (volume_id);
CREATE INDEX IF NOT EXISTS idx_chapter_thumbnail_id ON public.chapter (thumbnail_id);
CREATE INDEX IF NOT EXISTS idx_page_chapter_id ON public.page (chapter_id);
CREATE INDEX IF NOT EXISTS idx_page_background_id ON public.page (background_id);
CREATE INDEX IF NOT EXISTS idx_page_thumbnail_id ON public.page (thumbnail_id);
CREATE INDEX IF NOT EXISTS idx_page_music_track_id ON public.page (music_track_id);
CREATE INDEX IF NOT EXISTS idx_music_track_media_asset_id ON public.music_track (media_asset_id);
CREATE INDEX IF NOT EXISTS idx_entity_thumbnail_id ON public.entity (thumbnail_id);
CREATE INDEX IF NOT EXISTS idx_kb_chunk_entity_id ON public.kb_chunk (entity_id);
CREATE INDEX IF NOT EXISTS idx_kb_chunk_unlock_page_id ON public.kb_chunk (unlock_page_id);
CREATE INDEX IF NOT EXISTS idx_character_image_entity_id ON public.character_image (entity_id);
CREATE INDEX IF NOT EXISTS idx_character_image_media_asset_id ON public.character_image (media_asset_id);
CREATE INDEX IF NOT EXISTS idx_page_character_page_id ON public.page_character (page_id);
CREATE INDEX IF NOT EXISTS idx_page_character_character_image_id ON public.page_character (character_image_id);