import { Action, Actions, ActionType } from "./action"
import { AttackType, DamageType, Attack } from './attack'

export enum WeponType {
    SIMPLE,
    MARTIAL,
    EXOTIC,
}

export enum WeponHand {
    MAIN,
    ONE,
    TWO,
}

export interface Wepon {
    name: string,
    type: WeponType,
    hand: WeponHand,
    value: number,
    attack?: Attack,
    actions?: Actions,
}

export class Wepons {
    static [key: string]: any

    static readonly UNARMED: Wepon = {
        name: 'unarmed',
        type: WeponType.SIMPLE,
        hand: WeponHand.ONE,
        value: 0,
        attack: {
            damageType: DamageType.BLUDGEONING,
            magical: false,
            attackType: AttackType.MELEE,
            damage: {number: 1, dice: 1}
        },
        actions: {
            offhand: [{
                name: 'Unarmed Strike - OffHand',
                description: 'A quick strick with your offhand',
                type: ActionType.BONUS,
                attack: {
                    damageType: DamageType.BLUDGEONING,
                    magical: false,
                    attackType: AttackType.MELEE,
                    damage: {number: 1, dice: 1}
                }
            }]
        },
    }

    static readonly LONGSWORD: Wepon = {
        name: 'longsword',
        type: WeponType.MARTIAL,
        hand: WeponHand.MAIN,
        value: 15,
        attack: {
            damageType: DamageType.SLASHING,
            magical: false,
            attackType: AttackType.MELEE,
            damage: {number: 1, dice: 8}
        },
    }

    private constructor(private readonly wepon: Wepon) {}

    static getWepons() {
        return Object.entries(Wepons).map(pair => pair[0])
    }
}