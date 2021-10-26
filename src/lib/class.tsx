import { Action, ActionType } from './action'
import { Adventurer } from './adventurer'
import { d, dice, DiceNotation } from './dice'

export type Level = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20
export type ClassLevel = {
  level: Level,
  actions: Action[]
}

export interface Class {
  name: string,
  hitDice: dice,
  levels: ClassLevel[]
  proficiencies?: []
}

export class Classes {

  static [key: string]: any

  static readonly FIGHTER: Class = {
    name: 'fighter',
    hitDice: 10,
    levels: [
      {
        level: 1,
        actions: [{
          name: 'Second Wind',
          description: 'Draw upon a well of stamina to recover from combat',
          type: ActionType.BONUS,
          effect: (adventurer: Adventurer) => {
            const die: DiceNotation = {number: 1, dice: 10},
              fighterLevel = adventurer.classes?.fighter
            adventurer.heal(d(die) + fighterLevel)
          }
        }]
      }
    ]
  }

  static readonly WIZARD: Class = {
    name: 'wizard',
    hitDice: 6,
    levels: []
  }

  private constructor(private readonly charClass: Class) {}

  static getClasses() {
    return Object.entries(Classes).map(pair => pair[0])
  }
}