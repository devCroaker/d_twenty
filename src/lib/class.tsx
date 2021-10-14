import { Action, ActionType } from './action'
import { Adventurer } from './adventurer'
import { dice } from './dice'

export type Level = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20
export type ClassLevel = {
  level: Level,
  class: Class
}

export interface Class {
  name: string,
  hitDice: dice,
  actions?: Action[],
  proficiencies?: []
}

export class Classes {

  static [key: string]: any

  static readonly FIGHTER: Class = {
    name: 'fighter',
    hitDice: 10,
    actions: [{
      name: 'Second Wind',
      description: 'Draw upon a well of stamina to recover from combat',
      type: ActionType.BONUS,
      condition: (adventurer: Adventurer) => adventurer.classes[Classes.FIGHTER.name] >= 1
    }]
  }

  static readonly WIZARD: Class = {
    name: 'wizard',
    hitDice: 6,
  }

  private constructor(private readonly charClass: Class) {}

  static getClasses() {
    return Object.entries(Classes).map(pair => pair[0])
  }
}