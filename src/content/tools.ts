import { palette } from '../theme/palette'

export interface Tool { name: string; color: string }
export interface ToolGroup { label: string; items: Tool[] }

export const toolGroups: ToolGroup[] = [
  {
    label: 'Code',
    items: [
      { name: 'VS Code',                 color: palette.primary },
      { name: 'TypeScript',              color: palette.primary },
      { name: 'JavaScript',              color: palette.secondary },
      { name: 'Python',                  color: palette.secondary },
      { name: 'HTML',                    color: palette.tertiary },
      { name: 'CSS',                     color: palette.primary },
      { name: 'Vue',                     color: palette.primary },
      { name: 'React',                   color: palette.primary },
      { name: 'Astro',                   color: palette.tertiary },
      { name: 'Node.js',                 color: palette.secondary },
      { name: 'Bun',                     color: palette.tertiary },
      { name: 'Go',                      color: palette.quiet },
      { name: 'Ruby',                    color: palette.tertiary },
      { name: 'Java',                    color: palette.quiet },
      { name: 'SQLite',                  color: palette.secondary },
      { name: 'AutoHotkey',              color: palette.quiet },
    ],
  },
  {
    label: 'Create',
    items: [
      { name: 'Blender',                 color: palette.secondary },
      { name: 'After Effects',           color: palette.quiet },
      { name: 'Premiere Pro',            color: palette.quiet },
      { name: 'Photoshop',               color: palette.primary },
      { name: 'Illustrator',             color: palette.secondary },
      { name: 'Media Encoder',           color: palette.quiet },
      { name: 'Audacity',                color: palette.primary },
      { name: 'OBS Studio',              color: palette.secondary },
      { name: 'Krita',                   color: palette.tertiary },
      { name: 'Live2D Cubism',           color: palette.primary },
      { name: 'Cinema 4D',               color: palette.quiet },
      { name: 'FL Studio',               color: palette.secondary },
      { name: 'HandBrake',               color: palette.tertiary },
      { name: 'Upscayl',                 color: palette.primary },
      { name: 'Video2X',                 color: palette.quiet },
    ],
  },
  {
    label: 'AI / Local',
    items: [
      { name: 'ChatGPT',                 color: palette.primary },
      { name: 'Claude',                  color: palette.secondary },
      { name: 'DeepSeek',                color: palette.quiet },
      { name: 'LM Studio',               color: palette.tertiary },
      { name: 'AIRI',                    color: palette.primary },
      { name: 'Claude CLI',              color: palette.secondary },
      { name: 'GitHub Copilot',          color: palette.quiet },
    ],
  },
  {
    label: 'Ops',
    items: [
      { name: 'GitHub',                  color: palette.paper },
      { name: 'Git',                     color: palette.tertiary },
      { name: 'GitHub CLI',              color: palette.paper },
      { name: 'GitHub Desktop',          color: palette.secondary },
      { name: 'Docker',                  color: palette.primary },
      { name: 'Google Cloud SDK',        color: palette.quiet },
      { name: 'WezTerm',                 color: palette.secondary },
      { name: 'MSYS2',                   color: palette.tertiary },
      { name: 'VirtualBox',              color: palette.quiet },
      { name: 'Burp Suite',              color: palette.primary },
      { name: 'Wireshark',               color: palette.secondary },
      { name: 'Nmap',                    color: palette.tertiary },
      { name: 'WireGuard',               color: palette.quiet },
      { name: 'OpenVPN',                 color: palette.primary },
      { name: 'Linux',                   color: palette.secondary },
      { name: 'macOS',                   color: palette.quiet },
      { name: 'Windows',                 color: palette.primary },
    ],
  },
]

export const tools: string[] = toolGroups.flatMap((g) => g.items.map((i) => i.name))
