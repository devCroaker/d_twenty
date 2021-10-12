import React from 'react'
import { Adventurer } from './lib/adventurer'
import { Attributes } from './lib/attribute'
import { Races } from './lib/race'
import { Classes } from './lib/class'
import { Armors } from './lib/armor'
import { d } from './lib/dice'
import { grid } from './map/map'

const adventurer = new Adventurer(
  new Attributes(d(3,6), d(3,6), d(3,6), d(3,6)),
  Races.HUMAN,
  [{level: 1, class: Classes.FIGHTER}]
)

const logAdventurer = () => {
  const {
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
    armor
  } = adventurer

  console.log(`The current adventurer`)
  console.log(`Hitpoints: ${current}/${max} | ArmorClass: ${ac}`)
  console.log(`Race: ${race} | Level: ${level} | Class: ${characterClass}`)
  console.log(`STR: ${strength}, DEX: ${dexterity}, CON: ${constitution}, MND: ${mind}`)
  console.log(`Proficiency Bonus: ${proficiency}`)
  console.log(`Equipt Armor: ${armor}`)
}

logAdventurer()
adventurer.addClassLevels({level: 1, class: Classes.WIZARD}, {level: 2, class: Classes.FIGHTER})
adventurer.equipArmor(Armors.BREASTPLATE)
logAdventurer()

function App() {
  return (
    <div>
      {grid.map((line, x) => {
        return line.map((cell, y) => {
          const cellStyle = {
            position: 'absolute',
            left: (y*64),
            top: (x*64),
            height: 64,
            width: 64,
            backgroundColor: (cell === 1) ? 'brown' : 'green'
          }
          //@ts-ignore
          return <div key={`${x}_${y}`} style={cellStyle} />
        })
      })}
    </div>
  )
}

export default App
