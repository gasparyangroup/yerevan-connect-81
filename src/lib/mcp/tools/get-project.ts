import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { projects } from "@/data/projects";

export default defineTool({
  name: "get_project",
  title: "Get project details",
  description:
    "Get full details for a single Мer Yerevan project by its id.",
  inputSchema: {
    id: z.string().min(1).describe("Project id, e.g. as returned by list_projects."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: ({ id }) => {
    const p = projects.find((x) => x.id === id);
    if (!p) {
      return {
        content: [{ type: "text", text: `No project with id "${id}"` }],
        isError: true,
      };
    }
    const { image, gallery, ...rest } = p;
    const details = { ...rest, galleryCount: gallery?.length ?? 0 };
    return {
      content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
      structuredContent: { project: details },
    };
  },
});
