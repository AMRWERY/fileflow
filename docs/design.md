# FileFlow — Design System for Stitch

## Design Philosophy

**Aesthetic Direction:** Dark enterprise utility — the visual language of tools that professionals trust. Not a consumer photo app, not a generic SaaS dashboard. Think: the precision of Figma's sidebar meets the density of Linear's issue list meets the calm confidence of Vercel's deploy panel. Every pixel is intentional. Nothing decorative unless it earns its place.

**Core Principle:** Files are work. The UI should feel like a high-performance cockpit — immediate, legible, zero friction. Darkness reduces eye strain during long sessions. Color is strictly functional.

---

## Color Palette

### Background Scale (Dark)
```
--color-bg-base:      #0A0A0B   /* True near-black, canvas */
--color-bg-elevated:  #111113   /* Cards, panels */
--color-bg-overlay:   #18181C   /* Modals, dropdowns */
--color-bg-subtle:    #1E1E24   /* Hover states, selected rows */
--color-bg-muted:     #242429   /* Input fields, code blocks */
```

### Border Scale
```
--color-border-faint:  #1F1F26   /* Structural dividers */
--color-border-base:   #2A2A35   /* Card borders, input borders */
--color-border-strong: #3A3A48   /* Active/focused borders */
```

### Text Scale
```
--color-text-primary:   #F0F0F5   /* Headlines, primary content */
--color-text-secondary: #9898A8   /* Labels, secondary info */
--color-text-tertiary:  #5A5A6E   /* Placeholders, disabled */
--color-text-inverse:   #0A0A0B   /* Text on light/accent bg */
```

### Accent — Electric Indigo
```
--color-accent-primary:    #6B5CE7   /* Primary actions, links, highlights */
--color-accent-hover:      #7C6FF0   /* Hover state */
--color-accent-active:     #5A4DD4   /* Active/pressed state */
--color-accent-subtle:     #6B5CE714 /* Subtle tint backgrounds */
--color-accent-border:     #6B5CE740 /* Accent-colored borders */
```

### Semantic Colors
```
--color-success:        #22C55E   /* Upload complete, clean scan */
--color-success-subtle: #22C55E12
--color-warning:        #F59E0B   /* Quota warning, expiry near */
--color-warning-subtle: #F59E0B12
--color-error:          #EF4444   /* Delete, infected, failed */
--color-error-subtle:   #EF444412
--color-info:           #38BDF8   /* Info states, links */
--color-info-subtle:    #38BDF812
```

### File Type Color Coding
```
--color-type-image:    #EC4899   /* Pink — images */
--color-type-video:    #8B5CF6   /* Purple — video */
--color-type-audio:    #06B6D4   /* Cyan — audio */
--color-type-doc:      #3B82F6   /* Blue — documents */
--color-type-sheet:    #10B981   /* Green — spreadsheets */
--color-type-archive:  #F59E0B   /* Amber — zips */
--color-type-code:     #F97316   /* Orange — code files */
--color-type-other:    #6B7280   /* Gray — unknown */
```

### Special
```
--color-upload-active:  #6B5CE7   /* Dropzone active state */
--color-progress-track: #1E1E24
--color-progress-fill:  #6B5CE7
--color-progress-glow:  #6B5CE760
--color-starred:        #F59E0B   /* Star icon active */
```

---

## Typography

### Font Stack
```
--font-display:   'Geist', 'DM Sans', system-ui, sans-serif
--font-body:      'Geist', 'DM Sans', system-ui, sans-serif
--font-mono:      'Geist Mono', 'JetBrains Mono', monospace
```

> **Import:** Use `https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap` as fallback if Geist unavailable.

### Type Scale
```
--text-xs:    11px / line-height: 16px / letter-spacing: 0.02em
--text-sm:    12px / line-height: 18px / letter-spacing: 0.01em
--text-base:  13px / line-height: 20px / letter-spacing: 0
--text-md:    14px / line-height: 22px / letter-spacing: 0
--text-lg:    16px / line-height: 24px / letter-spacing: -0.01em
--text-xl:    18px / line-height: 28px / letter-spacing: -0.02em
--text-2xl:   22px / line-height: 32px / letter-spacing: -0.03em
--text-3xl:   28px / line-height: 36px / letter-spacing: -0.04em
```

### Font Weights
```
--weight-regular:  400
--weight-medium:   500
--weight-semibold: 600
--weight-bold:     700
```

### Usage Rules
- Page titles: `text-xl, weight-semibold, text-primary`
- Section labels: `text-xs, weight-semibold, text-tertiary, letter-spacing: 0.08em, UPPERCASE`
- Body content: `text-base, weight-regular, text-secondary`
- File names: `text-sm, weight-medium, text-primary`
- File meta (size, date): `text-xs, weight-regular, text-tertiary, font-mono`
- Button labels: `text-sm, weight-medium`
- Input values: `text-sm, weight-regular, text-primary`
- Code / paths: `font-mono, text-xs, text-secondary`

---

## Spacing System

Base unit: **4px**

```
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
```

### Component Spacing Standards
- Sidebar width: **220px** (collapsed: 52px)
- Header height: **48px**
- Mobile tab bar height: **56px**
- Input height (default): **34px**
- Button height (default): **32px**
- Button height (large): **38px**
- Table row height: **40px**
- File card (grid): **180px × 160px**
- File card (list row): **40px tall**
- Modal max-width: **520px**
- Panel padding: `space-4` (16px)
- Card padding: `space-3` (12px)

---

## Border Radius

```
--radius-sm:   4px    /* Tags, badges, inputs */
--radius-md:   6px    /* Buttons, cards */
--radius-lg:   10px   /* Modals, panels */
--radius-xl:   14px   /* Floating elements, sheets */
--radius-full: 9999px /* Pills, avatars */
```

---

## Shadows & Elevation

```
--shadow-sm:     0 1px 3px rgba(0,0,0,0.4)
--shadow-md:     0 4px 12px rgba(0,0,0,0.5)
--shadow-lg:     0 8px 32px rgba(0,0,0,0.6)
--shadow-modal:  0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)
--shadow-accent: 0 0 20px rgba(107,92,231,0.3)
```

---

## Iconography

**Icon Library:** Lucide Icons (outline style, stroke-width: 1.5)

### Icon Sizes
```
--icon-xs:  12px  /* Inline indicators */
--icon-sm:  14px  /* Compact buttons, table cells */
--icon-md:  16px  /* Default */
--icon-lg:  20px  /* Feature icons, empty states */
--icon-xl:  24px  /* Nav icons */
--icon-2xl: 32px  /* Illustration-like contexts */
```

### File Type Icons
Each file type gets both a color and a specific icon:
- Images: `image` icon, `--color-type-image`
- Video: `video` icon, `--color-type-video`
- Audio: `music` icon, `--color-type-audio`
- PDF: `file-text` icon, `--color-type-doc`
- Word/Doc: `file-text` icon, `--color-type-doc`
- Spreadsheet: `table` icon, `--color-type-sheet`
- ZIP/Archive: `archive` icon, `--color-type-archive`
- Code: `code` icon, `--color-type-code`
- Other: `file` icon, `--color-type-other`

---

## Components

### Buttons

**Primary Button**
- Background: `--color-accent-primary`
- Text: white
- Hover: `--color-accent-hover`
- Active: `--color-accent-active`
- Height: 32px, padding: 0 12px
- Border-radius: `--radius-md`
- Font: `text-sm, weight-medium`

**Secondary Button**
- Background: `--color-bg-muted`
- Border: 1px solid `--color-border-base`
- Text: `--color-text-primary`
- Hover background: `--color-bg-subtle`
- Same sizing as primary

**Ghost Button**
- Background: transparent
- Text: `--color-text-secondary`
- Hover background: `--color-bg-subtle`
- Hover text: `--color-text-primary`

**Danger Button**
- Background: `--color-error`
- Text: white
- Hover: darken 8%

**Icon Button**
- Size: 28px × 28px
- Background: transparent
- Hover background: `--color-bg-subtle`
- Border-radius: `--radius-md`

### Inputs

**Text Input**
- Background: `--color-bg-muted`
- Border: 1px solid `--color-border-base`
- Focus border: `--color-accent-primary`
- Focus box-shadow: `0 0 0 2px --color-accent-subtle`
- Text: `--color-text-primary`
- Placeholder: `--color-text-tertiary`
- Height: 34px
- Padding: 0 10px
- Border-radius: `--radius-sm`

**Search Input**
- Same as text input but with search icon prefix
- Background: `--color-bg-elevated`
- Wider focus ring animation

### Dropzone

**Default State**
- Background: `--color-bg-elevated`
- Border: 2px dashed `--color-border-strong`
- Border-radius: `--radius-lg`
- Center content: icon + text

**Hover/Drag-over State**
- Background: `--color-accent-subtle`
- Border color: `--color-accent-primary`
- Border style: solid
- Box-shadow: `0 0 0 4px --color-accent-border`
- Subtle scale transform: scale(1.005)
- Icon animates upward (4px translateY)

**Uploading State**
- Shows upload queue within the zone
- Progress bars visible

### Progress Bar

- Track: `--color-progress-track`, height: 3px, radius: full
- Fill: `--color-accent-primary`
- Active fill: gradient from `--color-accent-active` to `--color-accent-primary`
- Glowing fill (uploading): box-shadow with `--color-progress-glow`
- Animated shimmer effect on active upload

### File Cards (Grid View)

```
Width: 160px, Height: 180px
Background: --color-bg-elevated
Border: 1px solid --color-border-faint
Border-radius: --radius-md
Overflow: hidden
```

**Thumbnail Area** (top 110px):
- Image/video: actual thumbnail
- Other types: large centered file type icon on color-tinted background
- Color tint: file type color at 8% opacity

**Info Area** (bottom 70px):
- File name: `text-sm, weight-medium, text-primary`, truncated, 1 line
- File size: `text-xs, text-tertiary, font-mono`
- More options button (⋯): appears on hover, top-right corner

**States:**
- Hover: border color → `--color-border-strong`, subtle lift shadow
- Selected: border color → `--color-accent-primary`, subtle accent background
- Uploading: show progress overlay on thumbnail area

### File Rows (List View)

Height: 40px, full width
Columns: checkbox | type icon | name | size | modified | shared | actions

- Background: transparent
- Hover: `--color-bg-subtle`
- Selected: `--color-accent-subtle`, border-left 2px `--color-accent-primary`
- Borders: 1px `--color-border-faint` between rows

### Sidebar Navigation

Width: 220px
Background: `--color-bg-elevated`
Right border: 1px `--color-border-faint`

**Nav Items:**
- Height: 32px
- Padding: 0 12px
- Border-radius: `--radius-md`
- Icon + label layout
- Default: text-secondary
- Hover: text-primary, background `--color-bg-subtle`
- Active: text-primary, background `--color-accent-subtle`, left accent bar 2px

**Section Labels:**
- `text-xs, weight-semibold, text-tertiary, uppercase, letter-spacing: 0.08em`
- Margin: 16px top, 8px bottom

**Storage Quota Bar at bottom:**
- Compact progress bar
- Label: "X.X GB of Y GB used"
- Warning color when > 80%

### Upload Queue Panel

Floating panel (bottom-right) or inline in dropzone

Each queue item:
- File name (truncated) + type icon
- Progress bar (3px, full width)
- Percentage + speed label (right-aligned, monospace)
- Pause / Cancel icon buttons
- Status badge: uploading (pulse dot) | complete (✓ green) | error (✗ red) | paused

### Modals

```
Backdrop: rgba(0,0,0,0.7) blur(4px)
Container: --color-bg-overlay, --shadow-modal
Border: 1px solid --color-border-base
Border-radius: --radius-lg
Max-width: 520px
```

Header: title (text-lg, weight-semibold) + close button
Footer: action buttons right-aligned, with cancel ghost + primary confirm

### Badges / Tags

```
Height: 20px, padding: 0 6px
Border-radius: --radius-sm
Font: text-xs, weight-medium
```

Types:
- Neutral: `--color-bg-muted` bg, `--color-text-secondary` text
- Success: `--color-success-subtle` bg, `--color-success` text
- Warning: `--color-warning-subtle` bg, `--color-warning` text
- Error: `--color-error-subtle` bg, `--color-error` text
- Accent: `--color-accent-subtle` bg, `--color-accent-primary` text

### Tooltips

```
Background: --color-text-primary (near-white)
Text: --color-text-inverse (dark)
Font: text-xs, weight-medium
Padding: 4px 8px
Border-radius: --radius-sm
Max-width: 220px
Delay: 400ms
```

---

## Layout Patterns

### Web App Shell
```
┌──────────────────────────────────────────────────────┐
│  HEADER (48px) — logo | search | user avatar          │
├──────────┬───────────────────────────────────────────┤
│          │                                            │
│ SIDEBAR  │           MAIN CONTENT AREA               │
│ (220px)  │                                            │
│          │                                            │
│          │                                            │
│  quota   │                                            │
└──────────┴───────────────────────────────────────────┘
```

### Mobile App Shell
```
┌─────────────────────────┐
│  HEADER (56px)           │
├─────────────────────────┤
│                          │
│    MAIN CONTENT          │
│                          │
│                    [FAB] │
├─────────────────────────┤
│  TAB BAR (56px)          │
└─────────────────────────┘
```

### File Grid Layout
- 4 columns on wide screens, 3 on medium, 2 on narrow
- Gap: 12px
- Auto-fill grid with `minmax(150px, 1fr)`

### Empty States
- Large icon (40px, `--color-text-tertiary`)
- Title: `text-lg, weight-semibold, text-primary`
- Description: `text-sm, text-secondary`, centered, max-width 300px
- CTA button (primary)
- Subtle background pattern (low-opacity grid dots or lines)

---

## Motion & Animation

**Duration Scale**
```
--duration-fast:   100ms
--duration-base:   200ms
--duration-slow:   300ms
--duration-slower: 500ms
```

**Easing**
```
--ease-out:    cubic-bezier(0.0, 0, 0.2, 1)
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

**Key Animations**
- Route transitions: fade + 8px translateY, `--duration-slow, --ease-out`
- Modal open: fade + scale from 0.96, `--duration-base, --ease-spring`
- Dropdown open: fade + 4px translateY, `--duration-fast`
- Upload progress: smooth width transition, `--duration-base, linear`
- File card hover: translateY(-2px), `--duration-fast, --ease-out`
- Dropzone drag-over: `--duration-fast, --ease-out`
- Skeleton loading: shimmer animation (left-to-right gradient sweep, 1.5s loop)
- Upload complete checkmark: draw stroke animation, 300ms

---

## Mobile-Specific Design (Ionic)

### Ionic Theme Overrides
```css
--ion-background-color: #0A0A0B;
--ion-surface-color: #111113;
--ion-color-primary: #6B5CE7;
--ion-color-primary-contrast: #ffffff;
--ion-text-color: #F0F0F5;
--ion-toolbar-background: #111113;
--ion-toolbar-border-color: #1F1F26;
--ion-tab-bar-background: #111113;
--ion-tab-bar-border-color: #1F1F26;
--ion-item-background: #111113;
--ion-card-background: #18181C;
```

### Mobile Upload FAB
- Size: 52px × 52px
- Background: `--color-accent-primary`
- Icon: `upload-cloud` (Lucide), white, 20px
- Box shadow: `0 4px 16px rgba(107,92,231,0.5)`
- Position: bottom-right, above tab bar
- Press: scale(0.94), haptic feedback

### Action Sheets (Mobile)
- Background: `--color-bg-overlay`
- Border-radius top: `--radius-xl`
- Handle bar: 3px × 32px, `--color-border-strong`, centered
- Action items: 56px tall, icon + label layout
- Destructive actions: `--color-error`

### Bottom Sheet (Upload in Progress)
- Peek height: 72px (shows file count + overall progress)
- Expanded: 60% screen height, full upload queue
- Drag handle for expand/collapse

---

## Specific Page Design Notes

### Auth Pages
- Centered card layout (max-width: 400px)
- Logo mark top-center
- Background: `--color-bg-base` with subtle radial gradient (accent color, very low opacity, from center)
- No sidebar, no header — pure focus

### Dashboard / Home
- Greeting + stats row at top (3 stat cards: total files, storage used, recent activity)
- Recent files section (horizontal scroll on mobile, grid on web)
- Quick upload CTA if no files yet

### File Browser (main page)
- Toolbar: view toggle (grid/list) | sort dropdown | filter button | upload button
- Breadcrumb below toolbar
- File grid/list fills remaining space
- Batch action bar slides up from bottom when items selected

### File Preview Modal
- Full-screen overlay on mobile
- Large modal on web (max-width: 800px)
- Image: centered, zoomable
- PDF: embedded viewer
- Video/Audio: native player
- Code/Text: syntax-highlighted code block
- Metadata panel: collapsible right panel on web, bottom sheet on mobile

### Share Modal
- Tab layout: "Create Link" | "Manage Links"
- Link card: shows token URL, copy button, permission badge, expiry
- Password toggle, expiry date picker, max downloads input
- QR code option (collapsible)

### Settings Pages
- Left nav (sub-navigation) on web
- Section list on mobile
- Clean form layout, section headers

### Admin Dashboard
- Stats row: total users, total files, total storage, uploads today
- Charts: uploads over time (line), storage by type (donut)
- Recent users table
- Flagged files section

---

## Accessibility

- All interactive elements: minimum 44px touch target (mobile), 32px (web)
- Focus rings: 2px `--color-accent-primary` offset 2px, visible on keyboard nav
- Color is never the sole indicator of state (always icon or text too)
- ARIA labels on icon-only buttons
- Contrast ratios: primary text on bg ≥ 7:1, secondary ≥ 4.5:1

---

## Do Not

- No white backgrounds
- No rounded corners over 14px on core UI (cards, buttons)
- No gradients on text (except the logo mark only)
- No animations on page content during active upload (reduce distraction)
- No red on interactive/primary elements (red = danger/error only)
- No green on interactive/primary elements (green = success only)
- No purple gradients on backgrounds (accent is for buttons and highlights only)
- No card shadows when cards already have visible borders
