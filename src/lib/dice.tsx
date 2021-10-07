export type dice = 1|2|4|6|8|10|12|20|100

export function d(count: number, dice: dice) {
  let total = 0
  for (let i = 0; i < count; i++) total += Math.floor(Math.random()*dice)+1
  console.log(`rolled ${count}d${dice} and got: ${total}`)
  return total
}

export function d0(count: number, dice: dice) {
  let total = 0
  for (let i = 0; i < count; i++) total += Math.floor(Math.random()*dice)
  console.log(`rolled zero index ${count}d${dice} and got: ${total}`)
  return total
}

export function avg(count: number, sides: number) {
  let total = 0
  for (let i = 0; i < count; i++) total += Math.floor(sides/2)+0.5
  return total
}

export default dice