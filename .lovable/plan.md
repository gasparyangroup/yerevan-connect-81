
# Plan: CMS Admin Panel with Supabase for "Mer Yerevan"

## Summary

This plan outlines the complete implementation of a content management system (CMS) for the "Mer Yerevan" urban projects platform. The admin panel will allow authorized users to manage all website content, projects, navigation, and settings through an intuitive interface backed by Supabase.

---

## 1. Content Inventory (Analysis Results)

### Identified Components and Hardcoded Content:

| Component | Hardcoded Texts | Images | Data Arrays |
|-----------|-----------------|--------|-------------|
| **Header.tsx** | Logo "Մdelays Երdelays", subtitle "Urban Projects Platform", button "Suggest Idea" | None | `navLinks` (3 items), `languages` (AM, RU, EN) |
| **Hero.tsx** | "Building the city", description text | Animated particles | `filters` (3 items), `animatedTexts` (4 phrases) |
| **Footer.tsx** | Brand description, "Made with ❤ in Yerevan", contact info (email, phone, address), copyright | Logo | `Quick Links` (4 items), social links |
| **AboutModal.tsx** | Title, description texts, stats (50+, 10K+, ₽2B) | Logo | Statistics array |
| **ContactModal.tsx** | Form titles, descriptions, labels | None | None |
| **SuggestionModal.tsx** | Title, description, form labels, success message | None | None |
| **MapSection.tsx** | Section heading, description, button text | SVG map | `mapPins` (6 positions) |
| **ProjectsGrid.tsx** | Section titles for each stage | None | None |
| **ProjectCard.tsx** | Stage badge labels, button texts | From projects data | `stageBadgeConfig` |

### Projects Data (src/data/projects.ts):

- 6 projects with full structure
- Fields: id, title, titleAm, location, locationAm, description, descriptionAm, stage, image, gallery, budget, votes, votingOptions, documents, presentationUrl

### Media Files:

| File | Location | Usage |
|------|----------|-------|
| komitas-1.png | src/assets/ | Komitas Square main image |
| komitas-2.png | src/assets/ | Komitas Square gallery |
| komitas-3.png | src/assets/ | Komitas Square gallery |
| favicon.ico | public/ | Browser favicon |
| placeholder.svg | public/ | Fallback image |

---

## 2. Database Structure

### Table: `site_content`

Stores all section content as JSON.

```sql
CREATE TABLE public.site_content (
  id TEXT PRIMARY KEY,
  section_name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read visible content
CREATE POLICY "Public can read visible content"
  ON public.site_content FOR SELECT
  USING (is_visible = true);

-- Only admins can modify
CREATE POLICY "Admins can manage content"
  ON public.site_content FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

**Initial Data:**

```sql
INSERT INTO public.site_content (id, section_name, content) VALUES

-- Header Section
('header', 'Header', '{
  "logo_text": "Մdelays Delays",
  "logo_letter": "Մ",
  "subtitle": "Urban Projects Platform",
  "suggest_button_text": "Suggest Idea"
}'),

-- Hero Section
('hero', 'Hero Section', '{
  "heading_prefix": "Building the city",
  "animated_texts": ["of our dreams", "for people", "together", "step by step"],
  "description": "Join thousands of citizens in shaping Yerevan''s future. Fund projects, vote on designs, and watch your city transform.",
  "filters": [
    {"id": "sponsorship", "label": "Sponsorship", "icon": "Building2"},
    {"id": "concept", "label": "Concept Search", "icon": "Palette"},
    {"id": "voting", "label": "Voting", "icon": "Vote"}
  ]
}'),

-- About Modal
('about', 'About Modal', '{
  "title": "About Մdelays Delays",
  "subtitle": "Urban Projects Platform",
  "description_line1": "Մdelay Երdelays (Our Yerevan) is a civic technology platform that connects citizens, sponsors, and architects to transform urban spaces across Armenia''s capital.",
  "description_line2": "Our mission is to democratize urban development by giving every citizen a voice in shaping their city. From funding public art installations to voting on park designs, we believe that the best ideas for Yerevan come from the people who live here.",
  "stats": [
    {"value": "50+", "label": "Projects"},
    {"value": "10K+", "label": "Citizens"},
    {"value": "₽2B", "label": "Funded"}
  ]
}'),

-- Map Section
('map', 'Map Section', '{
  "heading": "Explore Projects",
  "heading_gradient": "Across the City",
  "description": "Click on any pin to discover urban improvement projects happening in different neighborhoods of Yerevan. Every corner of our city has a story waiting to be told.",
  "button_text": "View All Projects"
}'),

-- Footer
('footer', 'Footer', '{
  "brand_description": "A civic platform connecting citizens, sponsors, and architects to build a better Yerevan together.",
  "tagline": "Made with ❤ in Yerevan",
  "copyright": "© 2024 Մdelays Delays. All rights reserved.",
  "quick_links": [
    {"label": "How it Works", "url": "#"},
    {"label": "For Sponsors", "url": "#"},
    {"label": "For Architects", "url": "#"},
    {"label": "Success Stories", "url": "#"}
  ],
  "legal_links": [
    {"label": "Privacy Policy", "url": "#"},
    {"label": "Terms of Service", "url": "#"}
  ]
}'),

-- Contact Modal
('contact_modal', 'Contact Form', '{
  "titles": {
    "sponsor": "Become a Sponsor",
    "architect": "Submit as Architect",
    "vote": "Confirm Your Vote"
  },
  "descriptions": {
    "sponsor": "Leave your contact details and our team will reach out to discuss sponsorship opportunities.",
    "architect": "Interested in contributing your architectural vision? Share your details and we''ll connect you with the project team.",
    "vote": "Confirm your identity to cast your vote. Your information helps ensure one vote per citizen."
  },
  "success_title": "Thank You!",
  "success_message": "We''ve received your information and will be in touch soon."
}'),

-- Suggestion Modal
('suggestion_modal', 'Suggestion Form', '{
  "title": "Suggest an Idea",
  "subtitle": "Share your vision for a better Yerevan",
  "success_title": "Idea Submitted!",
  "success_message": "Thank you for contributing to Yerevan''s future. Our team will review your suggestion and get back to you soon.",
  "disclaimer": "By submitting, you agree to our community guidelines and terms of service."
}');
```

---

### Table: `projects`

Stores all urban projects.

```sql
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_am TEXT,
  location TEXT NOT NULL,
  location_am TEXT,
  description TEXT NOT NULL,
  description_am TEXT,
  stage TEXT NOT NULL CHECK (stage IN ('sponsorship', 'concept', 'voting')),
  image_url TEXT NOT NULL,
  gallery JSONB DEFAULT '[]',
  budget BIGINT,
  votes INTEGER DEFAULT 0,
  voting_options JSONB DEFAULT '[]',
  documents JSONB DEFAULT '[]',
  presentation_url TEXT,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible projects"
  ON public.projects FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

---

### Table: `navigation_items`

Stores header and footer navigation links.

```sql
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL CHECK (location IN ('header', 'footer_quick', 'footer_legal')),
  label TEXT NOT NULL,
  label_am TEXT,
  label_ru TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read visible navigation"
  ON public.navigation_items FOR SELECT
  USING (is_visible = true);

CREATE POLICY "Admins can manage navigation"
  ON public.navigation_items FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

**Initial Data:**

```sql
INSERT INTO public.navigation_items (location, label, url, sort_order) VALUES
('header', 'Sponsorship for Construction', '#sponsorship', 1),
('header', 'Concept Search', '#concept', 2),
('header', 'Voting', '#voting', 3),
('footer_quick', 'How it Works', '#', 1),
('footer_quick', 'For Sponsors', '#', 2),
('footer_quick', 'For Architects', '#', 3),
('footer_quick', 'Success Stories', '#', 4),
('footer_legal', 'Privacy Policy', '#', 1),
('footer_legal', 'Terms of Service', '#', 2);
```

---

### Table: `site_settings`

Stores global configuration.

```sql
CREATE TABLE public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

**Initial Data:**

```sql
INSERT INTO public.site_settings (key, value) VALUES
('contact', '{
  "email": "info@meryerevan.am",
  "phone": "+374 10 123 456",
  "address": "Northern Avenue 1, Yerevan, Armenia"
}'),
('social', '{
  "facebook": "",
  "instagram": "",
  "twitter": "@MerYerevan",
  "telegram": ""
}'),
('seo', '{
  "site_title": "Մdelays Delays | Urban Projects Platform",
  "meta_description": "Join thousands of citizens in shaping Yerevan''s future. Fund urban projects, vote on designs, and watch your city transform.",
  "og_image": "https://lovable.dev/opengraph-image-p98pqg.png",
  "canonical_url": "https://meryerevan.am"
}'),
('languages', '{
  "available": ["AM", "RU", "EN"],
  "default": "EN"
}'),
('telegram_notifications', '{
  "enabled": true,
  "bot_token": "",
  "chat_id": ""
}');
```

---

### Table: `user_roles`

For admin access control.

```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

---

### Storage Bucket: `images`

```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Admins can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images' AND public.has_role(auth.uid(), 'admin'));
```

---

## 3. Section Editors

### HeroEditor (id: 'hero')

**Fields:**
- `heading_prefix` (text) - "Building the city"
- `animated_texts` (array of strings) - ["of our dreams", "for people", ...]
- `description` (textarea) - Main description text
- `filters` (array of objects):
  - `id` (text)
  - `label` (text)
  - `icon` (select: Building2, Palette, Vote)

### AboutEditor (id: 'about')

**Fields:**
- `title` (text) - "About Մdelays Delays"
- `subtitle` (text) - "Urban Projects Platform"
- `description_line1` (textarea)
- `description_line2` (textarea)
- `stats` (array of objects):
  - `value` (text) - "50+"
  - `label` (text) - "Projects"

### HeaderEditor (id: 'header')

**Fields:**
- `logo_text` (text) - "Մdelays Delays"
- `logo_letter` (text) - "Մ"
- `subtitle` (text) - "Urban Projects Platform"
- `suggest_button_text` (text) - "Suggest Idea"

### FooterEditor (id: 'footer')

**Fields:**
- `brand_description` (textarea)
- `tagline` (text) - "Made with ❤ in Yerevan"
- `copyright` (text)
- `quick_links` (array):
  - `label` (text)
  - `url` (text)
- `legal_links` (array):
  - `label` (text)
  - `url` (text)

### MapEditor (id: 'map')

**Fields:**
- `heading` (text) - "Explore Projects"
- `heading_gradient` (text) - "Across the City"
- `description` (textarea)
- `button_text` (text)

### ContactModalEditor (id: 'contact_modal')

**Fields:**
- `titles` (object):
  - `sponsor` (text)
  - `architect` (text)
  - `vote` (text)
- `descriptions` (object):
  - `sponsor` (textarea)
  - `architect` (textarea)
  - `vote` (textarea)
- `success_title` (text)
- `success_message` (text)

### SuggestionModalEditor (id: 'suggestion_modal')

**Fields:**
- `title` (text)
- `subtitle` (text)
- `success_title` (text)
- `success_message` (textarea)
- `disclaimer` (text)

---

## 4. Components to Create

### Core Components:

- [ ] `src/components/admin/ProtectedRoute.tsx` - Route guard for admin pages
- [ ] `src/components/admin/AdminLayout.tsx` - Admin layout with sidebar
- [ ] `src/components/admin/AdminSidebar.tsx` - Navigation sidebar
- [ ] `src/components/admin/ImageUploader.tsx` - Upload images to Supabase Storage
- [ ] `src/components/admin/ArrayFieldEditor.tsx` - Dynamic array field with drag-and-drop
- [ ] `src/components/admin/RichTextEditor.tsx` - Text editing (optional)

### Section Editors:

- [ ] `src/components/admin/editors/HeroEditor.tsx`
- [ ] `src/components/admin/editors/HeaderEditor.tsx`
- [ ] `src/components/admin/editors/FooterEditor.tsx`
- [ ] `src/components/admin/editors/AboutEditor.tsx`
- [ ] `src/components/admin/editors/MapEditor.tsx`
- [ ] `src/components/admin/editors/ContactModalEditor.tsx`
- [ ] `src/components/admin/editors/SuggestionModalEditor.tsx`

### Project Management:

- [ ] `src/components/admin/ProjectList.tsx` - List all projects
- [ ] `src/components/admin/ProjectEditor.tsx` - Create/edit project form
- [ ] `src/components/admin/GalleryManager.tsx` - Manage project gallery

### Settings:

- [ ] `src/components/admin/SettingsEditor.tsx` - Site settings form
- [ ] `src/components/admin/NavigationEditor.tsx` - Menu items editor
- [ ] `src/components/admin/MediaLibrary.tsx` - Browse uploaded images

---

## 5. Hooks to Create

- [ ] `src/hooks/useContent.ts` - Fetch section content by ID
- [ ] `src/hooks/useProjects.ts` - Fetch and manage projects
- [ ] `src/hooks/useNavigation.ts` - Fetch navigation items
- [ ] `src/hooks/useSettings.ts` - Fetch site settings
- [ ] `src/hooks/useAuth.ts` - Authentication state
- [ ] `src/hooks/useAdmin.ts` - Check admin role
- [ ] `src/hooks/useImageUpload.ts` - Upload files to Storage

---

## 6. Admin Pages

- [ ] `/admin` - Login page (if not authenticated)
- [ ] `/admin/dashboard` - Overview with quick stats
- [ ] `/admin/sections` - List of content sections
- [ ] `/admin/sections/:id` - Edit specific section
- [ ] `/admin/projects` - Projects list
- [ ] `/admin/projects/new` - Create project
- [ ] `/admin/projects/:id` - Edit project
- [ ] `/admin/navigation` - Manage menu items
- [ ] `/admin/media` - Media library
- [ ] `/admin/settings` - Global settings (contact, SEO, social)
- [ ] `/admin/users` - User role management

---

## 7. Component Migration Plan

Update each component to load content from Supabase:

### Pattern:

```tsx
// Before:
const heading = "Building the city";

// After:
const { content, isLoading } = useContent('hero');
const heading = content?.heading_prefix || "Building the city"; // fallback
```

### Files to Update:

| File | Hook | Section ID |
|------|------|------------|
| `Header.tsx` | `useContent('header')` + `useNavigation('header')` | header |
| `Hero.tsx` | `useContent('hero')` | hero |
| `Footer.tsx` | `useContent('footer')` + `useNavigation('footer_*')` + `useSettings('contact')` | footer |
| `AboutModal.tsx` | `useContent('about')` | about |
| `ContactModal.tsx` | `useContent('contact_modal')` | contact_modal |
| `SuggestionModal.tsx` | `useContent('suggestion_modal')` | suggestion_modal |
| `MapSection.tsx` | `useContent('map')` | map |
| `ProjectsGrid.tsx` | `useProjects()` | - |
| `ProjectCard.tsx` | Props from `useProjects()` | - |
| `Index.tsx` | `useProjects()` | - |

---

## 8. Implementation Order

### Phase 1: Database Setup
1. Enable Supabase/Lovable Cloud
2. Create all tables with RLS policies
3. Create Storage bucket 'images'
4. Insert initial data
5. Create first admin user manually

### Phase 2: Authentication
6. Create `/admin` login page
7. Implement `useAuth` hook
8. Implement `useAdmin` hook
9. Create `ProtectedRoute` component

### Phase 3: Admin Infrastructure
10. Create `AdminLayout` with sidebar
11. Create `/admin/dashboard` page
12. Implement `ImageUploader` component
13. Implement `ArrayFieldEditor` component

### Phase 4: Content Editors (One by One)
14. `HeroEditor` + migrate `Hero.tsx`
15. `HeaderEditor` + migrate `Header.tsx`
16. `FooterEditor` + migrate `Footer.tsx`
17. `AboutEditor` + migrate `AboutModal.tsx`
18. `MapEditor` + migrate `MapSection.tsx`
19. Modal editors + migrate modal components

### Phase 5: Projects Management
20. Create `ProjectList` page
21. Create `ProjectEditor` form
22. Implement `GalleryManager`
23. Migrate `ProjectsGrid` and `ProjectCard`
24. Upload Komitas images to Storage

### Phase 6: Navigation & Settings
25. `NavigationEditor` page
26. `SettingsEditor` page
27. `MediaLibrary` page

### Phase 7: Polish
28. Add loading states to all components
29. Implement error boundaries
30. Test all flows
31. Create documentation

---

## 9. Potential Challenges

| Challenge | Solution |
|-----------|----------|
| **Image migration** | Upload existing assets to Storage, update URLs in DB |
| **Array fields** | Use drag-and-drop library (dnd-kit) for reordering |
| **Type safety** | Create TypeScript interfaces for all JSONB structures |
| **Fallbacks** | Always provide default values when content is loading |
| **Real-time updates** | Consider Supabase Realtime for instant preview |
| **Multi-language** | Store translations in same JSONB with language keys |

---

## 10. Readiness Checklist

- [ ] All sections identified and documented
- [ ] JSONB structure for each section defined
- [ ] SQL for table creation ready
- [ ] SQL for initial data ready
- [ ] List of all editors complete
- [ ] Component migration plan ready
- [ ] Implementation order defined
- [ ] Potential challenges documented

---

## Technical Notes

### TypeScript Interfaces

```typescript
// Content types
interface HeroContent {
  heading_prefix: string;
  animated_texts: string[];
  description: string;
  filters: { id: string; label: string; icon: string }[];
}

interface FooterContent {
  brand_description: string;
  tagline: string;
  copyright: string;
  quick_links: { label: string; url: string }[];
  legal_links: { label: string; url: string }[];
}

// Project type (matches DB)
interface Project {
  id: string;
  title: string;
  title_am?: string;
  location: string;
  location_am?: string;
  description: string;
  description_am?: string;
  stage: 'sponsorship' | 'concept' | 'voting';
  image_url: string;
  gallery: string[];
  budget?: number;
  votes?: number;
  voting_options?: VotingOption[];
  documents?: Document[];
  presentation_url?: string;
  is_visible: boolean;
  sort_order: number;
}
```

### useContent Hook Pattern

```typescript
export function useContent<T>(sectionId: string) {
  const [content, setContent] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    supabase
      .from('site_content')
      .select('content, is_visible')
      .eq('id', sectionId)
      .single()
      .then(({ data, error }) => {
        if (data) {
          setContent(data.content as T);
          setIsVisible(data.is_visible);
        }
        setIsLoading(false);
      });
  }, [sectionId]);

  return { content, isLoading, isVisible };
}
```

This plan provides a complete roadmap for implementing a fully functional CMS admin panel that will allow managing all content on the "Mer Yerevan" platform through an intuitive interface.
