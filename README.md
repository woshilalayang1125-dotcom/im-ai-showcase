# CATL 投资部 AI 化展示站

React/Vite showcase site for the CATL investment team's AI-enabled investment memo workflow.

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

Use:

- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

The first GitHub version uses compact seed data. Full original files should be uploaded to Vercel Blob and indexed as artifact metadata.
