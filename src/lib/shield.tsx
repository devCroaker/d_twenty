import { Actions } from "./action"

export interface Shield {
  name: string,
  value: number,
  shieldBonus: number,
  actions?: Actions,
}

export const isShield = (obj: any): obj is Shield => obj.shieldBonus !== undefined

export class Shields {

  static [key: string]: any

  static readonly SHIELD: Shield = {
    name: 'shield',
    value: 10,
    shieldBonus: 2,
  }

  private constructor(private readonly shield: Shield) {}

  static getShields() {
    return Object.entries(Shields).map(pair => pair[0])
  }
} 