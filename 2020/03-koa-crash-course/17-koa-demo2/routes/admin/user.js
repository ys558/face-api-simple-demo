// 用户的增删改查
const Router = require('koa-router')
const router = new Router()

router.get('/', async ctx=> {
    ctx.body = `admin/user首页`
})

router.get('/add', async ctx => {
    // ctx.body = '用户增加'
    // 2.
    await ctx.render('admin/user/add')
})

router.get('/edit', async ctx => {
    // ctx.body = '编辑用户'
    // 2.
    await ctx.render('admin/user/edit')
})

router.get('/delete', async ctx => {
    ctx.body = '编辑用户'
})

module.exports = router.routes()