import dice, { d } from './dice'
import { Attribute, Attributes } from './attribute'
import { Race } from './race'
import { ClassLevel } from './class'
import { Armor, Armors } from './armor'
import { Attack, Wepon, Wepons } from './wepon'
import { Shield, isShield } from './shield'

type Health = {
  max: number,
  current: number
}

type Equiptment = {
  armor: Armor,
  mainHand: Wepon,
  offHand: Wepon | Shield
}

export class Adventurer {
  private _attributes: Attributes
  private _race: Race
  private _classes: ClassLevel[] = []
  private _health: Health = {
    max: 0,
    current: 0,
  }
  private _armorClass: number
  private _equiptment: Equiptment = {
    armor: Armors.NONE,
    mainHand: Wepons.UNARMED,
    offHand: Wepons.UNARMED
  }

  private _baseAttack: Attack

  constructor(attributes: Attributes, race: Race, classes: ClassLevel[], armor?: Armor) {
    this._race = race

    race.attributeBonus.forEach(bonus => {
      const attr = (bonus.attribute !== 'any') ? bonus.attribute : Attribute.STR
      attributes.setAttribute(attr, attributes.getAttribute(attr)+bonus.bonus)
    })
    this._attributes = attributes
    
    this.addClassLevels(...classes)

    this._armorClass = Armors.NONE.formula(this._attributes)
    if (armor) this.equipArmor(armor)

    this._baseAttack = Wepons.UNARMED.attack
  }

  get ac() {
    return this._armorClass
  }
  get armor() {
    return this._equiptment.armor
  }
  get attributes() {
    return this._attributes
  }
  get class() {
    return  this._classes
      .map(classLevel => `${classLevel.class.name} ${classLevel.level}`)
      .join(' / ')
  }
  get health() {
    return this._health
  }
  get level() {
    return (this._classes.length > 0) ? this._classes
      .map(classLevel => classLevel.level as number)
      .reduce((prev, next) => prev + next) : 0
  }
  get mainHand() {
    return this._equiptment.mainHand
  }
  get proficiency() {
    return Math.ceil((this.level/4)+1)
  }
  get offHand() {
    return this._equiptment.offHand
  }
  get race() {
    return this._race.name
  }

  addClassLevels(...classLevels: ClassLevel[]) {
    classLevels.forEach(classLevel => {
      const { level, class: { name, hitDice } } = classLevel

      this.addHitpoints(hitDice, level)
  
      const classIndex = this._classes.findIndex(classLevel => classLevel.class.name === name)
      if (classIndex === -1) this._classes.push(classLevel)
      else this._classes[classIndex].level += level
    })
  }

  addHitpoints(hitDice: dice, times: number) {
    const conBonus = this._attributes.getBonus(Attribute.CON)
    for (let i = 0; i < times; i++) {
      const increase = Math.max(1, (conBonus + ((this.level === 0 && i === 0) ? hitDice : d(1, hitDice))))
      this._health.max += increase
      this._health.current += increase
    }
  }

  equipArmor(armor: Armor) {
    const shieldBonus = (isShield(this.offHand)) ? this.offHand.shieldBonus : 0
    this._armorClass = armor.formula(this._attributes) + shieldBonus
    this._equiptment.armor = armor
  }

  unequipArmor() {
    const shieldBonus = (isShield(this.offHand)) ? this.offHand.shieldBonus : 0
    this._armorClass = Armors.NONE.formula(this._attributes) + shieldBonus
    this._equiptment.armor = Armors.NONE
  }

}