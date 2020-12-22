function add() {
  return [...arguments].reduce((re, cur) => re + cur, 0)
}

export {
  add
}
