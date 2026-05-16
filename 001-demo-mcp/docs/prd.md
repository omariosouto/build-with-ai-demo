# PRD: Demo MCP Server (Tutorial Style)

## Problem Statement
Developing a Model Context Protocol (MCP) server can seem complex for beginners due to the underlying JSON-RPC protocol and the specific handshake requirements. Users often struggle to understand the core components of an MCP server and how they interact with an LLM host.

## Solution
Create a demo MCP server implemented in Node.js (TypeScript) that serves as both a functional tool and a step-by-step educational resource. The server implements a simple data retrieval tool (`query_data`) using a local JSON file as a database, while the code itself is structured and commented to teach the developer how to use the official MCP SDK and Zod for validation.

## User Stories
1. As a developer, I want to see a clearly commented codebase so that I can learn the MCP protocol structure step-by-step.
2. As a developer, I want to use the official MCP SDK so that my implementation follows industry standards and best practices.
3. As a developer, I want to query a local JSON file via an LLM so that I can provide custom context to the model.
4. As an LLM, I want to list available tools from the server so that I know what capabilities are provided.
5. As an LLM, I want to call a tool with a string query so that I can retrieve relevant information for the user.
6. As a developer, I want input validation for my tool arguments so that the server is robust against malformed requests.

## Implementation Decisions
- **Runtime & Language**: Node.js with TypeScript for type safety and modern ecosystem support.
- **Protocol Library**: `@modelcontextprotocol/sdk` for standard-compliant JSON-RPC management.
- **Validation**: `zod` for surgical schema validation of tool inputs.
- **Transport**: `StdioServerTransport` to enable easy integration with local LLM hosts (like Claude Desktop).
- **Data Storage**: A simple `data.json` file to keep the demo self-contained and easy to modify.
- **Architecture**: A single-file main entry point (`index.ts`) organized into logical steps (Init, Data, Tools, Handlers, Start) to maximize readability.

## Testing Decisions
- **Manual Verification**: Test the server by simulating JSON-RPC messages via standard input to ensure correct handshake and tool responses.
- **Schema Validation**: Verify that the tool handler correctly rejects invalid inputs using Zod.
- **Data Integrity**: Ensure the filtering logic correctly matches records in the `data.json` file.

## Out of Scope
- Support for persistent databases (SQL/NoSQL).
- Remote transport layers (HTTP/WebSockets).
- Advanced MCP features like Resources or Prompts.
- Complex authentication/authorization logic.

## Further Notes
The project is designed as a template. Developers can easily swap `data.json` for their own data sources or extend the tool handlers to integrate with external APIs.
