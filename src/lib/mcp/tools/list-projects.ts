import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "../projects-data";

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description:
    "List Мer Yerevan city projects. Optionally filter by stage (sponsorship or concept).",
  inputSchema: {
    stage: z
      .enum(["sponsorship", "concept"])
      .optional()
      .describe("Filter by project stage."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: ({ stage }) => {
    const items = projects
      .filter((p) => (stage ? p.stage === stage : true))
      .map((p) => ({
        id: p.id,
        title: p.title,
        titleEn: p.titleEn,
        stage: p.stage,
        location: p.location,
        locationEn: p.locationEn,
        budget: p.budget,
        displayBudget: p.displayBudget,
        address: p.address,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { projects: items, count: items.length },
    };
  },
});
