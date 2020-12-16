const Koa=require('koa')
const Router =require('koa-router')
const path = require('path')

const app = new Koa()
const router = new Router()

// 1.2 
const admin = require('./routes/admin')
const api = require('./routes/api')
// 2.
const render = require('koa-art-template')

// 1. 这些路由都应该拆分为独立模块：
router.get('/', ctx => {
    ctx.body=`总的首页`
})
// router.get('/admin',ctx => {
//     ctx.body=`后台管理首页`
// })

// 1.3
//  /admin 配置子路由 层级路由：
router.use('/admin', admin)
//  /api
router.use('/api', api)


// 2. 配置模板引擎：
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})


// 启动路由：
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3017, ()=> console.log(`listen on port 3017`))