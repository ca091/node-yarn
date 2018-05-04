var fs = require('fs')
var path = require('path')

var str = fs.readFileSync(path.resolve(__dirname, './version.json'), 'utf-8')
var obj_v = JSON.parse(str);
console.log(obj_v.v)

++obj_v.v;
console.log(obj_v)

fs.writeFileSync('version.json', JSON.stringify(obj_v))

console.log(fs.access(path.resolve(__dirname, '../temp/'), fs.constants.R_OK, err => {
	if(err){
		fs.mkdirSync(path.resolve(__dirname, '../temp/'))
	}
}))
// fs.writeFileSync('../temp/index.js', 'var a = 1;')
