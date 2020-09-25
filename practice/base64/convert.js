const fs = require('fs')
const path = require('path')

function convertImg() {
  let bit = fs.readFileSync(path.resolve(__dirname, './mail.png'))
  let imgBase64 = Buffer.from(bit, 'binary').toString('base64')
  console.log(imgBase64)
}

function convertBase64(base64Data) {
  // base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
  // let buffer = new Buffer(base64Data, 'base64')
  let buffer = Buffer.from(base64Data, 'base64')
  let imgPath = path.resolve(__dirname, `./mail${Math.floor(Math.random() * 1000)}.png`)
  fs.writeFile(imgPath, buffer, err => {
    console.warn(err)
  })
}

// convertImg()
convertBase64(require('./data_img'))
