const Router = require('koa-router')
const router = new Router()

router.get('/', ctx => {
    ctx.body=`api/newslist`
})

router.get('/hehe', ctx => {
    ctx.body = `api/newslist/hehe，api下的新闻分类列表首页`
})

module.exports = router.routes();