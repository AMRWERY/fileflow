# FileFlow — Database Structure

**Platform:** Supabase (PostgreSQL)
**Auth:** Supabase Auth (`auth.users`)
**Storage:** Supabase Storage (4 buckets)
**Realtime:** Enabled on `notifications`, `upload_sessions`, `activity_logs`

---

## Tables Overview

| Table | Description |
|---|---|
| `profiles` | Extended user data linked to auth.users |
| `folders` | Folder hierarchy with materialized paths |
| `files` | All uploaded file records |
| `file_versions` | Version history per file |
| `file_tags` | User-defined tags on files |
| `share_links` | Public/private share link records |
| `file_requests` | Upload request links (others upload to you) |
| `upload_sessions` | Chunked upload state tracking |
| `team_spaces` | Shared team workspaces |
| `team_members` | Users ↔ team spaces with roles |
| `activity_logs` | Full audit trail of all actions |
| `file_comments` | Comments on files |
| `notifications` | In-app notifications per user |
| `api_keys` | Programmatic API key management |

---

## Table Definitions

---

### `profiles`

Extends `auth.users`. Created automatically via trigger on user signup.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | — | PK, FK → `auth.users.id` ON DELETE CASCADE |
| `email` | `text` | NO | — | mirrors auth.users.email |
| `full_name` | `text` | YES | `null` | |
| `avatar_url` | `text` | YES | `null` | points to `avatars` storage bucket |
| `storage_used` | `bigint` | NO | `0` | bytes, auto-updated by trigger |
| `storage_quota` | `bigint` | NO | `5368709120` | bytes (default 5 GB) |
| `role` | `text` | NO | `'user'` | `'user'` \| `'admin'` |
| `is_active` | `boolean` | NO | `true` | admin can suspend |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | auto-updated by trigger |

**Indexes:**
```sql
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);
```

**RLS:**
- `SELECT`: user can read own row; admins can read all
- `UPDATE`: user can update own row (except `role`, `storage_quota`, `is_active`); admins can update all

---

### `folders`

Supports unlimited nesting via `parent_id` self-reference and `path` materialized path for efficient subtree queries.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `team_space_id` | `uuid` | YES | `null` | FK → `team_spaces.id` ON DELETE CASCADE |
| `parent_id` | `uuid` | YES | `null` | FK → `folders.id` ON DELETE CASCADE; null = root |
| `name` | `text` | NO | — | folder display name |
| `color` | `text` | YES | `null` | hex color e.g. `#6B5CE7` |
| `path` | `text` | NO | — | materialized path e.g. `/uuid1/uuid2/uuid3` |
| `is_deleted` | `boolean` | NO | `false` | soft delete |
| `deleted_at` | `timestamptz` | YES | `null` | |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE INDEX idx_folders_user_id ON folders(user_id);
CREATE INDEX idx_folders_parent_id ON folders(parent_id);
CREATE INDEX idx_folders_team_space_id ON folders(team_space_id);
CREATE INDEX idx_folders_path ON folders USING btree(path text_pattern_ops);
CREATE INDEX idx_folders_is_deleted ON folders(is_deleted);
```

**Constraints:**
```sql
-- A folder must belong to either a user or a team space, not both or neither
ALTER TABLE folders ADD CONSTRAINT chk_folders_owner
  CHECK (
    (user_id IS NOT NULL AND team_space_id IS NULL) OR
    (team_space_id IS NOT NULL AND user_id IS NOT NULL)
  );
```

**RLS:**
- `SELECT`: user owns folder OR user is member of the folder's team space
- `INSERT/UPDATE/DELETE`: user is owner OR team member with Editor/Admin role

---

### `files`

Core table. Every uploaded file has one record here. Soft-deleted files move to trash.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE; uploader |
| `folder_id` | `uuid` | YES | `null` | FK → `folders.id` ON DELETE SET NULL; null = root |
| `team_space_id` | `uuid` | YES | `null` | FK → `team_spaces.id` ON DELETE CASCADE |
| `name` | `text` | NO | — | display name (user can rename) |
| `original_name` | `text` | NO | — | filename as uploaded |
| `storage_path` | `text` | NO | — | path in `files` Supabase Storage bucket |
| `thumbnail_path` | `text` | YES | `null` | path in `thumbnails` bucket |
| `mime_type` | `text` | NO | — | e.g. `image/jpeg` |
| `extension` | `text` | YES | `null` | lowercase e.g. `pdf` |
| `size` | `bigint` | NO | — | file size in bytes |
| `hash` | `text` | YES | `null` | SHA-256 for deduplication |
| `is_starred` | `boolean` | NO | `false` | |
| `is_deleted` | `boolean` | NO | `false` | soft delete (trash) |
| `deleted_at` | `timestamptz` | YES | `null` | |
| `expires_at` | `timestamptz` | YES | `null` | auto-delete after this date |
| `scan_status` | `text` | NO | `'pending'` | `'pending'` \| `'clean'` \| `'infected'` \| `'skipped'` |
| `version_count` | `integer` | NO | `1` | incremented on new version upload |
| `download_count` | `integer` | NO | `0` | |
| `metadata` | `jsonb` | YES | `{}` | width, height, duration, pages, etc. |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**`metadata` JSONB shape (examples by type):**
```jsonc
// Image
{ "width": 1920, "height": 1080, "color_profile": "sRGB" }

// Video
{ "width": 1280, "height": 720, "duration": 142.5, "fps": 30 }

// Audio
{ "duration": 212.0, "bitrate": 320, "sample_rate": 44100 }

// PDF / Document
{ "pages": 12 }
```

**Indexes:**
```sql
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_folder_id ON files(folder_id);
CREATE INDEX idx_files_team_space_id ON files(team_space_id);
CREATE INDEX idx_files_hash ON files(hash);
CREATE INDEX idx_files_mime_type ON files(mime_type);
CREATE INDEX idx_files_is_deleted ON files(is_deleted);
CREATE INDEX idx_files_is_starred ON files(is_starred) WHERE is_starred = true;
CREATE INDEX idx_files_scan_status ON files(scan_status);
CREATE INDEX idx_files_created_at ON files(created_at DESC);
CREATE INDEX idx_files_name_search ON files USING gin(to_tsvector('english', name));
```

**RLS:**
- `SELECT`: uploader OR team member with any role OR has a valid share link token
- `INSERT`: authenticated users within quota
- `UPDATE`: uploader OR team member with Editor/Admin role
- `DELETE`: uploader OR Admin

---

### `file_versions`

Stores previous versions when a file is re-uploaded. Current version lives in `files.storage_path`.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `file_id` | `uuid` | NO | — | FK → `files.id` ON DELETE CASCADE |
| `user_id` | `uuid` | NO | — | FK → `profiles.id`; who uploaded this version |
| `version_number` | `integer` | NO | — | 1-based, monotonically increasing |
| `storage_path` | `text` | NO | — | path in `files` bucket |
| `size` | `bigint` | NO | — | |
| `hash` | `text` | YES | `null` | |
| `label` | `text` | YES | `null` | optional version label e.g. "v2 — client review" |
| `created_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE INDEX idx_file_versions_file_id ON file_versions(file_id);
CREATE UNIQUE INDEX idx_file_versions_unique ON file_versions(file_id, version_number);
```

**RLS:** same visibility as parent `files` row.

---

### `file_tags`

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `file_id` | `uuid` | NO | — | FK → `files.id` ON DELETE CASCADE |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `tag` | `text` | NO | — | lowercase, trimmed |
| `created_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_file_tags_unique ON file_tags(file_id, user_id, tag);
CREATE INDEX idx_file_tags_tag ON file_tags(tag);
CREATE INDEX idx_file_tags_user_id ON file_tags(user_id);
```

**Constraints:**
```sql
ALTER TABLE file_tags ADD CONSTRAINT chk_tag_format
  CHECK (tag ~ '^[a-z0-9\-_]+$' AND length(tag) BETWEEN 1 AND 50);
```

---

### `share_links`

Each row is a shareable token for a file or folder. Supports password protection, expiry, and download limits.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `token` | `text` | NO | — | UNIQUE, random URL-safe string (16 chars) |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE; creator |
| `file_id` | `uuid` | YES | `null` | FK → `files.id` ON DELETE CASCADE |
| `folder_id` | `uuid` | YES | `null` | FK → `folders.id` ON DELETE CASCADE |
| `permission` | `text` | NO | `'view'` | `'view'` \| `'download'` |
| `password_hash` | `text` | YES | `null` | bcrypt hash; null = no password |
| `expires_at` | `timestamptz` | YES | `null` | null = never expires |
| `max_downloads` | `integer` | YES | `null` | null = unlimited |
| `download_count` | `integer` | NO | `0` | |
| `view_count` | `integer` | NO | `0` | |
| `is_active` | `boolean` | NO | `true` | manual disable |
| `created_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_share_links_token ON share_links(token);
CREATE INDEX idx_share_links_user_id ON share_links(user_id);
CREATE INDEX idx_share_links_file_id ON share_links(file_id);
CREATE INDEX idx_share_links_folder_id ON share_links(folder_id);
CREATE INDEX idx_share_links_expires_at ON share_links(expires_at) WHERE expires_at IS NOT NULL;
```

**Constraints:**
```sql
-- Must link to either file or folder, not both, not neither
ALTER TABLE share_links ADD CONSTRAINT chk_share_links_target
  CHECK (
    (file_id IS NOT NULL AND folder_id IS NULL) OR
    (folder_id IS NOT NULL AND file_id IS NULL)
  );
```

**RLS:**
- `SELECT`: owner can always read; public can read only if `is_active = true AND (expires_at IS NULL OR expires_at > now())`
- `INSERT/UPDATE/DELETE`: owner only

---

### `file_requests`

Lets users generate a link so others (even unauthenticated) can upload files directly into a specified folder.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `token` | `text` | NO | — | UNIQUE, random URL-safe string |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE; owner |
| `folder_id` | `uuid` | YES | `null` | FK → `folders.id` ON DELETE SET NULL; destination |
| `title` | `text` | NO | — | shown on request page |
| `description` | `text` | YES | `null` | optional instructions |
| `allowed_types` | `text[]` | YES | `null` | array of mime types; null = all allowed |
| `max_file_size` | `bigint` | YES | `null` | bytes; null = inherits system default |
| `max_files` | `integer` | YES | `null` | per submission; null = unlimited |
| `expires_at` | `timestamptz` | YES | `null` | |
| `is_active` | `boolean` | NO | `true` | |
| `created_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_file_requests_token ON file_requests(token);
CREATE INDEX idx_file_requests_user_id ON file_requests(user_id);
```

**RLS:**
- `SELECT`: owner can read own; public can read active/non-expired requests by token
- `INSERT/UPDATE/DELETE`: owner only

---

### `upload_sessions`

Tracks state of chunked uploads. Cleaned up after completion or failure.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `file_name` | `text` | NO | — | intended filename |
| `mime_type` | `text` | NO | — | |
| `total_size` | `bigint` | NO | — | total file size in bytes |
| `total_chunks` | `integer` | NO | — | how many chunks expected |
| `uploaded_chunks` | `integer` | NO | `0` | how many chunks received |
| `chunk_size` | `integer` | NO | — | bytes per chunk |
| `temp_path` | `text` | YES | `null` | path in `temp-chunks` bucket |
| `target_folder_id` | `uuid` | YES | `null` | FK → `folders.id` |
| `status` | `text` | NO | `'in_progress'` | `'in_progress'` \| `'assembling'` \| `'complete'` \| `'failed'` |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE INDEX idx_upload_sessions_user_id ON upload_sessions(user_id);
CREATE INDEX idx_upload_sessions_status ON upload_sessions(status);
```

**RLS:** user can only read/write their own upload sessions.

---

### `team_spaces`

Shared workspaces for team collaboration.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `name` | `text` | NO | — | team/workspace name |
| `slug` | `text` | NO | — | UNIQUE, URL-safe identifier |
| `avatar_color` | `text` | YES | `null` | hex color for avatar bg |
| `owner_id` | `uuid` | NO | — | FK → `profiles.id` |
| `storage_used` | `bigint` | NO | `0` | auto-updated by trigger |
| `storage_quota` | `bigint` | NO | `21474836480` | bytes (default 20 GB) |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_team_spaces_slug ON team_spaces(slug);
CREATE INDEX idx_team_spaces_owner_id ON team_spaces(owner_id);
```

**Constraints:**
```sql
ALTER TABLE team_spaces ADD CONSTRAINT chk_slug_format
  CHECK (slug ~ '^[a-z0-9\-]+$' AND length(slug) BETWEEN 2 AND 60);
```

**RLS:**
- `SELECT`: any member of the team
- `UPDATE`: owner or admin member only
- `DELETE`: owner only

---

### `team_members`

Join table between `profiles` and `team_spaces` with role-based access.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `team_space_id` | `uuid` | NO | — | FK → `team_spaces.id` ON DELETE CASCADE |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `role` | `text` | NO | `'viewer'` | `'admin'` \| `'editor'` \| `'viewer'` |
| `invited_by` | `uuid` | YES | `null` | FK → `profiles.id` |
| `joined_at` | `timestamptz` | YES | `null` | null if invite not yet accepted |
| `invited_at` | `timestamptz` | NO | `now()` | |

**Role permissions:**
| Action | Admin | Editor | Viewer |
|---|---|---|---|
| View files | ✓ | ✓ | ✓ |
| Download files | ✓ | ✓ | ✓ |
| Upload files | ✓ | ✓ | ✗ |
| Delete files | ✓ | Own only | ✗ |
| Manage members | ✓ | ✗ | ✗ |
| Change settings | ✓ | ✗ | ✗ |

**Indexes:**
```sql
CREATE UNIQUE INDEX idx_team_members_unique ON team_members(team_space_id, user_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_team_space_id ON team_members(team_space_id);
```

**RLS:**
- `SELECT`: user can see members of teams they belong to
- `INSERT`: team admin only
- `UPDATE`: team admin can change roles
- `DELETE`: team admin or the member themselves (leave)

---

### `activity_logs`

Append-only audit trail. Never updated, only inserted.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | YES | `null` | FK → `profiles.id`; null = anonymous (share link access) |
| `team_space_id` | `uuid` | YES | `null` | FK → `team_spaces.id` |
| `file_id` | `uuid` | YES | `null` | FK → `files.id` ON DELETE SET NULL |
| `folder_id` | `uuid` | YES | `null` | FK → `folders.id` ON DELETE SET NULL |
| `action` | `text` | NO | — | see action types below |
| `meta` | `jsonb` | YES | `{}` | action-specific extra data |
| `ip_address` | `inet` | YES | `null` | |
| `user_agent` | `text` | YES | `null` | |
| `created_at` | `timestamptz` | NO | `now()` | |

**`action` values:**
```
upload        file_delete       folder_create    folder_delete
file_view     file_download     file_rename      file_move
file_restore  file_star         file_version     file_share
link_create   link_disable      link_access      member_invite
member_join   member_remove     member_role      space_create
```

**`meta` JSONB examples:**
```jsonc
// file_rename
{ "old_name": "report.pdf", "new_name": "Q3 Report Final.pdf" }

// file_move
{ "from_folder": "uuid", "to_folder": "uuid" }

// link_access
{ "share_token": "abc123", "via_password": true }

// member_role
{ "old_role": "viewer", "new_role": "editor" }
```

**Indexes:**
```sql
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_file_id ON activity_logs(file_id);
CREATE INDEX idx_activity_logs_team_space_id ON activity_logs(team_space_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

**RLS:**
- `SELECT`: user sees own activity; team admins see team activity; site admins see all
- `INSERT`: authenticated users (service role for anonymous events)
- No `UPDATE` or `DELETE` (append-only by policy)

---

### `file_comments`

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `file_id` | `uuid` | NO | — | FK → `files.id` ON DELETE CASCADE |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `content` | `text` | NO | — | max 2000 chars |
| `is_edited` | `boolean` | NO | `false` | |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE INDEX idx_file_comments_file_id ON file_comments(file_id);
CREATE INDEX idx_file_comments_user_id ON file_comments(user_id);
```

**Constraints:**
```sql
ALTER TABLE file_comments ADD CONSTRAINT chk_comment_length
  CHECK (length(content) BETWEEN 1 AND 2000);
```

**RLS:**
- `SELECT`: any user who can see the file
- `INSERT`: any user who can see the file
- `UPDATE/DELETE`: comment author only (within 24h for edit)

---

### `notifications`

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE; recipient |
| `type` | `text` | NO | — | see type values below |
| `title` | `text` | NO | — | short display title |
| `body` | `text` | YES | `null` | longer description |
| `data` | `jsonb` | YES | `{}` | deep-link data (file_id, space_id, etc.) |
| `is_read` | `boolean` | NO | `false` | |
| `created_at` | `timestamptz` | NO | `now()` | |

**`type` values:**
```
upload_complete   share_activity    comment_added
member_invited    member_joined     quota_warning
file_infected     link_expired      file_request_received
```

**Indexes:**
```sql
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

**RLS:** users can only read and update their own notifications.

---

### `api_keys`

Allows users to access FileFlow programmatically. Key is shown once on creation, then only the hash is stored.

| Column | Type | Nullable | Default | Notes |
|---|---|---|---|---|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK |
| `user_id` | `uuid` | NO | — | FK → `profiles.id` ON DELETE CASCADE |
| `name` | `text` | NO | — | user-defined label e.g. "CI pipeline" |
| `key_hash` | `text` | NO | — | bcrypt/argon2 hash of the full key |
| `key_prefix` | `text` | NO | — | first 8 chars for display e.g. `ff_live_a` |
| `scopes` | `text[]` | NO | `'{read,write}'` | `read` \| `write` \| `delete` \| `share` \| `admin` |
| `last_used_at` | `timestamptz` | YES | `null` | |
| `expires_at` | `timestamptz` | YES | `null` | null = never |
| `is_active` | `boolean` | NO | `true` | |
| `created_at` | `timestamptz` | NO | `now()` | |

**Indexes:**
```sql
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_key_prefix ON api_keys(key_prefix);
```

**RLS:** users can only read/manage their own API keys.

---

## Storage Buckets

| Bucket | Public | Max File Size | Allowed MIME Types |
|---|---|---|---|
| `files` | ❌ | 2 GB | all |
| `thumbnails` | ✅ | 5 MB | `image/*` |
| `avatars` | ✅ | 5 MB | `image/jpeg`, `image/png`, `image/webp` |
| `temp-chunks` | ❌ | 100 MB | all |

**Bucket RLS (Storage Policies):**

`files` bucket:
- `SELECT`: authenticated + owns the file record OR valid share token
- `INSERT`: authenticated + within storage quota
- `DELETE`: file owner OR admin

`thumbnails` bucket:
- `SELECT`: public (thumbnails are non-sensitive by design)
- `INSERT`: service role only (generated server-side)

`avatars` bucket:
- `SELECT`: public
- `INSERT/UPDATE`: user can only write to `avatars/{user_id}/*`

`temp-chunks` bucket:
- All operations: service role only (server-side chunked upload handling)

---

## Functions & Triggers

### Triggers

**`handle_new_user()`** — fires `AFTER INSERT ON auth.users`
Creates a corresponding `profiles` row automatically on signup.

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

**`update_storage_used()`** — fires `AFTER INSERT OR UPDATE OR DELETE ON files`
Keeps `profiles.storage_used` and `team_spaces.storage_used` in sync.

```sql
CREATE OR REPLACE FUNCTION update_storage_used()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET storage_used = storage_used + NEW.size WHERE id = NEW.user_id;
    IF NEW.team_space_id IS NOT NULL THEN
      UPDATE team_spaces SET storage_used = storage_used + NEW.size WHERE id = NEW.team_space_id;
    END IF;

  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET storage_used = storage_used - OLD.size WHERE id = OLD.user_id;
    IF OLD.team_space_id IS NOT NULL THEN
      UPDATE team_spaces SET storage_used = storage_used - OLD.size WHERE id = OLD.team_space_id;
    END IF;

  ELSIF TG_OP = 'UPDATE' AND OLD.size <> NEW.size THEN
    UPDATE profiles SET storage_used = storage_used + (NEW.size - OLD.size) WHERE id = NEW.user_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

**`soft_delete_folder_cascade()`** — fires `AFTER UPDATE ON folders` when `is_deleted` changes to `true`
Soft-deletes all child folders and files recursively.

```sql
CREATE OR REPLACE FUNCTION soft_delete_folder_cascade()
RETURNS trigger AS $$
BEGIN
  IF NEW.is_deleted = true AND OLD.is_deleted = false THEN
    -- cascade to child folders via materialized path
    UPDATE folders
      SET is_deleted = true, deleted_at = now()
      WHERE path LIKE NEW.path || '/%' AND is_deleted = false;

    -- cascade to files in this folder and all descendants
    UPDATE files
      SET is_deleted = true, deleted_at = now()
      WHERE folder_id IN (
        SELECT id FROM folders WHERE path LIKE NEW.path || '/%'
        UNION ALL SELECT NEW.id
      )
      AND is_deleted = false;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

**`set_updated_at()`** — fires `BEFORE UPDATE` on all tables with `updated_at`
```sql
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```
Apply to: `profiles`, `folders`, `files`, `upload_sessions`, `file_comments`, `team_spaces`

---

**`increment_file_version()`** — fires `BEFORE UPDATE ON files` when `storage_path` changes
Saves old version to `file_versions` and increments `version_count`.

```sql
CREATE OR REPLACE FUNCTION increment_file_version()
RETURNS trigger AS $$
BEGIN
  IF NEW.storage_path <> OLD.storage_path THEN
    INSERT INTO file_versions (file_id, user_id, version_number, storage_path, size, hash)
    VALUES (OLD.id, OLD.user_id, OLD.version_count, OLD.storage_path, OLD.size, OLD.hash);

    NEW.version_count = OLD.version_count + 1;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

### Database Functions (callable via RPC)

**`check_storage_quota(user_id uuid, file_size bigint)`**
Returns `true` if user has enough remaining quota for the given file size.

```sql
CREATE OR REPLACE FUNCTION check_storage_quota(p_user_id uuid, p_file_size bigint)
RETURNS boolean AS $$
DECLARE
  v_used bigint;
  v_quota bigint;
BEGIN
  SELECT storage_used, storage_quota INTO v_used, v_quota
  FROM profiles WHERE id = p_user_id;

  RETURN (v_used + p_file_size) <= v_quota;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

**`validate_share_token(token text)`**
Returns the share link row if token is valid and not expired/disabled. Used by public share pages.

```sql
CREATE OR REPLACE FUNCTION validate_share_token(p_token text)
RETURNS setof share_links AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM share_links
  WHERE token = p_token
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > now())
    AND (max_downloads IS NULL OR download_count < max_downloads);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

**`get_folder_tree(user_id uuid)`**
Returns full folder hierarchy as a nested structure for sidebar rendering.

```sql
CREATE OR REPLACE FUNCTION get_folder_tree(p_user_id uuid)
RETURNS TABLE(id uuid, parent_id uuid, name text, color text, path text, depth int) AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE tree AS (
    SELECT f.id, f.parent_id, f.name, f.color, f.path, 0 AS depth
    FROM folders f
    WHERE f.user_id = p_user_id AND f.parent_id IS NULL AND f.is_deleted = false

    UNION ALL

    SELECT f.id, f.parent_id, f.name, f.color, f.path, t.depth + 1
    FROM folders f
    INNER JOIN tree t ON f.parent_id = t.id
    WHERE f.is_deleted = false
  )
  SELECT * FROM tree ORDER BY path;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

### Scheduled Jobs (via pg_cron or Supabase Edge Functions)

| Job | Schedule | Description |
|---|---|---|
| `cleanup_expired_shares` | Every hour | Sets `is_active = false` on expired share links |
| `cleanup_trash` | Daily at 02:00 UTC | Permanently deletes files where `is_deleted = true AND deleted_at < now() - interval '30 days'` |
| `cleanup_upload_sessions` | Every 6 hours | Deletes failed/stale upload sessions older than 24h |
| `cleanup_expired_files` | Every hour | Deletes files where `expires_at < now()` |
| `send_quota_warnings` | Daily at 09:00 UTC | Inserts notification for users at >80% and >95% quota |

---

## Entity Relationship Diagram

```
auth.users
    │
    └──► profiles ◄──────────────────────── team_members ◄──► team_spaces
              │                                                      │
              │                                                      │
              ├──► folders (self-ref parent_id) ◄────────────────────┤
              │         │                                             │
              │         └──► files ◄────────────────────────────────-┘
              │                │
              │                ├──► file_versions
              │                ├──► file_tags
              │                ├──► file_comments
              │                └──► activity_logs
              │
              ├──► share_links ──► (file or folder)
              ├──► file_requests ──► (folder)
              ├──► upload_sessions
              ├──► notifications
              └──► api_keys
```

---

## Migration Order

```
001_extensions.sql          -- enable uuid-ossp, pgcrypto, pg_trgm, pg_cron
002_profiles.sql            -- profiles table + handle_new_user trigger
003_team_spaces.sql         -- team_spaces + team_members
004_folders.sql             -- folders table + soft delete trigger
005_files.sql               -- files table + storage trigger + version trigger
006_file_versions.sql       -- file_versions table
007_file_tags.sql           -- file_tags table
008_share_links.sql         -- share_links table
009_file_requests.sql       -- file_requests table
010_upload_sessions.sql     -- upload_sessions table
011_activity_logs.sql       -- activity_logs table
012_file_comments.sql       -- file_comments table
013_notifications.sql       -- notifications table
014_api_keys.sql            -- api_keys table
015_functions.sql           -- all RPC functions
016_rls_policies.sql        -- all RLS policies
017_storage_buckets.sql     -- bucket creation + storage policies
018_scheduled_jobs.sql      -- pg_cron job registration
019_seed.sql                -- (dev only) seed data
```