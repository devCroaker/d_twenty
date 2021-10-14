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

export interface Action {
    name: String,
    description: String,
    type: ActionType,
    attack?: Attack
    cost?: number,
    condition: (adventurer: Adventurer) => Boolean,
}