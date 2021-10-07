export enum Attribute {
  STR = 'str',
  DEX = 'dex',
  CON = 'con',
  MND = 'mnd',
}

const STR = Attribute.STR
const DEX = Attribute.DEX
const CON = Attribute.CON
const MND = Attribute.MND

interface attribute {
  name: String,
  abreviation: Attribute,
  description: String,
  value: number,
}

function str(value: number): attribute {
  return {
    name: 'strength',
    abreviation: STR,
    description: 'Stat used for melee and thrown wepons, and physical skills',
    value,
  }
}

function dex(value: number): attribute {
  return {
    name: 'dexterity',
    abreviation: DEX,
    description: 'Stat sed for ranged wepons, armor class, and stealth skills',
    value,
  }
}

function con(value: number): attribute {
  return {
    name: 'constitution',
    abreviation: CON,
    description: 'Stat used for calculating hit point, and resistances',
    value,
  }
}

function mnd(value: number): attribute {
  return {
    name: 'mind',
    abreviation: MND,
    description: 'Stat used for spell attacks, spell dc, and mind skills',
    value,
  }
}

export class Attributes {
  private _strength: attribute
  private _dexterity: attribute
  private _constitution: attribute
  private _mind: attribute
  constructor(strength: number, dexterity: number, constitution: number, mind: number) {
    this._strength = str(strength)
    this._dexterity = dex(dexterity)
    this._constitution = con(constitution)
    this._mind = mnd(mind)
  }
  get strength() {
    return this._strength.value
  }
  get dexterity() {
    return this._dexterity.value
  }
  get constitution() {
    return this._constitution.value
  }
  get mind() {
    return this._mind.value
  }
  set strength(value: number) {
    this._strength = str(value)
  }
  set dexterity(value: number) {
    this._dexterity = dex(value)
  }
  set constitution(value: number) {
    this._constitution = con(value)
  }
  set mind(value: number) {
    this._mind = mnd(value)
  }
  getAttribute(attribute: Attribute) {
    switch (attribute) {
      case STR: 
        return this._strength.value
      case DEX: 
        return this._dexterity.value
      case CON: 
        return this._constitution.value
      case MND: 
        return this._mind.value
      default:
        return 1
    }
  }
  setAttribute(attribute: Attribute, value: number) {
    switch (attribute) {
      case STR: 
        this._strength = str(value)
        break
      case DEX: 
        this._dexterity = dex(value)
        break
      case CON: 
        this._constitution = con(value)
        break
      case MND: 
        this._mind = mnd(value)
        break
      default:
        break
    }
  }
  getBonus(attribute: Attribute) {
      return Math.floor((this.getAttribute(attribute)-10)/2)
  }
}