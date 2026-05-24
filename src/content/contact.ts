import { palette } from '../theme/palette'

export interface Contact { label: string; value: string; color: string }

export const contacts: Contact[] = [
  { label: 'Discord', value: 'unoxyrich',        color: palette.primary },
  { label: 'WeChat',  value: 'unoxyrich',        color: palette.secondary },
  { label: 'Email',   value: 'unoxyrich@qq.com', color: palette.tertiary },
]
