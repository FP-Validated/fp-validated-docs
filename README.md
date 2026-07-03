# FP Validated Docs

This repository contains the FP Validated node operations and developer interface guide.

## Layout

| Path | Purpose |
| --- | --- |
| `website/` | Docusaurus v3 documentation site. |
| `chains/` | Per-chain metadata, samples, and chain-specific source material. |
| `chains/_schema/` | JSON Schema for chain metadata files. |
| `charts/` | Helm charts for generic and chain-specific infrastructure. |
| `argocd/` | Argo CD application examples for GitOps deployment. |
| `scripts/` | TypeScript automation for metadata validation and generated matrices. |
| `tests/` | Test matrix documentation for Helm, Docker, RPC, and samples validation. |

## Run the docs site

```bash
cd website
npm install
npm start
```

## Run the docs site with Docker

```bash
docker compose up --build
# or:
docker build -t fp-validated-docs-local:latest .
docker run --rm -p 3000:80 fp-validated-docs-local:latest
```

The site is served locally at `http://127.0.0.1:3000`.

## Run automation scripts

Scripts use ESM TypeScript and depend on the local package in `scripts/`:

```bash
cd scripts
npm install
cd ..
npx tsx scripts/validate-docs.ts
npx tsx scripts/validate-samples.ts
npx tsx scripts/generate-rpc-matrix.ts
npx tsx scripts/generate-rpc-matrix.ts --write
npx tsx scripts/generate-port-matrix.ts
```

On Node versions that support type stripping, the scripts can also be run directly:

```bash
node --experimental-strip-types scripts/validate-docs.ts
```
