# Web Visual Novel Platform — Master Project Brief

## 1. Project Goal

Build a production-ready web application for hosting a **single visual novel per website**.

Primary target:

- story-first experience
- elegant reading UI
- writer/admin tools built into the same app
- easy deployment
- minimal infrastructure friction
- scalable enough for future features

Current intended stack:

- Next.js (App Router)
- TypeScript
- Supabase (Postgres + Auth + Storage)
- Vercel deployment
- ESLint + Vitest + GitHub Actions

---

# 2. Core Product Vision

This is not just a website with pages.

It is a lightweight CMS + Reader + Knowledge Base + Asset Manager for a visual novel.

The same project should let:

## Readers

- read the story
- continue progress without account creation
- browse unlocked lore / glossary
- adjust reading settings
- navigate chapters/pages freely if allowed

## Writers/Admins

- write story pages
- manage chapters / volumes
- upload assets
- manage characters
- edit knowledge base
- preview changes instantly
- ideally edit inline while reading

---

# 3. Story Format

Initial scope:

## Kinetic Novel

100% linear.

No choices.
No branching.
No routes.
No CYOA.

Future expansion possible.

---

# 4. Main User Areas

## Public Main Menu

Suggested sections:

- Read
- Archive / Chapters
- Learn
- Settings
- Continue

Optional future:
- Extras
- Gallery
- Music Room

---

## Reader View

Displays a page of the story.

Each page may contain:

- background image
- overlay visual effect
- foreground character sprites
- text content
- optional page title
- music
- speech / voice clip
- transitions

Reader actions:

- next page
- previous page
- autoplay
- adjust text speed
- mute / volume
- open KB entries
- open menu

---

## Admin / Writer Mode

Same UI as reader where possible.

But with editing enabled:

- inline page editing
- edit text directly
- swap images quickly
- assign music
- reorder pages
- create pages
- jump to chapter editor
- publish/unpublish

Goal:

**write while reading** instead of switching to separate admin panel constantly.

---

# 5. Story Structure

Hierarchy:

```text
Volume
 └── Chapter
      └── Page
```

## Volume

Contains chapters.

Fields:

- title
- slug
- position
- thumbnail
- description (optional)

## Chapter

Contains pages.

Fields:

- volume_id
- title
- slug
- position
- thumbnail
- page

## Core content unit.

Fields:

- chapter_id
- position (use gaps of 1000 for insertions)
- title (optional)
- content
- background_id
- thumbnail_id
- music_track_id
- music_behavior
- status (draft/published)

---

# 6. Text System

Each page contains a relatively small amount of text.

Store as renderable HTML/string.

Example:

```html
The city of <kb data-id="uuid">Velmora</kb> was silent.
```

or structured token system later.

---

# 7. Knowledge Base (Lore System)

One of the key differentiators.

Readers should never feel lost.

## Features

### KB Entries

Lore articles such as:

- characters
- factions
- cities
- history
- concepts
- glossary

### In-Text Hotlinks

If a word exists in KB:

- visually highlighted
- hover shows tooltip summary
- click opens modal/fullscreen article
- Progressive Unlocking

### Content visibility depends on story progress.

Example:

If user only reached page 12:

- only relevant lore visible
- later spoilers hidden


### Chunk-Based Articles

Articles can contain blocks unlocked separately.

Example:

```text
King Rowan
- Basic description unlocked page 1
- True identity unlocked page 45
```

---

# 8. Progress System

No registration required for readers.

Use cookies/local storage.

Stored data:

- `furthest_page_index`: The highest calculated offset (0-based) the user has reached.
- `current_page_id`: The UUID of the page currently being viewed.
- settings: Text speed, volume, etc.

Navigation Rules:

- Jump to Page: Users can input a "Book Page Number." The app will fetch that page using a database OFFSET.  
- Linear Flow: Clicking "Next" finds the next highest position in the current chapter, or the first page of the next chapter.  
- Reset: Clearing cookies resets `furthest_page_index`.

Optional future:
cloud sync account

---

# 9. Audio System

## Music Sources

### A. YouTube

Track entity stores:

- video id
- start time
- end time
- loop

### B. Uploaded Audio

MP3 / audio files in storage.

## Important Playback Rule

- Music should not be page-bound only.

Need support for:

- Continue Current Music - track continues across multiple pages
- Change Music
- Switch to new track.
- Stop Music
- Fade or stop.

Suggested enum:

```text
continue | change | stop
```

---

# 10. Visual Assets

## Media Assets

Reusable uploaded assets.

Types:

- backgrounds
- thumbnails
- sprites
- icons
- gallery images
- audio

Stored in Supabase Storage + DB metadata.

## Character Sprites

Each character can have unlimited images.

Examples:

- neutral
- happy
- angry
- wounded

Admin can quickly select sprite for a page.

## Effects Layer

Optional overlay layer:

Examples:

- falling leaves
- rain
- snow
- fog
- particles

Should use CSS/canvas/web animations when possible.

Avoid heavy GIF dependence.

---

# 11. Settings System

Reader settings:

- text speed
- autoplay on/off
- master volume
- music volume
- mute
- transitions on/off (future)
- theme (future)

Persist locally.

---

# 12. Authentication

Only admins/writers authenticate.

Readers do not.

Current preferred approach: Supabase Auth with magic link login.

Reason:

- easy
- secure
- low maintenance

Optional future:

- password login
- 2FA
- multiple writer roles

---

# 13. Permissions / Security

Use Supabase RLS.

## Public

Can read published content only.

## Admin

Can CRUD all content.

Protected tables:

- pages
- chapters
- volumes
- kb entries
- media assets

Already planned/tested with integration tests.

---

# 14. Technical Architecture

## Frontend

Next.js App Router.

## Backend Logic

Use server actions / server functions / repositories.

Avoid unnecessary REST API routes unless external API needed.

## Data Layer

Repository pattern.

Example:

```typescript
pagesRepository.create()
pagesRepository.read()
chaptersRepository.update()
```

Generic CRUD factory for simple tables.

Custom repository methods for domain logic.

---

# 15. Existing Foundation (Already Built Earlier)

At minimum this project previously had:

- GitHub Actions CI
- Husky pre-commit hooks
- lint-staged
- ESLint strict config
- Vitest
- Supabase schema migrations
- RLS migration
- Integration test for RLS
- Repository architecture scaffold

---

# 16. Development Roadmap

## Phase 1 — Reconstruct Current State

- audit existing repo
- run project
- verify migrations
- verify tests
- verify env vars
- verify Supabase connection

## Phase 2 — Core Data Layer

Implement repositories for:

- volumes
- chapters
- pages
- kb_entries
- kb_chunks
- characters
- media_assets
- music_tracks

## Phase 3 — Public Reader MVP

Build:

- main menu
- page reader
- next/prev navigation
- progress save
- background rendering
- text rendering
- music playback

## Phase 4 — Knowledge Base MVP

Build:

- KB index
- KB modal
- hover tooltips
- unlock logic
- page-aware filtering

## Phase 5 — Admin Tools MVP

Build inline editing:

- edit page text
- assign assets
- reorder pages
- create/delete pages
- manage chapters
- upload media

## Phase 6 — UX Polish

- transitions
- preload next page assets
- responsive mobile UX
- keyboard controls
- loading states
- caching

## Phase 7 — Content Production

Actually write the novel.

This is the largest task.

## Phase 8 — Optional Future Features

### Story Features

- choices
- branching paths
- affection flags
- endings

### Social Features

- accounts
- cloud sync
- comments

### AI Features

- generate art
- generate music
- writing assistance
- editing suggestions

### Advanced Presentation

- screen shake
- timed animation
- particle editor
- cinematic scenes

---

# 17. Guiding Principles

## Product Principles

- story first
- frictionless reader UX
- spoiler-safe lore access
- writer efficiency
- same interface for read/edit when possible

## Engineering Principles

- strict typing
- reusable architecture
- minimal duplication
- real tests
- scalable schema
- avoid premature complexity

---

# 18. Immediate Next Step (If Restarting Today)

1. inspect current repo state
2. finish repository refactor
3. run tests
4. implement Pages + Chapters repositories fully
5. build Reader MVP
6. iterate from there

---

# 19. One-Line Summary

A modern web-based visual novel platform with integrated storytelling, lore system, asset management, and inline authoring tools built on Next.js + Supabase.