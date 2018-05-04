// 立即resolve的Promise对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时

setTimeout(()=>{
    console.log('1')
}, 0)

Promise.resolve().then(()=>{
    console.log('Promise.resolve')
})

function add() {
    setTimeout(()=>{
        console.log('add over')
    },0)
}

console.log('begin')
add()
console.log('end')

setImmediate(()=>console.log('immediate'))
process.nextTick(()=>console.log('nextTick'))

/*
 begin
 end
 nextTick   <= 本轮事件循环结束，nextTick先于Promise.resolve()
 Promise.resolve
 1      <= 下一轮事件循环开始
 add over
 immediate
 */