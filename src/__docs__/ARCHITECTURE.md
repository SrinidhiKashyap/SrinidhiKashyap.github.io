# Project Architecture

## Layer Diagram

```
main.tsx
  └─ WebsiteApp (BrowserRouter)
       ├─ SiteLoader
       ├─ ScrollToHash
       ├─ BeeCursorTrail
       └─ AppRoutes
            └─ Page
                 └─ PageLayout
                      ├─ SiteNavbar
                      ├─ Feature components
                      └─ SiteFooter
```

## Directory Layout

```
src/
├── main.tsx                    # ReactDOM entry — single entry point
├── WebsiteApp.tsx              # Re-exports app/WebsiteApp (kept for vite compatibility)
├── app/                        # Router, route config, root component
├── styles/                     # Global CSS (Tailwind directives, @font-face, reset)
├── features/                   # Feature modules — each is a self-contained domain
│   ├── home/                   # Landing page (hero, about, values, works, testimonials)
│   ├── services/               # Service listing page
│   ├── work-details/           # Work/case-study detail pages
│   └── contact/                # Contact page with form
├── shared/                     # Reusable code shared across features
│   ├── components/
│   │   ├── layout/             # PageLayout, SiteNavbar, SiteFooter, SiteLoader
│   │   ├── media/              # AutoPlayVideo
│   │   └── ui/                 # BeeCursorTrail
│   ├── hooks/                  # useNavScroll
│   └── lib/                    # classNames, assets, scrollToId
├── pages/                      # Thin re-export wrappers (will be removed in future)
└── __docs__/                   # Project documentation
```

## Key Rules

1. **One component = one file** — never put multiple components in a single file
2. **Pages import from features only** — never from other pages
3. **Features import from shared** — never from other features (exception: services → home/works)
4. **Shared never imports from features** — strict one-way dependency
5. **No circular dependencies** — enforce with regular `tsc --noEmit` checks

## Route Structure

| Path | Page Component | Slug |
|------|---------------|------|
| `/` | HomePage | — |
| `/service` | ServicePage | — |
| `/contact` | ContactPage | — |
| `/:slug` | WorkDetailPage | sterilized chapter name |

Route path strings live in `src/config/routes.ts` as a single source of truth.