// Receives uploaded documents, runs the analysis pipeline, streams progress via SSE

import { runPipeline } from "../../../lib/pipeline.js";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const state = formData.get("state");
    const fileEntries = formData.getAll("documents");

    if (!state) {
      return Response.json({ error: "State is required" }, { status: 400 });
    }
    if (!fileEntries || fileEntries.length === 0) {
      return Response.json({ error: "At least one document is required" }, { status: 400 });
    }
    if (fileEntries.length > 10) {
      return Response.json({ error: "Maximum 10 documents allowed" }, { status: 400 });
    }

    const files = await Promise.all(
      fileEntries.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          buffer,
          mimeType: file.type || "application/pdf",
          filename: file.name || "document.pdf"
        };
      })
    );

    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const sendProgress = (step, message, status) => {
      const data = JSON.stringify({ step, message, status });
      writer.write(encoder.encode(`data: ${data}\n\n`));
    };

    (async () => {
      try {
        const reportId = await runPipeline(files, state, sendProgress);
        const doneData = JSON.stringify({ done: true, reportId });
        writer.write(encoder.encode(`data: ${doneData}\n\n`));
      } catch (error) {
        console.error("Pipeline error:", error);
        const errData = JSON.stringify({ error: true, message: error.message });
        writer.write(encoder.encode(`data: ${errData}\n\n`));
      } finally {
        writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      }
    });

  } catch (error) {
    console.error("Route error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}