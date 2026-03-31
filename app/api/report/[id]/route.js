// Returns a saved report by ID

import { getReport } from "../../../../lib/store.js";

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Report ID required" }, { status: 400 });
  }

  const report = getReport(id);

  if (!report) {
    return Response.json({ error: "Report not found" }, { status: 404 });
  }

  return Response.json(report);
}