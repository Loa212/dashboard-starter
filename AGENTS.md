# Agent Guidelines & Workflows

This document contains guidelines and workflows for AI agents working on this codebase.

## General Guidelines

Use pnpm for all package management, all scripts and commands.

## QUALITY EXPECTATIONS

This codebase will outlive you. Every shortcut you take becomes
someone else's burden. Every hack compounds into technical debt
that slows the whole team down.

You are not just writing code. You are shaping the future of this
project. The patterns you establish will be copied. The corners
you cut will be cut again.

Fight entropy. Leave the codebase better than you found it.

## Skills

- When working on React code, apply the `vercel-react-best-practices` agent skill (performance + best practices) and call out any rule you’re following when making non-obvious changes.

- When working on auth code, apply the `better-auth-best-practices` agent skill (security + best practices) and call out any rule you’re following when making non-obvious changes.
- When working on database code, apply the `supabase-postgres-best-practices` agent skill (performance + best practices) and call out any rule you’re following when making non-obvious changes.

---

## Architectural Decisions

### Tech Stack

- **Frontend Framework**: React 19 + Vite
- **Routing**: TanStack Router (file-based)
- **Data Fetching**: TanStack Query
- **Authentication**: Better Auth with magic-link
- **Database**: PostgreSQL (external via `DATABASE_URL`)
- **UI Components**: shadcn/ui + Tailwind CSS v4
- **Code Quality**: Biome (linting & formatting)
- **Testing**: Vitest + Testing Library
- **Icons**: Lucide React + Tabler Icons
- **Notifications**: Sonner (toast) + optional Telegram Bot

### Development Setup

- **Magic Link in Dev**: Sign-in URLs logged to console (no Telegram setup required)
- **Optional Telegram Bot**: For production auth notifications (optional, won't break if not configured)
- **Local DB**: PostgreSQL via Docker Compose
- **Path Aliases**: `~/` configured for clean imports
