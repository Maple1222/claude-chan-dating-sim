export type Expr = 'normal' | 'shy' | 'angry' | 'sad' | 'love' | 'surprised' | 'yandere'

export type Choice = { label: string; delta: number; reply: string; end?: 'good' | 'bad' }

export type GameEvent = {
  title: string
  expr: Expr
  lines: string[]
  choices: Choice[]
  rival?: string
}

declare module 'claude-code' {
  interface PluginState {
    'koi-chan': {
      isOn: boolean
      aff: number
      expr: Expr
      line: string
      isAway: boolean
      isYandere: boolean
      event: GameEvent | null
      spam: string[]
      deleting: string[]
      rival: string | null
    }
  }
}
