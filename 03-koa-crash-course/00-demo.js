/**
 * 简单的koa运行：
 * 1. npm init -y
 * 2. npm i --save koa
 * 3. touch "01-demo.js" 写以下代码
 * 4. node 01-demo.js 运行
 */

const koa = require('koa')
const app = new koa()

app.use(async (ctx)=> {
    ctx.body='hello koa'
})

app.listen(3000)