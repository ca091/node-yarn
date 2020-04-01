let array = Array(12).fill('qq.com')

let list = array.slice(0, 12)
let spare = array.slice(12)

console.log(list)
console.log(spare.shift() || 'random')
