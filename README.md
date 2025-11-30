# Next.js Features Playground

A personal garage for experimenting with Next.js 16+ and React 19.2 features. This repo serves as both a learning resource and a quick reference for modern React/Next.js patterns.

## Stack

- **Next.js 16** with App Router and Turbopack
- **React 19.2** with new hooks and patterns
- **tRPC** for end-to-end typesafe APIs
- **TanStack Query** for async state management
- **Tailwind CSS v4** with CSS-first configuration
- **shadcn/ui** with new-york style
- **TypeScript** with strict mode
- **ESLint 9** flat config with custom rules
- **Turbo** for fast builds and caching

## Quick Start

```bash
pnpm install
pnpm dev
```

## Features Implemented

| Feature | Status | Route |
|---------|--------|-------|
| Server Actions + useActionState | Done | `/actions` |
| use cache + revalidateTag | Done | `/cache` |
| tRPC + TanStack Query | Done | `/trpc` |
| SSR Streaming (OpenAI-style) | Done | `/streaming` |
| WebRTC Video/Audio | Done | `/webrtc` |
| Typed Routes | Configured | - |

---

## Resources

### Release Notes

| Version | Date | Link |
|---------|------|------|
| React 19.2 | Oct 2025 | https://react.dev/blog/2025/10/01/react-19-2 |
| React 19.1 | Mar 2025 | https://react.dev/blog/2025/03/01/react-19-1 |
| React 19 | Dec 2024 | https://react.dev/blog/2024/12/05/react-19 |
| Next.js 16 | Oct 2025 | https://nextjs.org/blog/next-16 |
| Next.js 15.5 | Aug 2025 | https://nextjs.org/blog/next-15-5 |
| Next.js 15.3 | Apr 2025 | https://nextjs.org/blog/next-15-3 |
| Next.js 15 | Oct 2024 | https://nextjs.org/blog/next-15 |

### React 19 Hooks

| Hook | Description | Docs |
|------|-------------|------|
| `useActionState` | Handle form actions with pending state | https://react.dev/reference/react/useActionState |
| `useOptimistic` | Show optimistic UI during mutations | https://react.dev/reference/react/useOptimistic |
| `useFormStatus` | Get form submission status in children | https://react.dev/reference/react-dom/hooks/useFormStatus |
| `use` | Read resources (promises, context) in render | https://react.dev/reference/react/use |
| `useEffectEvent` | Extract non-reactive logic from effects | https://react.dev/reference/react/useEffectEvent |
| `useTransition` | Mark state updates as non-blocking | https://react.dev/reference/react/useTransition |
| `useDeferredValue` | Defer updating part of the UI | https://react.dev/reference/react/useDeferredValue |

### React 19 Components

| Component | Description | Docs |
|-----------|-------------|------|
| `<Activity>` | Pre-render hidden content, preserve state | https://react.dev/reference/react/Activity |
| `<Suspense>` | Show fallback while loading | https://react.dev/reference/react/Suspense |

### Next.js Features

| Feature | Description | Docs |
|---------|-------------|------|
| `'use cache'` | Mark functions for caching | https://nextjs.org/docs/app/api-reference/directives/use-cache |
| `'use server'` | Mark functions as server actions | https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations |
| `cacheLife()` | Set cache duration presets | https://nextjs.org/docs/app/api-reference/functions/cacheLife |
| `cacheTag()` | Tag cache entries for revalidation | https://nextjs.org/docs/app/api-reference/functions/cacheTag |
| `revalidateTag()` | Invalidate cache by tag | https://nextjs.org/docs/app/api-reference/functions/revalidateTag |
| `revalidatePath()` | Invalidate cache by path | https://nextjs.org/docs/app/api-reference/functions/revalidatePath |
| Typed Routes | Type-safe Link href | https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links |
| Turbopack | Rust-based bundler | https://nextjs.org/docs/app/api-reference/turbopack |
| Streaming | Progressive SSR rendering | https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming |
| Route Handlers | API endpoints in App Router | https://nextjs.org/docs/app/building-your-application/routing/route-handlers |

### Libraries

| Library | Description | Docs |
|---------|-------------|------|
| tRPC | End-to-end typesafe APIs | https://trpc.io/docs |
| TanStack Query | Async state management | https://tanstack.com/query/latest |
| Turbo | High-performance build system | https://turbo.build/repo/docs |
| shadcn/ui | Re-usable components | https://ui.shadcn.com |
| Tailwind CSS v4 | Utility-first CSS | https://tailwindcss.com/docs |
| Zod | TypeScript-first schema validation | https://zod.dev |

### WebRTC Resources

| Topic | Link |
|-------|------|
| WebRTC API | https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API |
| RTCPeerConnection | https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection |
| MediaStream API | https://developer.mozilla.org/en-US/docs/Web/API/MediaStream |
| STUN/TURN Servers | https://webrtc.org/getting-started/turn-server |

---

## Configuration

### Turbo (turbo.json)

Turbo is configured for fast, cached builds. Key features:
- **Remote caching**: Share build cache across machines
- **Parallel execution**: Run tasks concurrently
- **Incremental builds**: Only rebuild what changed

```bash
pnpm build          # Uses Turbo for caching
pnpm dev            # Uses Turbopack for fast refresh
```

### next.config.ts

- `cacheComponents: true` - Enable 'use cache' directive
- `typedRoutes: true` - Type-safe Link href validation
- Custom `cacheLife` presets for different cache durations

### eslint.config.mjs

- Strict TypeScript rules with unused var patterns
- Consistent type imports enforcement
- React self-closing components
- No console.log (warn/error allowed)

---

## License

MIT
