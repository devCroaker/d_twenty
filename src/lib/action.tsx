import { Adventurer } from './adventurer'
import { Class } from './class'
import { Race } from './race'
import { Shield } from './shield'
import { Attack, Wepon } from './wepon'

export type Origin = Race | Class | Wepon | Shield

export enum ActionType {
    BONUS,
    MAIN,
}

export enum ActionProviders {
  RACE = 'race',
  CLASS = 'class',
  MAINHAND = 'mainhand',
  OFFHAND = 'offhand',
  ARMOR = 'armor',
}

export interface Action {
    name: String,
    description: String,
    type: ActionType,
    attack?: Attack,
    effect?: (adventurer: Adventurer) => void
    cost?: number,
}

export type Actions = {[key in ActionProviders]?: Action[]}