import { CommandTabs } from './CommandTabs'

const MCP_STANDARD = `{
  "mcpServers": {
    "daemon8": {
      "type": "http",
      "url": "http://localhost:9077/mcp"
    }
  }
}`

export function McpConfigTabs() {
  return (
    <CommandTabs
      ariaLabel="MCP server configuration"
      simple={{
        label: 'daemon8 setup',
        lang: 'bash',
        code: 'daemon8 setup',
        helper:
          'Detects Claude Code, Cursor, Windsurf, and Gemini CLI. Writes the MCP config each supported tool already expects.',
      }}
      manual={{
        label: 'Manual JSON',
        lang: 'json',
        code: MCP_STANDARD,
        helper:
          "Paste into ~/.claude.json, ~/.cursor/mcp.json, or your tool's equivalent MCP config file.",
      }}
    />
  )
}
