<p align="center">
  <img src="./daemon8-wordmark.svg" alt="Daemon8" height="64" />
</p>

<p align="center">
  The admin layer for AI agents.<br>
  Observe. Act. Coordinate.<br>
  One convention for runtime output and real-time context.
</p>

<p align="center">
  <a href="https://daemon8.ai">daemon8.ai</a> •
  <a href="https://github.com/daemon8ai/daemon8">daemon8 (software)</a> •
  <a href="mailto:mail@daemon8.ai">mail@daemon8.ai</a>
</p>

> [!TIP]
> Help keep Daemon8 open source — [star the main repo](https://github.com/daemon8ai/daemon8).

---

What's here: the site, newsletter signup, and docs for daemon8.ai. The Rust daemon itself — the admin layer for AI agents — lives in its own repo at [github.com/daemon8ai/daemon8](https://github.com/daemon8ai/daemon8). Contributions welcome.

## Run locally

Requirements: [Bun](https://bun.sh) ≥ 1.2.

```bash
bun install
cp .env.example .env
bun run dev
```

The site runs at http://localhost:3000. See `.env.example` for required environment variables.

## Stack

- [TanStack Start](https://tanstack.com/start) (SSR, file-based routing)
- React 19
- [Vite](https://vite.dev/) 7
- Semantic CSS (tokens + component classes; no utility-class soup at use-site)

## License

MIT. See [`LICENSE`](./LICENSE).

Copyright © 2026 Havy.tech, LLC.
