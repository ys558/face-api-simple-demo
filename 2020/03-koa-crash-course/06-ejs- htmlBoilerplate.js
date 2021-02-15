/*
ejs模板引擎的使用：
1. 安装 koa-views： npm install --save koa-views
2. 安装 ejs： npm install ejs --save
3. 
const views = require('koa-views');
app.use(views(__dirname, { extension: 'pug' }))
4. await ctx.require('index')
*/
const Koa = require('koa'),
    router = require('koa-router')(),
    views = require('koa-views')

const app = new Koa()

// 1. 配置模板引擎第三方中间件两种方法：
// 1.1 渲染html文件，文件须以.htnl结尾
// app.use(views('06-ejs-htmlBoilerplate/views', {map: {html: 'ejs'}}))

// 1.2 渲染ejs文件，静态页面须以.ejs结尾
app.use(views('06-ejs-htmlBoilerplate/views', {
    extension: 'ejs'
}))


router.get('/', async ctx => {
    // 2. 渲染页面：
    let title = "hehe"
    await ctx.render('index', {
        title: title
    })
})

router.get('/1', async ctx => {
    
    // 2.1 循环数据：
    let arr = [11,22,33,44,55,66]
    
    // 2.2 页面引入外部文件：
    // 见页面demo.ejs 

    // 2.3 页面<% %>会原样输出后端数据，如：
    let a = `<h2><%= 变量a %></h2>`
    let a1 = `<h3>这是解析后的数据</h3>`
    
    // 2.4 if语句，简单，不演示

    await ctx.render('demo', {
        list: arr,
        a: a,
        a1: a1
    })
})


// 3. 公共数据放在中间件的state里，任何模板都能使用：
//   ctx.state = {
//     session: this.session,
//     title: 'app'
// };
app.use(async (ctx, next) => {
    ctx.state.userinfo = {name: 'zhangsan'}
    // 3.1 这里一定要记得写next，向下匹配，否则出不来页面：
    await next();
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3006, () => console.log(`start at port 3006`))