import { defineMcp } from "@lovable.dev/mcp-js";
import listProjectsTool from "./tools/list-projects";
import getProjectTool from "./tools/get-project";

export default defineMcp({
  name: "mer-yerevan-mcp",
  title: "Мer Yerevan MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Мer Yerevan city platform. Use `list_projects` to browse sponsorship and concept projects, and `get_project` to fetch full details for a specific project by id.",
  tools: [listProjectsTool, getProjectTool],
});
