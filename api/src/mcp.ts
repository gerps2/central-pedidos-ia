import { McpStrategy, StreamableHttpTransport } from "@rekog/mcp-nest";

/** Servidor MCP dentro da API: cada ferramenta mora no slice dela. */
export const mcp = new McpStrategy({
  name: "central-pedidos",
  version: "1.0.0",
  transports: [new StreamableHttpTransport()],
});
