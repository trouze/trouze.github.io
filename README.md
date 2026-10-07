# tylerrouze.com

Repo for my website hosted at https://tylerrouze.com on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) (static assets). Uses [Astro](https://astro.build) to generate.

## Build Locally
Must have node installed:

```sh
pnpm dev
```

## Deploy

Pushes to `release` trigger the deploy workflow, which builds the site and runs `wrangler deploy`. The Worker's configuration lives in `wrangler.jsonc` — the `tylerrouze.com` custom domain and its DNS record are provisioned on deploy.

Requires these GitHub Actions secrets:

- `CLOUDFLARE_API_TOKEN` — with `Workers Scripts: Edit` (account) and `DNS: Edit` + `Zone: Read` (zone) permissions
- `CLOUDFLARE_ACCOUNT_ID`

To preview a production build locally:

```sh
pnpm build && pnpm exec wrangler dev
```
