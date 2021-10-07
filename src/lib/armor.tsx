import { Attribute, Attributes } from './attribute'

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
  formula: (attributes: Attributes) => number,
}

export class Armors {

  static [key: string]: any

  static readonly NONE: Armor = {
    name: 'none',
    type: ArmorType.LIGHT,
    minStrength: 0,
    value: 0,
    formula: (attributes: Attributes) => 10 + attributes.getBonus(Attribute.DEX),
  }

  static readonly LEATHER: Armor = {
    name: 'leather',
    type: ArmorType.LIGHT,
    minStrength: 0,
    value: 10,
    formula: (attributes: Attributes) => 11 + attributes.getBonus(Attribute.DEX),
  }

  static readonly BREASTPLATE: Armor = {
    name: 'breastplate',
    type: ArmorType.MEDIUM,
    minStrength: 0,
    value: 400,
    formula: (attributes: Attributes) => 14 + Math.min(2, attributes.getBonus(Attribute.DEX)),
  }

  static readonly PLATE: Armor = {
    name: 'plate',
    type: ArmorType.HEAVY,
    minStrength: 15,
    value: 1500,
    formula: (attributes: Attributes) => 18,
  }

  private constructor(private readonly armor: Armor) {}

  static getArmors() {
    return Object.entries(Armors).map(pair => pair[0])
  }
} 