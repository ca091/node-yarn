function add() {
  return [...arguments].reduce((re, cur) => re + cur, 0)
}

module.exports = {
  add
}
