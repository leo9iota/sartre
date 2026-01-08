# Tech Stack

## The BEST Stack

**B**un · **E**lysia · **S**olid · **T**urso

A modern, type-safe, and performant full-stack TypeScript stack optimized for developer experience and runtime performance.

---

## Overview

| Layer        | Technology | Description                        |
| :----------- | :--------- | :--------------------------------- |
| **Runtime**  | Bun        | Fast all-in-one JavaScript runtime |
| **Server**   | Elysia     | End-to-end type-safe web framework |
| **Frontend** | SolidJS    | Reactive UI framework              |
| **Database** | Turso      | Edge-hosted SQLite                 |

---

## Full Stack

### Core

| Category | Technology | Version | Description                                      |
| :------- | :--------- | :------ | :----------------------------------------------- |
| Runtime  | Bun        | 1.3.5   | JavaScript runtime, bundler, and package manager |
| Language | TypeScript | ^5.9.3  | Type-safe JavaScript superset                    |
| Monorepo | Turborepo  | ^2.7.2  | High-performance build system for monorepos      |

### Frontend

| Category      | Technology      | Version | Description                               |
| :------------ | :-------------- | :------ | :---------------------------------------- |
| Library       | SolidJS         | ^1.9.10 | Fine-grained reactive UI library          |
| Framework     | SolidStart      | ^1.2.1  | Full-stack meta-framework for SolidJS     |
| Build Tool    | Vite            | ^6.0.0  | Next-generation frontend tooling          |
| UI Primitives | Ark UI          | ^5.30.0 | Headless, accessible component primitives |
| Styling       | Vanilla Extract | ^1.18.0 | Zero-runtime CSS-in-TypeScript            |

### Backend

| Category | Technology  | Version  | Description                                |
| :------- | :---------- | :------- | :----------------------------------------- |
| Server   | Elysia      | ^1.4.19  | Ergonomic, end-to-end type-safe web server |
| Database | Turso       | ^0.15.15 | Distributed SQLite for the edge            |
| ORM      | Drizzle ORM | ^0.45.1  | Type-safe, performant TypeScript ORM       |
| Auth     | Better Auth | ^1.4.10  | Framework-agnostic authentication          |

### Tooling

| Category   | Technology | Version | Description                            |
| :--------- | :--------- | :------ | :------------------------------------- |
| Linting    | ESLint     | ^9.0.0  | Pluggable JavaScript/TypeScript linter |
| Formatting | Prettier   | ^3.7.4  | Opinionated code formatter             |

---

## Why This Stack?

### Bun

- **All-in-one**: Runtime, bundler, package manager, and test runner
- **Speed**: Written in Zig, significantly faster than Node.js
- **Native TypeScript**: No transpilation step required

### Elysia

- **End-to-end type safety**: Types flow from server to client
- **Performance**: One of the fastest Bun-native frameworks
- **Ergonomic API**: Clean, intuitive developer experience

### SolidJS

- **Fine-grained reactivity**: No virtual DOM, surgical updates
- **Performance**: Consistently tops framework benchmarks
- **Familiar syntax**: JSX with reactive primitives

### Turso

- **Edge-native**: SQLite replicated globally on the edge
- **Low latency**: Data close to users
- **Embedded replicas**: Local-first capabilities

---

## Project Structure

```
sartre/
├── apps/
│   ├── web/          # SolidStart frontend
│   └── server/       # Elysia backend
├── packages/         # Shared packages
└── docs/             # Documentation
```

---

## Related Documentation

- [Design System](./06-Design-System.md): Colors, typography, and components
- [Architecture](./05-Architecture.md): System design and data flow
- [Scaffolding](./04-Scaffolding.md): Project structure details
