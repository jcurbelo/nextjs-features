# Next.js Features Playground

A personal garage for experimenting with Next.js 16+ and React 19.2 features. This repo serves as both a learning resource and a quick reference for modern React/Next.js patterns.

## Stack

- **Next.js 16** with App Router
- **React 19.2** with new hooks and patterns
- **Tailwind CSS v4** with CSS-first configuration
- **shadcn/ui** with new-york style
- **TypeScript** with strict mode
- **ESLint 9** flat config with custom rules

## Quick Start

```bash
pnpm install
pnpm dev
```

## Features Implemented

| Feature | Status | Route |
|---------|--------|-------|
| Server Actions | Done | `/actions` |
| useActionState | Done | `/actions` |
| use cache | Done | `/cache` |
| cacheTag + revalidateTag | Done | `/cache` |
| Typed Routes | Configured | - |

## Official Documentation

### React 19

| Topic | Link |
|-------|------|
| React 19 Release | https://react.dev/blog/2024/12/05/react-19 |
| React 19.2 Release | https://react.dev/blog/2025/10/01/react-19-2 |
| useActionState | https://react.dev/reference/react/useActionState |
| useOptimistic | https://react.dev/reference/react/useOptimistic |
| useFormStatus | https://react.dev/reference/react-dom/hooks/useFormStatus |
| use hook | https://react.dev/reference/react/use |
| useEffectEvent | https://react.dev/reference/react/useEffectEvent |
| Activity component | https://react.dev/reference/react/Activity |
| Server Actions | https://react.dev/reference/rsc/server-actions |

### Next.js 16

| Topic | Link |
|-------|------|
| Next.js 16 Release | https://nextjs.org/blog/next-16 |
| Next.js 15.5 Release | https://nextjs.org/blog/next-15-5 |
| Next.js 15.3 Release | https://nextjs.org/blog/next-15-3 |
| Composable Caching | https://nextjs.org/blog/composable-caching |
| use cache directive | https://nextjs.org/docs/app/api-reference/directives/use-cache |
| cacheLife | https://nextjs.org/docs/app/api-reference/next-config-js/cacheLife |
| cacheTag | https://nextjs.org/docs/app/api-reference/functions/cacheTag |
| revalidateTag | https://nextjs.org/docs/app/api-reference/functions/revalidateTag |
| Typed Routes | https://nextjs.org/docs/app/api-reference/config/typescript#statically-typed-links |
| Turbopack | https://nextjs.org/docs/app/api-reference/turbopack |

### Tooling

| Topic | Link |
|-------|------|
| shadcn/ui | https://ui.shadcn.com |
| Tailwind CSS v4 | https://tailwindcss.com/docs |
| ESLint 9 Flat Config | https://eslint.org/docs/latest/use/configure/configuration-files |

## Configuration Highlights

### next.config.ts

- `cacheLife`: Custom cache presets for the `use cache` directive
- `experimental.typedRoutes`: Type-safe Link href validation

### eslint.config.mjs

- Strict TypeScript rules with unused var patterns
- Consistent type imports enforcement
- React self-closing components
- No console.log (warn/error allowed)

## License

MIT
