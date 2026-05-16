/**
 * STEP-BY-STEP TUTORIAL: BUILDING AN MCP SERVER WITH THE SDK
 * 
 * This tutorial guides you through creating a Model Context Protocol (MCP) server
 * using the official SDK. This is the recommended way for production servers.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// --- STEP 1: INITIALIZATION ---
// Define the server name and version. This helps clients identify your server.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new Server(
  {
    name: "mcp-sdk-tutorial",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {}, // Tell the client we support tools
    },
  }
);

// --- STEP 2: DEFINE YOUR DATA ---
// Here we define a simple function to load data from our JSON "database".
async function loadData() {
  const dataPath = path.resolve(__dirname, "./data.json");
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
}

// --- STEP 3: REGISTER TOOLS ---
// Tools are the primary way clients interact with your server.
// First, we tell the client which tools we have.
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "query_data",
        description: "Answers questions based on data.json",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The question to ask",
            },
          },
          required: ["query"],
        },
      },
    ],
  };
});

// --- STEP 4: IMPLEMENT TOOL LOGIC ---
// This handler executes when a client calls one of your tools.
// We use Zod to ensure the input matches our expected schema.
const QuerySchema = z.object({
  query: z.string(),
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query_data") {
    // Validate arguments
    const { query } = QuerySchema.parse(request.params.arguments);
    const data = await loadData();
    
    // Simple search logic inside our JSON data
    const results = data.filter((item: any) => 
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase())
    );

    const responseText = results.length > 0 
      ? results.map((r: any) => `Q: ${r.question}\nA: ${r.answer}`).join("\n\n")
      : "No matching information found.";

    return {
      content: [
        {
          type: "text",
          text: responseText,
        },
      ],
    };
  }

  throw new Error("Tool not found");
});

// --- STEP 5: START THE SERVER ---
// Finally, we connect the server using the Standard Input/Output transport.
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP SDK Tutorial Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
