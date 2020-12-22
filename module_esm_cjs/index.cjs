// use ES Module at CommonJS, ES Module is async at loading、resolution、evaluation

(
  async () => {
    let m = await import('./esm/math.mjs')
    console.log(m.add(1, 2, 3, 4))
  }
)();

import ('./esm/math.mjs').then(m => {
  console.log(m.add(1, 2, 3))
})

const m = require('./cjs/math.cjs')

console.log(m.add(1, 2))
