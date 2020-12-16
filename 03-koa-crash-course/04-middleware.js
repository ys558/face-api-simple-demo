const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 1.应用及中间件：
// ！！！！无论app.use()写在哪里，都优先执行，后再执行其他路由中间件：
// app.use(async (ctx, next) => {
//     // 有调用next中间件情况下，输入 http://localhost:3003/middleware 后仍然出现这个页面：
//         ctx.body = '中间件拦截的页面'
//     })

app.use(async (ctx, next) => {
    // 1. 匹配任何页面前打印日期：
    console.log(new Date());
    
    // 2. 打印完日期后继续往下走：
    await next()
})

// 2.路由级中间件
router.get('/middleware', async (ctx, next) => {
    console.log('控制台中间件');
    // 2.1 http://localhost:3003/middleware 后
    // 处理顺序：先在控制台打印 控制台中间件，再在页面中显示 中间件页面
    await next()
})  

// 3.错误处理中间件：
app.use(async (ctx, next)=> {
    await next();
    if(ctx.status == 404 ) {
        ctx.status = 404
        ctx.body = '404页面'
    }else{
        console.log(`访问的url：${ctx.url}`);
    }
})

// 4. 中间件执行顺序，见图 04-koa中间件执行流程middleware-浏览器打开.gif
// 和洋葱图



router
    .get('/middleware', async (ctx, next)=> {
        ctx.body = '中间件页面'
    })

app
    .use(router.routes())
    .use(router.allowedMethods()) 

app.listen(3003, () => console.log('starting at port 3003'))