const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require('tapable');

class Car{
    constructor(){
        this.hooks = {
            accelerate: new SyncHook(['newSpeed']),
            break: new SyncHook(),
            calculateRoute: new AsyncParallelHook(['source', 'target', 'routesList'])
        }
    }
    setSpeed(newSpeed){
        this.hooks.accelerate.call(newSpeed)
    }
}

module.exports = Car;