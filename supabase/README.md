# Supabase Database Setup for TCoEFS Admin

This directory contains the database schema for the TCoEFS admin content management system.

## Tables

The admin system uses three main tables:

1. **youtube_video** - Stores the YouTube video ID displayed below the counter
2. **spotlight_cards** - Stores spotlight cards (maximum 5)
3. **upcoming_event** - Stores the current upcoming event

## Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy the entire contents of `schema.sql`
5. Paste into the editor
6. Click **Run** to execute the SQL

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db reset
```

Or apply the migration directly:

```bash
supabase db push
```

## Verification

After running the schema, verify the tables were created:

1. Go to **Table Editor** in Supabase Dashboard
2. You should see three tables:
   - `youtube_video`
   - `spotlight_cards`
   - `upcoming_event`

3. Check that default data was inserted:
   - `youtube_video` should have 1 row with video ID `katKpm79Zus`
   - `spotlight_cards` should have 4 rows (existing spotlights)
   - `upcoming_event` should have 1 row (USLGE delegation visit)

## Security

The schema includes Row Level Security (RLS) policies:

- **Public**: Can read all content (SELECT)
- **Authenticated users**: Can insert, update, and delete (admin verification happens in app logic)

## Schema Details

### youtube_video
- `id` (UUID, Primary Key)
- `video_id` (TEXT) - YouTube video ID
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `updated_by` (TEXT) - Username/email of admin who updated

### spotlight_cards
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `description` (TEXT)
- `image` (TEXT) - Main card image URL
- `images` (JSONB) - Array of image URLs for modal gallery
- `video_id` (TEXT, nullable) - Optional YouTube video ID for modal
- `full_content_title` (TEXT) - Full title shown in modal
- `full_content_text` (TEXT) - Full content text for modal
- `full_content_details` (JSONB) - Array of bullet points
- `display_order` (INTEGER) - Order in carousel
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `updated_by` (TEXT)

**Note**: Maximum 5 spotlight cards. The admin UI enforces this limit.

### upcoming_event
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `date_range` (TEXT) - e.g., "12th - 17th October 2025"
- `location` (TEXT)
- `link` (TEXT) - Link to event details (default: blog)
- `is_active` (BOOLEAN) - Only one event should be active at a time
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `updated_by` (TEXT)

## Troubleshooting

### Tables already exist error
If you get an error about tables already existing, you can either:
1. Drop the tables first (⚠️ this will delete all data):
   ```sql
   DROP TABLE IF EXISTS youtube_video CASCADE;
   DROP TABLE IF EXISTS spotlight_cards CASCADE;
   DROP TABLE IF EXISTS upcoming_event CASCADE;
   ```
2. Or skip the creation and just insert default data

### Permission errors
Make sure you're running the SQL as the database owner or with sufficient privileges.

## Support

For questions or issues, contact the development team.