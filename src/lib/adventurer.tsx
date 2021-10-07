import dice, { d } from './dice'
import { Attribute, Attributes } from './attribute'
import { Race } from './race'
import { ClassLevel } from './class'
import { Armor, Armors } from './armor'

interface Health {
  max: number,
  current: number
}

interface ArmorClass {
  value: number,
  armor: Armor
}

export class Adventurer {
  private _attributes: Attributes
  private _race: Race
  private _classes: ClassLevel[] = []
  private _health: Health = {
    max: 0,
    current: 0,
  }
  private _armorClass: ArmorClass

  constructor(attributes: Attributes, race: Race, classes: ClassLevel[], armor?: Armor) {
    this._race = race

    race.attributeBonus.forEach(bonus => {
      const attr = (bonus.attribute !== 'any') ? bonus.attribute : Attribute.STR
      attributes.setAttribute(attr, attributes.getAttribute(attr)+bonus.bonus)
    })
    this._attributes = attributes
    
    this.addClassLevels(...classes)

    this._armorClass = {
      value: Armors.NONE.formula(this._attributes),
      armor: Armors.NONE,
    }
    if (armor) this.equipArmor(armor)
  }

  get ac() {
    return this._armorClass.value
  }
  get armor() {
    return this._armorClass.armor.name
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
    this._armorClass.value = armor.formula(this._attributes)
    this._armorClass.armor = armor
  }

}