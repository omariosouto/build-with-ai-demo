# Implementation Plan: Demo MCP Server (Tutorial Style)

## Objective
Implement a Model Context Protocol (MCP) server in Node.js (TypeScript) following the PRD requirements. The server will act as a step-by-step tutorial, demonstrating how to use the official `@modelcontextprotocol/sdk` and `zod` to expose a `query_data` tool that reads from a local `data.json` file.

## Key Files & Context
- `001-demo-mcp/docs/prd.md`: The Product Requirements Document.
- `001-demo-mcp/package.json`: Project configuration and dependencies (`@modelcontextprotocol/sdk`, `zod`).
- `001-demo-mcp/src/index.ts`: The main server entry point.
- `001-demo-mcp/src/data.json`: The local data store for the `query_data` tool.

## Implementation Steps
This project has already been largely implemented according to the PRD. The current plan outlines the existing structure and the steps required to verify or extend it.

### Phase 1: Project Setup (Completed)
- Initialize Node.js project with TypeScript.
- Install necessary dependencies: `@modelcontextprotocol/sdk` and `zod`.
- Configure `tsconfig.json` for proper module resolution.

### Phase 2: Data Source (Completed)
- Create `src/data.json` containing sample questions and answers related to "DevSoutinho".
- Ask the user which questions should be added to the `data.json`
- Implement `loadData` utility function in `src/index.ts` to asynchronously read and parse this file.

### Phase 3: Server Initialization (Completed)
- Instantiate the MCP `Server` with a specific name (`mcp-sdk-tutorial`) and version (`1.0.0`).
- Declare the `tools` capability during initialization.

### Phase 4: Tool Registration (Completed)
- Handle the `ListToolsRequestSchema` to expose the `query_data` tool.
- Define the tool's input schema using JSON Schema format, requiring a `query` string.

### Phase 5: Tool Implementation (Completed)
- Define a Zod schema (`QuerySchema`) to strictly validate incoming tool arguments.
- Handle the `CallToolRequestSchema`.
- Validate the request against `QuerySchema`.
- If valid, execute the search logic against the loaded `data.json`.
- Return the formatted results or a "not found" message.
- Handle validation errors and unknown tool requests appropriately.

### Phase 6: Transport Setup (Completed)
- Instantiate `StdioServerTransport`.
- Connect the server to the transport.
- Log a startup message to standard error (stderr) to avoid interfering with standard output (stdout) which is used for MCP communication.

## Verification & Testing
1. **Manual Execution**: Run the server using `npm start` (or `tsx src/index.ts`).
2. **Handshake Verification**: Send a valid JSON-RPC `initialize` request via stdin and verify the server responds with its capabilities.
3. **Tool Listing**: Send a `tools/list` request and verify `query_data` is returned.
4. **Tool Execution (Success)**: Send a `tools/call` request for `query_data` with a valid query (e.g., "DevSoutinho"). Verify it returns the correct answer from `data.json`.
5. **Tool Execution (Validation Failure)**: Send a `tools/call` request with missing or invalid arguments and verify the server returns a well-formed JSON-RPC error.
6. **Data Integrity**: Verify that updates to `data.json` are reflected in subsequent queries.