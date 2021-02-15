const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()


// 1.获取query参数
// 地址栏输入： http://localhost:3002/newscontent?aid=456 后：
router.get('/newscontent', async ctx => {
    /**
     *  从ctx读取get传值：
     * 在 koa2 中 GET 传值通过 request 接收，但是接收的方法有两种：query 和 querystring。
     * query：返回的是格式化好的参数对象。 querystring：返回的是请求字符串。
     * */

    console.log(ctx.query)
    console.log(ctx.request.query)
    // 控制台打印：
    // [Object: null prototype] { aid: '456' }

    console.log(ctx.querystring)
    console.log(ctx.request.querystring);
    // aid=456

    console.log(ctx.url);
    //  /newscontent?aid=456

    // 从request里获取：
    console.log(ctx.request);
    // { method: 'GET',
    //   url: '/newscontent?aid=456',
    //   header:
    //    { host: 'localhost:3002',
    //      connection: 'keep-alive',
    //      'cache-control': 'max-age=0',
    //      'upgrade-insecure-requests': '1',
    //      'user-agent':
    //       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
    //      'sec-fetch-mode': 'navigate',
    //      'sec-fetch-user': '?1',
    //      accept:
    //       'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    //      'sec-fetch-site': 'none',
    //      'accept-encoding': 'gzip, deflate, br',
    //      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
    //      cookie: 'Webstorm-2dcb7e29=ebc8592a-a75e-4bd5-a922-0bc5e6365d39' } }
    
    ctx.body = 'query路由传值，即?&传值'
})

// 2. 获取动态路由传值：
router.get('/newscontent/:aid/:cid', async (ctx,next) =>{
    console.log(ctx.params)
    // 浏览器打开： http://localhost:3002/newscontent/hehe/33
    // { aid: 'hehe', cid: '33' }
    
    ctx.body =`动态路由传值`
})


app.use(router.routes())
.use(router.allowedMethods())

app.listen(3002, () => console.log('starting at port 3002'))