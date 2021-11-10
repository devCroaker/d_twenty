import { Effect } from './action';
import { DiceNotation } from './dice'

export enum DamageType {
  PIERCING = "piercing",
  BLUDGEONING = "bludgeoning",
  SLASHING = "slashing",
}

export enum AttackType {
  MELEE = "melee",
  FINESS = "finess",
  RANGED = "ranged",
  SPELL = "spell",
}

export interface Attack extends Effect {
  damageType: DamageType,
  magical: boolean,
  attackType: AttackType
  damage: DiceNotation,
}