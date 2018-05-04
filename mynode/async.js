const fs = require('fs');
const thunkify = require('thunkify');
const co = require('co');

const read = thunkify(fs.readFile);

read('../package.json')(function (err, data) {
	if(err){
		return console.log(err.message);
	}
	console.log(data)
});

// thunk + generator

/**
 * generator 自动流程管理, 利用thunk将异步操作的回调函数拆分出来
 * @param fn generator函数
 */
function run(fn){
	var gen = fn();

	/**
	 * 异步操作的回调函数
	 * @param err
	 * @param data
	 */
	function callback(err, data){
		if(err){
			return console.log(err.message)
		}
		if(data){
			console.log('data: ', data);
		}
		var result = gen.next();
		if(result.done) return;
		result.value(callback);//通过thunk函数递归, 这里代表一个完整的异步操作
	}

	callback()
}

function* g(){
	yield read('../package.json', 'utf8');
	yield read('../server.js', 'utf8');
	yield read('../webpack.config.js', 'utf8');
}

//run(g);



// promise + generator

var readFile = function (fileName) {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf8', function (err, data) {
			if(err){
				return reject(err)
			}
			resolve(data)
		})
	});
};

/**
 * 自动执行器
 * @param fn generator函数
 */
function go(fn){
	var gener = fn();

	function callback(){
		var result = gener.next();
		if(result.done) return;
		result.value.then(
			data => {
				console.log('readFile promise ', data);
				callback()
			},
			err => console.log('readFile error ', err.message)

		)
	}

	callback()
}

function* gen(){
	yield readFile('../package.json');
	yield readFile('../server.js');
	yield readFile('../webpack.config.js');
}

//go(gen);

co(function* () {
	var a = new Promise(
		(resolve, reject) => {
			setTimeout(() => {
				resolve(1)
			}, 2000)
		}
	);
	var b = new Promise(
		(resolve, reject) => {
			setTimeout(() => {
				resolve(2)
			}, 2000)
		}
	);
	var c = new Promise(
		(resolve, reject) => {
			setTimeout(() => {
				resolve('c')
			}, 2000)
		}
	);
	return yield [a, b, c];
}).then(
	data => console.log('readFile promise ', data),
	err => console.log('readFile error ', err.message)
).catch(
	err => console.log(err.stack)
);