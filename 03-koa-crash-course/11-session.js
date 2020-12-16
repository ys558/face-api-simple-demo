/**
    session 是另一种记录客户状态的机制，不同的是 Cookie 保存在客户端浏览器中，而 session 保存在服务器上。
        当浏览器访问服务器并发送第一次请求时，服务器端会创建一个session对象，生
    成一个类似于key,value的键值对， 然后将key(cookie)返回到浏览器(客户)端，浏览
    器下次再访问时，携带key(cookie)，找到对应的session(value)。 客户的信息都保存
    在session中
    1. 安装：
    npm install koa-session --save
    2. 引入
    const session = require('koa-session');
    3. 配置中间件
    app.keys = ['some secret hurr'];
    const CONFIG = {
    key: 'koa:sess', //cookie key (default is koa:sess)
    maxAge: 86400000, // cookie 的过期时间 maxAge in ms (default is 1 days)
    overwrite: true, //是否可以 overwrite (默认 default true)
    httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
    signed: true, //签名默认 true
    rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
    renew: false, //(boolean) renew session when session is nearly expired,
    };
    app.use(session(CONFIG, app));
    4. 设置值，获取值：
    ctx.session.username = "张三";
    ctx.session.username
*/

const Koa =  require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const path = require('path')

// 2. 
const session = require('koa-session')

const app = new Koa()
const router = new Router()

// 3. 
app.keys = ['some secret hurr']; //cookie的签名
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    maxAge: 1000*60, /** 【需要修改】 */
    renew: true, /** (boolean) 快到期时重设，默认false，【需要修改】*/
    rolling: true, /** (boolean) 表示每次访问都重设，默认false 
    建议改为true，和renew任选其一设置*/
    /**以下的比较少修改到： */
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) 只有服务器端可以访问，默认true */
    signed: true, /** (boolean) 默认true，只有服务器端可以访问，客户端不能访问 */
};
app.use(session(CONFIG, app))


render(app, {
    root: path.join(__dirname+'/11-session', 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'proudction'
})

router.get('/login', async ctx => {
    // 4. 设置
    ctx.session.userinfo = '张三'
    ctx.render('11-session.html')
})

router.get('/', async ctx => {
    // 4. 获取
    console.log(ctx.session.userinfo)
    ctx.body = `获取到的session: ${ctx.session.userinfo}`
})

router.get('/news', async ctx => {
    // 4. 在不同页面间能共享数据：
    console.log(`news页面拿到的session： ${ctx.session.userinfo}`)
    ctx.body = `news页面拿到的session：${ctx.session.userinf}`
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3011, ()=>console.log('listen on port 3011'))