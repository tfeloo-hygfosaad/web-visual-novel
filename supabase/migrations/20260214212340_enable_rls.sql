-- Enable RLS
ALTER TABLE media_asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE volume ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter ENABLE ROW LEVEL SECURITY;
ALTER TABLE page ENABLE ROW LEVEL SECURITY;
ALTER TABLE music_track ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_chunk ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_character ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Public read media" ON media_asset;
DROP POLICY IF EXISTS "Admin insert media" ON media_asset;
DROP POLICY IF EXISTS "Admin update media" ON media_asset;
DROP POLICY IF EXISTS "Admin delete media" ON media_asset;

DROP POLICY IF EXISTS "Public read volumes" ON volume;
DROP POLICY IF EXISTS "Admin insert volume" ON volume;
DROP POLICY IF EXISTS "Admin update volume" ON volume;
DROP POLICY IF EXISTS "Admin delete volume" ON volume;

DROP POLICY IF EXISTS "Public read chapters" ON chapter;
DROP POLICY IF EXISTS "Admin insert chapter" ON chapter;
DROP POLICY IF EXISTS "Admin update chapter" ON chapter;
DROP POLICY IF EXISTS "Admin delete chapter" ON chapter;

DROP POLICY IF EXISTS "Conditionally read pages" ON page;
DROP POLICY IF EXISTS "Admin read any pages" ON page;
DROP POLICY IF EXISTS "Admin insert page" ON page;
DROP POLICY IF EXISTS "Admin update page" ON page;
DROP POLICY IF EXISTS "Admin delete page" ON page;

DROP POLICY IF EXISTS "Public read music" ON music_track;
DROP POLICY IF EXISTS "Admin insert music_track" ON music_track;
DROP POLICY IF EXISTS "Admin update music_track" ON music_track;
DROP POLICY IF EXISTS "Admin delete music_track" ON music_track;

DROP POLICY IF EXISTS "Public read entities" ON entity;
DROP POLICY IF EXISTS "Admin insert entity" ON entity;
DROP POLICY IF EXISTS "Admin update entity" ON entity;
DROP POLICY IF EXISTS "Admin delete entity" ON entity;

DROP POLICY IF EXISTS "Public read KB chunks" ON kb_chunk;
DROP POLICY IF EXISTS "Admin insert kb_chunk" ON kb_chunk;
DROP POLICY IF EXISTS "Admin update kb_chunk" ON kb_chunk;
DROP POLICY IF EXISTS "Admin delete kb_chunk" ON kb_chunk;

DROP POLICY IF EXISTS "Public read character images" ON character_image;
DROP POLICY IF EXISTS "Admin insert character_image" ON character_image;
DROP POLICY IF EXISTS "Admin update character_image" ON character_image;
DROP POLICY IF EXISTS "Admin delete character_image" ON character_image;

DROP POLICY IF EXISTS "Public read page characters" ON page_character;
DROP POLICY IF EXISTS "Admin insert page_character" ON page_character;
DROP POLICY IF EXISTS "Admin update page_character" ON page_character;
DROP POLICY IF EXISTS "Admin delete page_character" ON page_character;

-- Public read permissions
CREATE POLICY "Public read media"
  ON media_asset
  FOR SELECT
  USING (true);

CREATE POLICY "Public read volumes"
  ON volume
  FOR SELECT
  USING (true);

CREATE POLICY "Public read chapters"
  ON chapter
  FOR SELECT
  USING (true);

CREATE POLICY "Conditionally read pages"
  ON page
  FOR SELECT
  USING (
    status = 'published'
    OR ((SELECT auth.uid()) IS NOT NULL)
  );

CREATE POLICY "Public read music"
  ON music_track
  FOR SELECT
  USING (true);

CREATE POLICY "Public read entities"
  ON entity
  FOR SELECT
  USING (true);

CREATE POLICY "Public read KB chunks"
  ON kb_chunk
  FOR SELECT
  USING (true);

CREATE POLICY "Public read character images"
  ON character_image
  FOR SELECT
  USING (true);

CREATE POLICY "Public read page characters"
  ON page_character
  FOR SELECT
  USING (true);

-- Admin CRUD permissions
CREATE POLICY "Admin insert media"
  ON media_asset
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update media"
  ON media_asset
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete media"
  ON media_asset
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- volume
CREATE POLICY "Admin insert volume"
  ON volume
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update volume"
  ON volume
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete volume"
  ON volume
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- chapter
CREATE POLICY "Admin insert chapter"
  ON chapter
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update chapter"
  ON chapter
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete chapter"
  ON chapter
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- page
CREATE POLICY "Admin insert page"
  ON page
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update page"
  ON page
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete page"
  ON page
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- music_track
CREATE POLICY "Admin insert music_track"
  ON music_track
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update music_track"
  ON music_track
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete music_track"
  ON music_track
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- entity
CREATE POLICY "Admin insert entity"
  ON entity
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update entity"
  ON entity
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete entity"
  ON entity
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- kb_chunk
CREATE POLICY "Admin insert kb_chunk"
  ON kb_chunk
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update kb_chunk"
  ON kb_chunk
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete kb_chunk"
  ON kb_chunk
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- character_image
CREATE POLICY "Admin insert character_image"
  ON character_image
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update character_image"
  ON character_image
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete character_image"
  ON character_image
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);

-- page_character
CREATE POLICY "Admin insert page_character"
  ON page_character
  FOR INSERT
  TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin update page_character"
  ON page_character
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL)
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL);

CREATE POLICY "Admin delete page_character"
  ON page_character
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL);