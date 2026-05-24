export interface Tool { name: string; color: string }
export interface ToolGroup { label: string; items: Tool[] }

export const toolGroups: ToolGroup[] = [
  {
    label: 'Code',
    items: [
      { name: 'VS Code',                 color: '#007acc' },
      { name: 'TypeScript',              color: '#3178c6' },
      { name: 'JavaScript',              color: '#f7df1e' },
      { name: 'Python',                  color: '#ffd43b' },
      { name: 'HTML',                    color: '#e34c26' },
      { name: 'CSS',                     color: '#1572b6' },
      { name: 'Vue',                     color: '#41b883' },
      { name: 'React',                   color: '#61dafb' },
      { name: 'Astro',                   color: '#ff5d01' },
    ],
  },
  {
    label: 'Create',
    items: [
      { name: 'Blender',                 color: '#f5792a' },
      { name: 'After Effects',           color: '#9999ff' },
      { name: 'Premiere Pro',            color: '#9999ff' },
      { name: 'Photoshop',               color: '#31a8ff' },
    ],
  },
  {
    label: 'AI / Local',
    items: [
      { name: 'LM Studio',               color: '#cba6f7' },
    ],
  },
  {
    label: 'Ops',
    items: [
      { name: 'GitHub',                  color: '#ffffff' },
      { name: 'Git',                     color: '#f1502f' },
      { name: 'Linux',                   color: '#fcc624' },
      { name: 'macOS',                   color: '#c0c0c0' },
      { name: 'Windows',                 color: '#00a4ef' },
    ],
  },
]

export const tools: string[] = toolGroups.flatMap((g) => g.items.map((i) => i.name))
