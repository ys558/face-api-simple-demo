/**
 * npm i --save koa-router
 */
// 1. 引入
const Koa = require('koa')
const Router = require('koa-router')
// 2.实例化，启动中间件
const app = new Koa()
const router = new Router()

// 3. 用get方法获取信息：
// ctx是context的缩写，包含request和response等信息
router
    .get('/', function (ctx, next) {
    ctx.body = 'front page' // 返回数据，相当于原生里的res.writeHead() res.end()
})
    .get('/news', async ctx => ctx.body = 'news')

// 4. 启动路由设置：
app
    .use(router.routes()) // 作用：启动路由
    .use(router.allowedMethods()) // 根据ctx.status设置response的相应头，官方文档推荐写法 https://www.npmjs.com/package/koa-router

app.listen(3000, () => console.log('starting at port 3000'))