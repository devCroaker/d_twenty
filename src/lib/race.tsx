import { Attribute } from './attribute'

enum Size {
  SMALL,
  MEDIUM,
  LARGE,
}

type BonusAttribute = Attribute

export interface Race {
  name: string,
  attributeBonus: { attribute: BonusAttribute, bonus: number }[]
  size: Size,
  actions?: [],
  proficiencies: [],
}

export class Races {

  static [key: string]: any

  static readonly HUMAN: Race = {
    name: 'human',
    attributeBonus: [
      {attribute: Attribute.STR, bonus: 1},
      {attribute: Attribute.DEX, bonus: 1},
      {attribute: Attribute.CON, bonus: 1},
      {attribute: Attribute.MND, bonus: 1},
    ],
    size: Size.MEDIUM,
    proficiencies: [],
  }
  static readonly DWARF: Race = {
    name: 'dwarf',
    attributeBonus: [
      {attribute: Attribute.CON, bonus: 2},
      {attribute: Attribute.MND, bonus: 1},
    ],
    size: Size.MEDIUM,
    proficiencies: [],
  }
  static readonly ELF: Race = {
    name: 'elf',
    attributeBonus: [
      {attribute: Attribute.DEX, bonus: 2},
      {attribute: Attribute.MND, bonus: 1},
    ],
    size: Size.MEDIUM,
    proficiencies: [],
  }
  static readonly ORC: Race = {
    name: 'orc',
    attributeBonus: [
      {attribute: Attribute.STR, bonus: 2},
      {attribute: Attribute.CON, bonus: 1},
    ],
    size: Size.MEDIUM,
    proficiencies: [],
  }
  static readonly GNOME: Race = {
    name: 'gnome',
    attributeBonus: [
      {attribute: Attribute.MND, bonus: 2},
      {attribute: Attribute.CON, bonus: 1},
    ],
    size: Size.SMALL,
    proficiencies: [],
  }
  static readonly HALFLING: Race = {
    name: 'halfling',
    attributeBonus: [
      {attribute: Attribute.DEX, bonus: 2},
      {attribute: Attribute.CON, bonus: 1},
    ],
    size: Size.SMALL,
    proficiencies: [],
  }

  private constructor(private readonly race: Race) {}

  static getRaces() {
    return Object.entries(Races).map(pair => pair[0])
  }
}

// Can access an array of available races like this
// console.log(Races.getRaces().length)
// Races.getRaces().forEach(race => console.log(Races[race]))
