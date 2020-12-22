// use CommonJS at ES Module

import m from './cjs/math.cjs'

console.log(m.add(1, 2, 3))

// Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.

import {add} from './esm/math.mjs'

console.log(add(1, 2))

