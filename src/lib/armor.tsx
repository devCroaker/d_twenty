enum ArmorType {
  LIGHT,
  MEDIUM,
  HEAVY,
}

export interface Armor {
  name: string,
  type: ArmorType,
  minStrength: number,
  value: number,
  baseAc: number, //AC given above ten
  maxDex: number,
}

export class Armors {

  static [key: string]: any

  static readonly NONE: Armor = {
    name: 'none',
    type: ArmorType.LIGHT,
    minStrength: 0,
    value: 0,
    baseAc: 0,
    maxDex: 10,
  }

  static readonly LEATHER: Armor = {
    name: 'leather',
    type: ArmorType.LIGHT,
    minStrength: 0,
    value: 10,
    baseAc: 1,
    maxDex: 10,
  }

  static readonly BREASTPLATE: Armor = {
    name: 'breastplate',
    type: ArmorType.MEDIUM,
    minStrength: 0,
    value: 400,
    baseAc: 4,
    maxDex: 2,
  }

  static readonly PLATE: Armor = {
    name: 'plate',
    type: ArmorType.HEAVY,
    minStrength: 15,
    value: 1500,
    baseAc: 8,
    maxDex: 0,
  }

  private constructor(private readonly armor: Armor) {}

  static getArmors() {
    return Object.entries(Armors).map(pair => pair[0])
  }
} 