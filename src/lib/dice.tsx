export type dice = 1|2|4|6|8|10|12|20|100

export interface DiceNotation {
  number: number,
  dice: dice,
  bonus?: number
}

export function d(notation: DiceNotation) {
  const { number, dice, bonus = 0 } = notation
  let total = 0
  for (let i = 0; i < number; i++) total += Math.floor(Math.random()*dice)+1
  total += bonus
  console.log(`rolled ${number}d${dice} and got: ${total}`)
  return total
}

export function d0(notation: DiceNotation) {
  const { number, dice } = notation
  let total = 0
  for (let i = 0; i < number; i++) total += Math.floor(Math.random()*dice)
  console.log(`rolled zero index ${number}d${dice} and got: ${total}`)
  return total
}

export function avg(notation: DiceNotation) {
  const { number, dice } = notation
  let total = 0
  for (let i = 0; i < number; i++) total += Math.floor(dice/2)+0.5
  return total
}

export default dice