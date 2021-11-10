import { Adventurer } from './adventurer'
import { Class } from './class'
import { Race } from './race'
import { Shield } from './shield'
import { Wepon } from './wepon'
import { Attack } from './attack'

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

export enum Targets {
  SELF,
  ALLY,
  ENEMY,
}

export interface Effect {
  targets: Targets[]
  effect: (adventurer: Adventurer) => void
}

export interface Action {
    name: String,
    description: String,
    type: ActionType,
    attack?: Attack,
    effect?: Effect
    cost?: number,
}

export type Actions = {[key in ActionProviders]?: Action[]}