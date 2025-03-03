const http = require('http')
const url = require('url')
const fs = require('fs')
const mime = require('./mime').types
const path = require('path')

const server = http.createServer(function (request, response) {
  let pathname = url.parse(request.url).pathname
  // 判断路径是否以/结尾，如果是，则添加上index.html文件名
  if (pathname.charAt(pathname.length - 1) === '/') {
    pathname += 'index.html'
  }
  let realPath = path.join('dist', pathname)
  let ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown'
  fs.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain',
      })

      response.write(
        'This request URL ' + pathname + ' was not found on this server.'
      )
      response.end()
    } else {
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain',
          })
          response.end('err')
        } else {
          let contentType = mime[ext] || 'text/plain'
          response.writeHead(200, {
            'Content-Type': contentType,
          })
          response.write(file, 'binary')
          response.end()
        }
      })
    }
  })
})

server.listen(80, '0.0.0.0', function () {
  console.log('服务器已经开启,http://127.0.0.1/index.html')
})
