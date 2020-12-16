const Router = require('koa-router')
const router = new Router()

const newslist = require('./api/newslist')

router.get('/', async ctx => {
    ctx.body = { title: "这是api首页" }
})

router.use('/newslist', newslist)

module.exports = router.routes();