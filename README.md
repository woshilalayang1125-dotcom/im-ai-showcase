# CATL 投资部 AI 化展示站

React/Vite showcase site for the CATL investment team's AI-enabled investment memo workflow.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwoshilalayang1125-dotcom%2Fim-ai-showcase&project-name=im-ai-showcase&repository-name=im-ai-showcase&framework=vite&build-command=npm%20run%20build&output-directory=dist)

## Deployment model

- GitHub stores source code only.
- Vercel deploys the React/Vite site.
- Large original project files should live in Vercel Blob, not GitHub.
- Vercel Blob upload is wired through `api/upload-token.js`; configure `BLOB_READ_WRITE_TOKEN` in Vercel before using upload.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

Recommended route:

1. Open the Deploy with Vercel button above, or import this repo in Vercel.
2. Use Framework `Vite`.
3. Use Build Command `npm run build`.
4. Use Output Directory `dist`.
5. Create a Vercel Blob store if upload is needed.
6. Add `BLOB_READ_WRITE_TOKEN` to the Vercel project environment variables.
7. Redeploy.

The first GitHub version uses compact seed data. Full original files should be uploaded to Vercel Blob and indexed as artifact metadata.

## Supabase metadata direction

Supabase is not required for the first deployment. If added later, use it for shared metadata tables such as projects, SOP steps, artifacts, versions, and Blob URLs.
