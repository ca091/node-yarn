let express = require('express');
let path = require('path');
let fs = require('fs');

let app = express();

let Readable = require('stream').Readable;
let multer  = require('multer');
let upload = multer({ dest: path.join(__dirname, 'uploads') });

app.use(express.static(path.join(__dirname, 'client')));

app.post('/single', upload.single('avatar'), function (req, res, next) {
	// req.file 是 `avatar` 文件的信息
	// req.body 将具有文本域数据, 如果存在的话
	res.json({msg: '1'});
	//next();
	//res.end();
});

app.post('/multiple', upload.array('photos', 12), function (req, res, next) {
	// req.files 是 `photos` 文件数组的信息
	// req.body 将具有文本域数据, 如果存在的话
	res.json({msg: '1'});
});


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './client/blob.html'))
});


app.post('/upload', function (req, res) {
	req.setEncoding('utf8');

	let rs = new Readable();

	req.on('data', (chunk) => {
		rs.push(chunk)
	});
	req.on('end', function () {
		rs.push(null);
		//rs.pipe(out);
		fs.writeFile('./client/uploads/a.png', rs, (err) => {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	});


	//const writer = fs.createWriteStream('./www/uploads/a.png');
	//
	//writer.on('pipe', () => {
	//	console.error('something is piping into the writer');
	//});
	//req.pipe(writer);
	//
	//res.send({msg: '1'});

});

let PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});
