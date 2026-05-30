import { handleUpload } from "@vercel/blob/client";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await request.json();
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/msword",
          "application/vnd.ms-excel",
          "text/markdown",
          "text/plain",
          "image/png",
          "image/jpeg"
        ],
        addRandomSuffix: true,
        tokenPayload: JSON.stringify({ source: "im-ai-showcase" })
      }),
      onUploadCompleted: async () => {
        // Metadata persistence is intentionally left to the app layer.
        // For a shared public library, pair Blob with Supabase/Postgres/KV.
      }
    });
    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
