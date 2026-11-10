# ABYX News & Guides — Publishing

Public visitors can read every published post. Publishing is restricted to accounts with write access to this GitHub repository.

## Add a post
Edit `news-guides/posts.json` on a protected branch, then merge it into `main` after review. Each post accepts `date` (YYYY-MM-DD), `thumbnail` (absolute HTTPS image URL), `title` and `text` (objects keyed by language), and optional `url` for a video or guide.

Example:

```json
[
  {
    "date": "2026-11-10",
    "thumbnail": "https://example.org/cover.jpg",
    "title": {"en": "Example guide", "fr": "Guide d’exemple"},
    "text": {"en": "Short explanation.", "fr": "Courte explication."},
    "url": "https://example.org/video"
  }
]
```

Never put an ADMIN password or GitHub access token in public website files. GitHub Pages is static: a password checked by JavaScript is not publication security. A real password-based admin interface would require a server-side authentication and publishing service.
