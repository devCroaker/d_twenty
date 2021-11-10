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

export enum EffectType {
  ATTACK,
  HEAL,
}

export interface Effect {
  type: EffectType
  targets: Targets[]
  effect: (source: Adventurer, target: Adventurer) => void
}

export interface Action {
    name: String,
    description: String,
    type: ActionType,
    effect?: Effect
    cost?: number,
}

export type Actions = {[key in ActionProviders]?: Action[]}