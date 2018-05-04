function testMap() {
    var re = Promise.all([1, 2, 3].map(async item => item ** 2));
    re.then(d => console.log(d));
}

function testReduce() {
    var re_reduce = [1, 2, 3].reduce(async (accumulator, item) => await accumulator + item, 0);
    re_reduce.then(d => console.log(d))
}

function testForOf() {
    Array.prototype.forEachSync = async function (callback, thisArg) {
        for (let [index, item] of Object.entries(this)) {
            console.log(index, item);
            await callback(item, index, this)
        }
    };

    function api(item, index, context) {
        console.log(item, index, context);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`result: ${item}`)
            }, 1500)
        })
    }

    [1,2,3].forEachSync(api).then(d => console.log(d))
}

function testSome(){
    Array.prototype.someSync = async function (callback, thisArg) {
        for (let [index, item] of Object.entries(this)) {
            console.log(index, item);
            if(await callback(item, index, this)) return true;
        }
        return false
    };

    function api(item, index, context) {
        console.log(item, index, context);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(item==3)
            }, 1500)
        })
    }

    [1,2,3].someSync(api).then(d => console.log(d))
}

function api(item, index, context) {
    console.log(item, index, context);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`result: ${item}`)
        }, 1500)
    })
}

//async 返回promise
//await 必须写在async函数里, await {promise}
async function forOf(arr, callback) {
    for (let [index, item] of Object.entries(arr)) {
        console.log(index, item);
        await callback(item, index, arr)
    }
    return 'execute over';
}
forOf([1,2,3], api).then(re => console.log(re));

// testForOf()

