import React from 'react'
import { Adventurer } from './lib/adventurer'
import { Attributes } from './lib/attribute'
import { Races } from './lib/race'
import { Classes } from './lib/class'
import { Armors } from './lib/armor'
import { Wepons } from './lib/wepon'
import { Shields } from './lib/shield'
import { d, DiceNotation } from './lib/dice'
import { grid } from './map/map'

const statDice: DiceNotation = {number: 3, dice: 6}
const adventurer = new Adventurer(
  new Attributes(d(statDice), d(statDice), d(statDice), d(statDice)),
  Races.HUMAN,
  Classes.FIGHTER
)

adventurer.log()
adventurer.addClassLevels({level: 1, class: Classes.WIZARD}, {level: 2, class: Classes.FIGHTER})
adventurer.equipArmor(Armors.BREASTPLATE)
adventurer.equipMainHand(Wepons.LONGSWORD)
adventurer.equipOffHand(Shields.SHIELD)
adventurer.log()

;(window as any).adventurer = adventurer

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
