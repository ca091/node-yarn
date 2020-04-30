// 立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时

setTimeout(() => console.log(1))
try {
  setImmediate(() => {
    console.log(2)
    throw Error()
  })
} catch (e) {
  console.log(3)
}
Promise.resolve().then(() => console.log(4))
process.nextTick(() => console.log(5))

/*
 begin
 end
 nextTick   <= 本轮事件循环结束，nextTick先于Promise.resolve()
 Promise.resolve
 1      <= 下一轮事件循环开始
 add over
 immediate
 */
