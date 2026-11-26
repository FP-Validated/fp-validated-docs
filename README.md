# FP Validated Docs

Content for the FP Validated documentation site, https://docs.validated.4pillars.io.

This repository holds the pages and the per-chain data. The Docusaurus site that renders them (config, sidebar, theme, and the deployment chart) lives in [fp-validated-docs-web](https://github.com/FP-Validated/fp-validated-docs-web).

## Layout

| Path | Purpose |
| --- | --- |
| `website/docs/` | The pages, in Markdown/MDX. |
| `chains/` | Per-chain data files, such as the staking facts in `chains/<chain>/staking.yaml`. |
| `chains/_schema/` | JSON Schema for the chain data files. |
| `knowledge/` | Source notes that pages are written from. |
| `scripts/` | Generators that write tables into pages from the chain data. |

`website/build` and `website/node_modules` are leftovers from before the site was split into two repositories. The real build does not use them.

## How a change goes live

The site pod pulls the `main` branch of both repositories every two minutes and rebuilds when either changes. It swaps the served site only after a build succeeds. Merging to `main` is the deploy.

A page that fails the build blocks every later change until it is fixed, so build before opening a pull request.

## Build locally

```bash
git clone https://github.com/FP-Validated/fp-validated-docs-web
cd fp-validated-docs-web
rm -rf website/docs chains knowledge
cp -r ../fp-validated-docs/website/docs website/docs
cp -r ../fp-validated-docs/chains chains
cp -r ../fp-validated-docs/knowledge knowledge
npm --prefix scripts ci
npm --prefix website ci
FP_DOCS_PATH=$PWD/website/docs npm --prefix website run build
```

## Writing rules

- No HTML comments (`<!-- -->`) in pages. They fail the build. Use `{/* */}`.
- Write admonition titles with brackets: `:::tip[Title]`.
- A new top-level folder under `website/docs/` needs an entry in the web repository's `website/sidebars.ts`, or it has no menu link.
- Broken internal links are reported as warnings, not errors. Read the build output for them.

## Generated tables

Staking key-facts tables are generated from `chains/<chain>/staking.yaml`:

```bash
node scripts/staking-facts.mjs          # check, fails on drift
node scripts/staking-facts.mjs --write  # regenerate
```
