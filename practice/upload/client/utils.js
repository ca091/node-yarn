function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  let byteCharacters = atob(b64Data)
  let byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)

    let byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    let byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, {type: contentType})
}

// let b64 = 'data:image/png;base64,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'
// let b64Data = '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'
// var blob = b64toBlob(b64Data, 'image/png');

// fetch(b64)
// .then(res => res.blob())
// .then(blob => {
//     a.href = URL.createObjectURL(blob);
//     a.download = "qr.png";
//     a.textContent = "Download Png!";
//     document.body.appendChild(a);
// });

/**
 * 生成可下载链接(文本和图片)
 * @param data :string
 * @param attr_download
 * @param text_content
 */
function generateDownload({data, attr_download, text_content}) {
  if (typeof data === 'string') {
    let a = document.createElement('a')
    a.href = data.match(/data:image\/(png|jpeg|jpg);base64,/) ? data : URL.createObjectURL(new Blob([data]))
    a.download = attr_download
    a.textContent = text_content
    return a
  } else {
    return null
  }
}

/**
 * 解析blob文件
 * @param blob
 * @returns {Promise<any>}
 */
function parseDataFromBlob(blob) {
  return new Promise(((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = e => {
      console.log(blob.name + ' 读取完成')
      resolve(e.target.result) // 图片的Base64地址 or 文本
    }
    reader.onerror = e => {
      reject(e)
    }
    reader.onprogress = e => {
      if (e.lengthComputable) {
        let percentLoaded = (e.loaded / e.total * 100).toFixed(2)
        console.log(blob.name + ' 读取进度: ' + percentLoaded + '%')
      }
    }
    reader.onabort = () => {
      console.log(blob.name + ' 读取中断')
    }
    if (blob.type === 'text/plain') {
      reader.readAsText(blob)
    } else if (/image\//g.test(blob.type)) {
      reader.readAsDataURL(blob)
    } else {
      reader.readAsBinaryString(blob)
    }
  }))
}

/**
 * 页面添加dom元素
 * @param el_a
 */
function appendDom(el_a) {
  if (el_a) {
    let div = document.createElement('div')
    div.appendChild(el_a)
    document.body.appendChild(div)
  }
}

/**
 * 页面输出日志消息
 * @param args
 */
function appendMessage(...args) {
  let [ele, msg] = args
  if (args.length === 1) {
    msg = ele
    ele = 'p'
  }
  let element = document.createElement(ele)
  element.textContent = msg
  document.body.appendChild(element)
}

function appendMsg(msg, root = document.body, el = 'p') {
  let element = document.createElement(el)
  element.textContent = msg
  root.appendChild(element)
}

function upload(blobOrFile) {
  let xhr = new XMLHttpRequest()
  xhr.onload = () => {
    let json = JSON.parse(xhr.responseText)
    console.log(json)
  }
  xhr.open('POST', '/upload', true)
  xhr.send(blobOrFile)
  //xhr.sendAsBinary(blobOrFile);
}

/**
 * 拖拽上传,支持多文件
 * @param files
 */
function uploadFiles(files) {
  let xhr = new XMLHttpRequest()
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  xhr.onload = () => {
    let json = JSON.parse(xhr.responseText)
    console.log(json)
  }
  let fd = new FormData()
  for (let i = 0, l = files.length; i < l; i++) {
    fd.append('photos', files[i])
  }
  xhr.open('post', '/multiple', true)
  xhr.send(fd)
}
