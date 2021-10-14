import dice, { d } from './dice'
import { Attribute, Attributes } from './attribute'
import { Race } from './race'
import { Class, ClassLevel } from './class'
import { Armor, Armors } from './armor'
import { Wepon, WeponHand, Wepons } from './wepon'
import { Shield, isShield } from './shield'
import { Action, Origin } from './action'

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
  private _equiptment: Equiptment = {
    armor: Armors.NONE,
    mainHand: Wepons.UNARMED,
    offHand: Wepons.UNARMED
  }

  constructor(attributes: Attributes, race: Race, classes: ClassLevel[]) {
    this._race = race
    race.attributeBonus.forEach(attributeBonus => {
      const { attribute, bonus } = attributeBonus
      attributes.setAttribute(attribute, attributes.getAttribute(attribute)+bonus)
    })
    this._attributes = attributes
    this.addClassLevels(...classes)
    this.equipArmor(Armors.NONE)
    this.equipMainHand(Wepons.UNARMED)
    this.equipOffHand(Wepons.UNARMED)
  }

  get ac() {
    const shieldBonus = (isShield(this.offHand)) ? this.offHand.shieldBonus : 0
    return this.armor.formula(this.attributes) + shieldBonus
  }
  get actions() {
    const classes: Class[] = this._classes.map(classLevel => classLevel.class)
    const sources: Origin[] = [this._race, this.mainHand, this.offHand, ...classes,]
    const actions: Set<Action> = new Set()
    sources.forEach(source => {
      if (source.actions) source.actions.forEach(action => {
        if (action.condition(this)) actions.add(action)
      })
    })
    return Array.from(actions)
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
  get classes() {
    return  this._classes
      .reduce((classes: {[key: string]: number}, characterClass: ClassLevel) => (classes[characterClass.class.name] = characterClass.level, classes), {})
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
    this._equiptment.armor = armor
  }

  unequipArmor() {
    this.equipArmor(Armors.NONE)
  }

  equipMainHand(wepon: Wepon) {
    if (wepon !== Wepons.UNARMED) this.unequipMainHand()
    this._equiptment.mainHand = wepon
    if (wepon.hand === WeponHand.TWO) {
      this.unequipOffHand()
      this._equiptment.offHand = wepon
    }
  }

  equipOffHand(item: Wepon | Shield) {
    if (item !== Wepons.UNARMED) this.unequipOffHand()
    this._equiptment.offHand = item
  }

  unequipMainHand() {
    this.equipMainHand(Wepons.UNARMED)
  }

  unequipOffHand() {
    this.equipOffHand(Wepons.UNARMED)
  }

}