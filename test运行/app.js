const express = require('express')
const app = express()

const PORT = 8080

// 设置一个简单的路由
app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
