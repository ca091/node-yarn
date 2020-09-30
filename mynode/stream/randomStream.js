const stream = require('stream')
const Chance = require('chance')

const chance = new Chance()

class RandomStream extends stream.Readable {
  constructor(opts) {
    super(opts)
  }

  _read(size) {
    const chunk = chance.string()
    console.log(`Pushing chunk of size: ${chunk.length}`)
    this.push(chunk, 'utf8')
    if (chance.bool({likelihood: 5})) {
      this.push(null)
    }
  }
}

module.exports = RandomStream
