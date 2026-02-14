alter table media_asset enable row level security;
alter table volume enable row level security;
alter table chapter enable row level security;
alter table page enable row level security;
alter table music_track enable row level security;
alter table entity enable row level security;
alter table kb_chunk enable row level security;
alter table character_image enable row level security;
alter table page_character enable row level security;

create policy "Public read media"
on media_asset
for select
using (true);

create policy "Public read volumes"
on volume
for select
using (true);

create policy "Public read chapters"
on chapter
for select
using (true);

create policy "Public read published pages"
on page
for select
using (status = 'published');

create policy "Public read music"
on music_track
for select
using (true);

create policy "Public read entities"
on entity
for select
using (true);

create policy "Public read KB"
on kb_chunk
for select
using (true);

create policy "Public read character images"
on character_image
for select
using (true);

create policy "Public read page characters"
on page_character
for select
using (true);

create policy "Admin full access media"
on media_asset
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access volume"
on volume
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access chapter"
on chapter
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access page"
on page
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access music_track"
on music_track
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access entity"
on entity
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access kb_chunk"
on kb_chunk
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access character_image"
on character_image
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

create policy "Admin full access page_character"
on page_character
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');

