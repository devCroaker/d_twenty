import { Attribute, Attributes } from "./attribute"
import { d } from './dice'

enum WeponType {
    SIMPLE,
    MARTIAL,
    EXOTIC,
}
enum DamageType {
    PIERCING,
    BLUDGEONING,
    SLASHING,
}
export enum WeponHand {
    MAIN,
    ONE,
    TWO
}

export interface Attack {
    range: boolean,
    damageType: DamageType,
    magical: boolean,
    toHit: (proficiency: number, attributes: Attributes) => number,
    damage: (attributes: Attributes) => number,
}

export interface Wepon {
    name: string,
    type: WeponType,
    hand: WeponHand,
    value: number,
    attack: Attack
}

export class Wepons {
    static [key: string]: any

    static readonly UNARMED: Wepon = {
        name: 'unarmed',
        type: WeponType.SIMPLE,
        hand: WeponHand.ONE,
        value: 0,
        attack: {
            range: false,
            damageType: DamageType.BLUDGEONING,
            magical: false,
            toHit: (proficiency: number, attributes: Attributes) => proficiency + attributes.getBonus(Attribute.STR),
            damage: (attribute: Attributes) => 1 + attribute.getBonus(Attribute.STR)
        }
    }

    static readonly LONGSWORD: Wepon = {
        name: 'longsword',
        type: WeponType.MARTIAL,
        hand: WeponHand.MAIN,
        value: 15,
        attack: {
            range: false,
            damageType: DamageType.SLASHING,
            magical: false,
            toHit: (proficiency: number, attributes: Attributes) => proficiency + attributes.getBonus(Attribute.STR),
            damage: (attribute: Attributes) => d(1,8) + attribute.getBonus(Attribute.STR)
        }
    }

    private constructor(private readonly wepon: Wepon) {}

    static getWepons() {
        return Object.entries(Wepons).map(pair => pair[0])
    }
}