/**
 * koa-static 静态资源中间件的应用：
 * 1. npm install --save koa-stati
 * 2. const static=require('koa-static');
 * 3. app.use(static( path.join(__dirname, 'public') ))
 */

const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
// 2.
const koaStatic = require('koa-static')

const app = new Koa()
const router = new Router()

app.use(views('08-static-koaStaticMiddleware/views', {
    extension: 'ejs'
}))
// 3. 以下无聊哪种写法路径均不可为中文
// 3.1 几种写法：
// 相对路径写法：
// ！！！注意，这里的路径是前半部，一般统一放在static文件夹里：
.use(koaStatic('08-static-koaStaticMiddleware/static'))
// 3.2 绝对路径写法：use absolute paths
// .use(koaStatic(__dirname + '08-static-koaStaticMiddleware/static'))

// 4. 同一个koa文件的koa-Static中间件可以配置多个，如：
// app.use(koaStatic('08-static-koaStaticMiddleware/xxx'))

console.log(__dirname);




router.get('/', async ctx => {
    await ctx.render('koa-static')
})

app.use(bodyParser())
router.post('/koastatic', async ctx => {
    ctx.body = ctx.request.body
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3008, ()=> {console.log('listen on port 3008')})