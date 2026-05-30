# CATL 投资部 AI 化展示站

React/Vite showcase site for the CATL investment team's AI-enabled investment memo workflow.

## Current deployment model

- GitHub stores source code only.
- Vercel deploys the React/Vite site.
- Large original project files should live in Vercel Blob, not GitHub.
- The local workspace contains a full `public/uploads` package for local/static testing, but it is excluded from GitHub because several files exceed GitHub's normal file-size limits.

## Run locally

```powershell
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Import into Replit

Upload or import this folder as a Node.js / React project in Replit.

Use:

```text
npm install
npm run dev
```

The app includes:

- React frontend
- Express backend
- JSON APIs for SOP, Skills, Cases, Artifacts
- Public file upload endpoint
- Manifest import endpoint
- Seed data copied from `frontend_data_contract.json`
- Asset index copied from `asset_manifest.json`

## Deploy to Vercel

Vercel should use:

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

The Vercel version serves seed data from `public/data`. Public original files should be uploaded to Vercel Blob and indexed in the app metadata.

Dynamic upload in Vercel uses Vercel Blob when the deployment has `BLOB_READ_WRITE_TOKEN` configured. Files persist in Blob, while the v1 browser metadata index is kept in localStorage. For a shared public metadata index across users, pair Blob with Supabase/Postgres/KV.

## Replit

The app can still run in Replit with:

```text
npm install
npm run dev
```
