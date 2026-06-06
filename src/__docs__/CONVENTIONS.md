# Coding Conventions

This document defines the coding standards for the project. Follow these
conventions to keep the codebase consistent, readable, and easy to maintain.

---

## 1. Naming

| Concept | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `HeroSection`, `PageLayout` |
| Functions | camelCase | `scrollToId`, `useNavScroll` |
| Constants | UPPER_SNAKE_CASE | `TRAIL_LENGTH`, `WORKS` |
| Types/Interfaces | PascalCase | `WorkItem`, `HomeWorkFilter` |
| Props interfaces | `{ComponentName}Props` | `HeroSectionProps` |
| CSS classes | kebab-case + BEM | `work-card__overlay`, `value-grid` |
| Files (JS/TS) | PascalCase for components | `HeroSection.tsx` |
| Files (data) | camelCase | `works.ts`, `values.ts` |
| Files (types) | camelCase | `home.ts`, `work.ts` |

## 2. Imports

Order imports in this sequence, separated by a blank line:

1. **React / framework** (`react`, `react-router-dom`)
2. **Third-party libraries**
3. **Shared components** (`../../shared/components/...`)
4. **Feature components** (`../components/...`)
5. **Data / hooks** (`../data/...`, `../hooks/...`)
6. **Types** (`import type { ... } from "..."`)
7. **Styles** (`import "./style.css"`)

```tsx
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { AutoPlayVideo } from "../../../shared/components/media/AutoPlayVideo";
import { classNames } from "../../../shared/lib/classNames";
import { WORKS } from "../data/works";
import type { WorkItem } from "../types/home";

import "./home.css";
```

## 3. Components

```tsx
/** Brief description of what this component does */
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return <div>...</div>;
}

export interface ComponentNameProps {
  /** Description of this prop */
  prop1: string;
  /** Description with optional default */
  prop2?: number;
}
```

- **Named exports only** — No `export default`
- **JSDoc on every exported function** — Include `@param` and `@example` where beneficial
- **Props interface co-located** — Either in the same file or a `.types.ts` file
- **Memo on complex sub-components** — Use `memo` for list items and heavy renders

## 4. State Management

- **Local state** → `useState`, `useReducer`
- **Shared UI state** → React Context (e.g. `DetailVideoProvider`)
- **Server state / data fetching** → (not yet used — add library when needed)
- **No global state libraries** — Keep it simple

## 5. CSS

- **Use Tailwind classes** for layout, spacing, colour, and typography
- **Use `.css` files only for**:
  - `@keyframes` animations
  - Pseudo-element tricks (`::after`, `::before`)
  - Multi-property transitions too complex for Tailwind
- **Co-locate CSS** with the component (e.g. `ValuesSection.css` next to `ValuesSection.tsx`)
- **No inline `<style>` tags** — Use Tailwind or co-located CSS files
- **`@media (hover: hover)`** — Wrap hover effects so they don't interfere with touch devices

## 6. Data Files

```tsx
/**
 * Description of this data module.
 * Explain what the data is used for and where it appears.
 */

export const DATA_NAME: readonly Type[] = [ ... ] as const;
```

- **One concern per file** — Don't mix values, testimonials, and works in one file
- **`readonly` modifier** — Mark arrays and objects as readonly to prevent accidental mutation
- **`as const`** — Use on literal arrays and objects for better type inference
- **JSDoc** — Document the purpose of each data module

## 7. Routing

- Route path strings are defined as constants in `AppRoutes.tsx`
- Use `ROUTES.HOME` instead of hardcoded `"/"`
- Lazy-load all page bundles with `React.lazy`

## 8. TypeScript

- **Strict mode enabled** — Do not use `any`, `@ts-ignore`, or `as any`
- **Explicit return types** on exported functions (optional for internal functions)
- **`interface` over `type`** for object shapes (consistent style)
- **`type` for unions, intersections, and primitive aliases**