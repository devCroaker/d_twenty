import dice, { d } from './dice'
import { Attribute, Attributes } from './attribute'
import { Race } from './race'
import { Class, Level } from './class'
import { Armor, Armors } from './armor'
import { Wepon, WeponHand, Wepons, WeponType } from './wepon'
import { Shield, isShield } from './shield'
import { Action, Actions } from './action'
import { AttackType, DamageType } from './attack'

interface Health {
  max: number,
  current: number
}

interface Equiptment {
  armor: Armor,
  mainHand: Wepon,
  offHand: Wepon | Shield
}

type BonusType = AttackType | DamageType | WeponType

interface Bonus {
  value: number,
  name: string
}

type Bonuses = {
  [key in BonusType]?: Bonus[]
}

interface CharacterClass {
  level: Level,
  class: Class
}

export class Adventurer {
  private _attributes: Attributes
  private _race: Race
  private _classes: CharacterClass[] = []
  private _health: Health = {
    max: 0,
    current: 0,
  }
  private _equiptment: Equiptment = {
    armor: Armors.NONE,
    mainHand: Wepons.UNARMED,
    offHand: Wepons.UNARMED
  }
  private _baseAc: number = 10
  private _bonuses: Bonuses = {}
  private _actions: Actions = {}

  constructor(attributes: Attributes, race: Race, characterClass: Class) {
    this._race = race
    race.attributeBonus.forEach(attributeBonus => {
      const { attribute, bonus } = attributeBonus
      attributes.setAttribute(attribute, attributes.getAttribute(attribute)+bonus)
    })
    this._attributes = attributes
    this.levelUp(characterClass)
    this.equipArmor(Armors.NONE)
    this.equipMainHand(Wepons.UNARMED)
    this.equipOffHand(Wepons.UNARMED)
  }

  get ac() {
    const shieldBonus = (isShield(this.offHand)) ? this.offHand.shieldBonus : 0
    const { baseAc: armorBase, maxDex } = this.armor
    const dexBonus = this.attributes.getBonus(Attribute.DEX)
    return this._baseAc + armorBase + (Math.min(dexBonus, maxDex)) + shieldBonus
  }

  get actions() {
    return ([] as Action[]).concat(...Object.values(this._actions))
  }

  get armor() {
    return this._equiptment.armor
  }

  get attributes() {
    return this._attributes
  }

  get class() {
    return this._classes
      .map(classLevel => `${classLevel.class.name} ${classLevel.level}`)
      .join(' / ')
  }

  get classes() {
    return  this._classes
      .reduce((classes: {[key: string]: number}, characterClass: CharacterClass) => ((classes[characterClass.class.name] = characterClass.level, classes)), {})
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

  addBonus(type: BonusType, bonus: Bonus) {
    this._bonuses[type] = [...(this._bonuses[type] || []), bonus]
  }

  getBonus(type: BonusType) {
    return (this._bonuses[type]) ? this._bonuses[type]?.map(bonus => bonus.value).reduce((a,b) => a + b) : 0 
  }

  addClassLevels(...characterClass: CharacterClass[]) {
    characterClass.forEach(characterClass => {
      for (let i = 0; i < characterClass.level; i++) this.levelUp(characterClass.class)
    })
  }

  addHitpoints(hitDice: dice) {
    const conBonus = this._attributes.getBonus(Attribute.CON)
    const increase = Math.max(1, (conBonus + ((this.level === 1) ? hitDice : d({ number: 1, dice: hitDice}))))
    this._health.max += increase
    this._health.current += increase
  }

  damage(amount: number) {
    this._health.current = Math.max(0, this._health.current - amount)
  }

  equipArmor(armor: Armor) {
    this._equiptment.armor = armor
  }

  equipMainHand(wepon: Wepon) {
    this._equiptment.mainHand = wepon
    this._actions.mainhand = (wepon.actions?.mainhand) ? wepon.actions.mainhand : []
    if (wepon.hand === WeponHand.TWO) {
      this._equiptment.offHand = wepon
    }
  }

  equipOffHand(item: Wepon | Shield) {
    this._equiptment.offHand = item
    this._actions.offhand = (item.actions?.offhand) ? item.actions.offhand : []
  }

  heal(amount: number) {
    this._health.current = Math.min(this._health.max, this._health.current + amount)
  }

  levelUp(characterClass: Class) {
    let newLevel: Level
    const idx = this._classes.findIndex(classLevel => classLevel.class.name === characterClass.name)
    if (idx === -1 ) {
      this._classes.push({
        level: 1,
        class: characterClass
      })
      newLevel = 1
    } else {
      this._classes[idx].level += 1
      newLevel = this._classes[idx].level
    }

    this.addHitpoints(characterClass.hitDice)
    const actions = characterClass.levels.find(level => level.level === newLevel)?.actions
    if (actions) this._actions.class = ((this._actions.class) ? this._actions.class : ([] as Action[])).concat(actions)
  }

  unequipArmor() {
    this.equipArmor(Armors.NONE)
  }

  /* Util functions */
  log() {
    const {
      actions,
      health: {
        current, max
      },
      ac,
      race,
      level,
      proficiency,
      class: characterClass,
      attributes: {
        strength, dexterity, constitution, mind,
      },
      armor,
      mainHand,
      offHand
    } = this

    console.log(`-----------------------------`)
    console.log(`The current adventurer`)
    console.log(`Hitpoints: ${current}/${max} | ArmorClass: ${ac}`)
    console.log(`Race: ${race} | Level: ${level} | Class: ${characterClass}`)
    console.log(`STR: ${strength}, DEX: ${dexterity}, CON: ${constitution}, MND: ${mind}`)
    console.log(`Proficiency Bonus: ${proficiency}`)
    console.log(`Equipt Armor: ${armor.name}`)
    console.log(`Equipt MainHand: ${mainHand.name}`)
    console.log(`Equipt OffHand: ${offHand.name}`)
    console.log(actions)
    console.log(`-----------------------------`)
  }

}