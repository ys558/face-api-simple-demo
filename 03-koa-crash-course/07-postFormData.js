const Koa =require('koa')
const Router = require('koa-router')
const views = require('koa-views')

const common = require('./07-postFormData/module/common.js')
const bodyParser = require('koa-bodyparser')

const router = new Router()
const app = new Koa()

app.use(views('07-postFormData/views', {
    extension: 'ejs'
}))

router.get('/', async ctx => {
    await ctx.render('formData')
})

// 1. 用原生 Nodejs 获取 post 提交数据
// router.post('/nodejspost', async ctx => {
//     const data = await common.getPostData(ctx);
//     ctx.body = data
// })

// 2. 用koa-bodyparser中间件处理：
// 2.1 安装：npm i -S koa-bodyparser
// 2.2 引入，在上面
// 2.3 配置：（注：用这种方法提交表单，不能和上面那种nodejs原生方法提交同时使用，否则会发生阻塞）
app.use(bodyParser());
router.post('/koabodyparser', async ctx => {
   // 2.4 获取表单提交的数据 ctx.request.body
    ctx.body = ctx.request.body
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3007, console.log(`on port 3007`)
)