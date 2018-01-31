const path = require('path');
const AnyProxy = require('anyproxy');
const exec = require('child_process').exec;

if(!AnyProxy.utils.certMgr.ifRootCAFileExists()){
    AnyProxy.utils.certMgr.generateRootCA((error, keyPath) => {
        if(!error){
            const certDir = path.dirname(keyPath);
            console.log('the cert is generate at', certDir);
            const isWin = /^win/.test(process.platform);
            if(isWin){
                exec('start .', {cwd: certDir})
            }else{
                exec('open .', {cwd: certDir})
            }
        }else{
            console.error('error when generate rootCA', error)
        }
    })
}else{
    console.log('the rootCA is exists')
}