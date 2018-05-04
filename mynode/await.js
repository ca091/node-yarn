function sync(fn, time, args) {
    // Promise.resolve()
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(fn(args))
        }, time)
    })

}

function log(msg='test') {
    console.log(msg)
}

function getId(id) {
    log(id);
    return id
}

const asyncName = async function () {
    const name1 = await sync(getId, 1000, 'cao');
    const name2 = await sync(getId, 1000, name1 + ' qi');
    const name3 = await sync(getId, 1000, name2 + ' hello');
    return name3
}

asyncName().then(v=>log(v)).catch(e=>log(e))