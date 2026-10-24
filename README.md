# tylerrouze.com

Repo for my website hosted at https://tylerrouze.com on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) (static assets). Uses [Zola](https://www.getzola.org) to generate.

## Build Locally
Must have [zola](https://www.getzola.org/documentation/getting-started/installation/) installed (e.g. `brew install zola`):

```sh
zola serve
```

The site builds to `dist/` (set via `output_dir` in `zola.toml`) — the same directory `wrangler.jsonc` serves.

## Deploy

Pushes to `release` trigger the deploy workflow, which builds the site with Zola (`zola build --output-dir dist`) and runs `wrangler deploy`. The Worker's configuration lives in `wrangler.jsonc` — the `tylerrouze.com` custom domain and its DNS record are provisioned on deploy.

Requires these GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — with `Workers Scripts: Edit` (account) and `DNS: Edit` + `Zone: Read` (zone) permissions
- `CLOUDFLARE_ACCOUNT_ID`

## CI

Pull requests to `release` from the maintainer run `dagger check` using the
shared exe.dev engine when available (otherwise an ephemeral runner engine).
The project check is in `.dagger/modules/ci/main.dang`. The reusable scripts
come from [`trouze/agent-skills`](https://github.com/trouze/agent-skills),
checked out at a full commit SHA in `.github/workflows/dagger.yml`; they are
not copied into this repository. Update that SHA in a PR to adopt a new
`dagger-exe` release. The two repo-level `EXE_DAGGER_*` secrets authorize the
shared engine, and must not be provided to untrusted code.

To preview a production build locally:

```sh
zola build && npx wrangler@4 dev
```

## Notes

- Draft posts (`draft = true` in front matter) are excluded from normal builds; use `zola build --drafts` / `zola serve` to include them, same behavior as before.
- Syntax highlighting uses Zola's built-in `min-light`/`min-dark` VS Code themes, emitted inline as `light-dark()` colors that resolve against the `[data-theme]` toggle in `static/css/site.css`.
