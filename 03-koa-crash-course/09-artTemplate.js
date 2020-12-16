/**
 *  http://aui.github.io/art-template/koa/
 * 
 *  1. 安装：
 *  npm install --save art-template
    npm install --save koa-art-template
    2. 引入
    const render = require('koa-art-template')
    3.
    render(app, {
        root: path.join(__dirname, 'view'), //试图的位置
        // extname: '.art', //定义后缀名
        debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
    });
    4.
    await ctx.render('xxx')
 */

const Koa = require('koa')
const Router = require('koa-router')
// 2.
const render = require('koa-art-template')
const path = require('path')

const app = new Koa()
const router = new Router()

// 3.
render(app, {
    root: path.join(__dirname+'/09-artTemplate', 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async ctx => {
    // 5. 模板语法，和06-ejs- htmlBoilerplate.js一样：详见官方文档
    // http://aui.github.io/art-template/zh-cn/docs/syntax.html
    let list = { name: 'zs'}
    // 4. 
    ctx.render('09-artTemplate', {
        list: list
    })
})

router.get('/news', async ctx => {
    ctx.body = '新闻'
})



app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3009, ()=> console.log('listen on port 3009'))