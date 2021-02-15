// 1.1 
const Router = require('koa-router')
const router = new Router()

const user = require('./admin/user')

router.get('/', async ctx => {
    await ctx.render('admin/user/index')
})

router.use('/user', user)

module.exports=router.routes();