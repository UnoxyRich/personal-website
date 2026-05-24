import { palette } from '../theme/palette'

export interface Social { label: string; url: string; handle?: string; color: string }

export const socials: Social[] = [
  { label: 'GitHub',      url: 'https://github.com/UnoxyRich',                                                                   handle: '@UnoxyRich',         color: palette.paper },
  { label: 'Steam',       url: 'https://steamcommunity.com/id/UnoxyRich/',                                                       handle: 'UnoxyRich',          color: palette.primary },
  { label: 'YouTube',     url: 'https://www.youtube.com/@metalpipeeeeeeeee',                                                     handle: '@metalpipeeeeeeeee', color: palette.tertiary },
  { label: 'Bilibili',    url: 'https://space.bilibili.com/3493290007595270',                                                                                  color: palette.primary },
  { label: 'Douyin',      url: 'https://www.douyin.com/user/MS4wLjABAAAAi191-jsXGGkf0PB0LD0UnmbsldJV_lKVgtTcS2l7uUE',                                          color: palette.tertiary },
  { label: 'Xiaohongshu', url: 'https://www.xiaohongshu.com/user/profile/639ef4f40000000026011629',                                                            color: palette.secondary },
]
