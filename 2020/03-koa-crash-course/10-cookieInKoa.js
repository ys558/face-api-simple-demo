// cookie 是存储于访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域 名的时候共享数据。
// HTTP 是无状态协议。简单地说，当你浏览了一个页面，然后转到同一个网站的另一个页 面，服务器无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何 关系的

// 1. 保存用户信息：
// 2. 浏览过的历史记录，
// 3. 猜你喜欢的功能
// 4. 10天免登陆
// 5. 多个页面的数据传递，例如购物车功能

const Koa = require('koa')
const Router = require('koa-router')

const render = require('koa-art-template')
const path = require('path')

const app = new Koa()
const router = new Router()

render(app, {
    root: path.join(__dirname+'/10-cookieInKoa', 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})

router.get('/', async ctx => {
    // 1. 设置cookies：
    // 1.1 ctx.cookies.set(name,value,[options])
    // [options]可选值有：
    // maxAge： 过期时间，毫秒为单位 一个数字表示从 Date.now() 得到的毫秒数
    // expires： cookie 过期的Date
    // cookie： 路径, 默认是'/'
    // domain： cookie 域名
    // secure： 安全 cookie 默认 false，设置成 true 表示 只有 https 可以访问
    // httpOnly： 是否只是服务器可访问 cookie, 默认是true

    // ctx.cookies.set('userinfo', 'zhangsan', {
    //     // 1.2 一般情况只配置过期时间即可：
    //     maxAge: 1000*60*60*24,
    //     // 1.3 设置path：表示只有具体哪些路径才可以访问：
    //     path: '/getcookie',
    //     // 1.4 多域名限制设置：正常情况下不用设置
    //     /**
    //      * 如百度有多个子域名：
    //      * a.baidu.com
    //      * b.baidu.com
    //      */
    //     // 这样写表示所有百度域名下的子站均可访问：
    //     // domain:'.baidu.com'

    //     // 1.5 httpOnly: 
    //     //  false表示客户端可以访问，即js前端可以访问，
    //     //  true时表示只有服务器端才能访问，客户端不能更改
    //     httpOnly: false,


    // })
    
    // 2. 设置中文cookie
    // ！！！！ koa的cookie设置有bug，不能设置中文：终端输出：
    // TypeError: argument value is invalid
    // 需利用buffer base64解决：
    let userinfoSetCookie = Buffer.from('张三').toString('base64')
    ctx.cookies.set('userinfo', userinfoSetCookie, {
        maxAge: 1000*60*60*24,
    })

    ctx.render('10-setCookie')
})

router.get('/getcookie', async ctx => {
    // const userinfo = ctx.cookies.get('userinfo')
    // ctx.render('10-getCookie', {
    //     userinfo: userinfo
    // })

    // 2. 设置中文字的cookie:
    let userinfo = Buffer.from(ctx.cookies.get('userinfo'), 'base64').toString()
    ctx.render('10-getCookie', {
        userinfo: userinfo
    })
})

router.get('/o', async ctx =>{
    const userinfo = ctx.cookies.get('userinfo')
    // 1.3 设置了path，页面会显示undefined
    ctx.body = `设置了path，其他页面，拿不到cookie:${userinfo}`
})

// ！！！！ 这里出过错：错误写法：app.use(router.route())
// if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3010, () => console.log('listen on port 3010'))