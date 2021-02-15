const Koa = require('koa')
const router = require('koa-router')()
const render = require('koa-art-template')
const path = require('path')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const Db = require('./14-consealMongoByNode/module/db')
/* 方法2，不封装：
const ObjectID = require('mongodb').ObjectID 
*/

render(app, {
    root: path.join(__dirname+'/14-consealMongoByNode', 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
})
app.use(bodyParser())

// 显示学生信息：
router.get('/', async ctx => {
    // 这里的find方法返回promise：所以得用await接收promise的结果：
    // 第一次在浏览器输入访问/，要连接数据库，所以耗时较慢：
    // console.time('hehe')
    const result = await Db.find('user', {})
    // console.timeEnd('hehe')
    
    await ctx.render('view.html', {
        list: result
    })
})

// 增加学生界面：
router.get('/add', async ctx => {
    // let data = await Db.insert('user', {
    //     'username': '赵六',
    //     'age': 30,
    //     'gender':'F',
    //     'status': '0'
    // })
    // console.log(data.result)
    await ctx.render('add.html')
})

// 处理增加学生的操作：
router.post('/doAdd', async ctx => {
    // console.log(ctx.request.body)
    const postNewItem =await Db.insert('user', ctx.request.body)
    try {
        if (postNewItem.result.ok) {
            ctx.redirect('/')
        }
    }catch(err){
        console.log(err)
        return ctx.redirect('/add')
    }
})

// 编辑学生信息：
router.get('/update', async ctx => {
    // let newData = await Db.update('user', {
    //     'username': '赵六',
    //     'age': 30,
    // }, {
    //     'username': 'hehe',
    //     'age': 27,
    // })
    // console.log(newData.result)
    // ctx.body= `${newData.result.toString()}`

    // 通过前端a标签传get过来的id获取学生信息：
    // console.log(ctx.query.id)
    // 5da5940952da7f37e0ca90d9
    const id = ctx.query.id
    // 
    let data = await Db.find('user', {_id: Db.getObjectID(id)})
    /*
    方法2，不封装在db.js里：
    但要在这里实例化 new
    let data = await Db.find('user', {_id: new ObjectID(id)})
     */

    // console.log(data)
    // [ { _id: 5da5940952da7f37e0ca90d9,
    // username: '张三',
    // age: 23,
    // gender: 'M',
    // status: '1' } ]

    await ctx.render('update.html',{
        data: data[0]
    })
})
router.post('/doUpdate', async ctx => {
    console.log(ctx.request.body)
    const id = ctx.request.body.id;
    const username = ctx.request.body.username;
    const age = ctx.request.body.age;
    const gender = ctx.request.body.gender;
    const dataUpdate = await Db.update('user',
        {_id: Db.getObjectID(id) },
        // es6 属性简写：
        { username, age, gender })
    console.log(dataUpdate.result)
    try{
        if(dataUpdate.result.ok) {
            ctx.redirect('/')
        }
    }catch(err){
        console.log(err)
        return ctx.redirect('/')
    }
})

// 删除学生信息：
router.get('/delete', async ctx => {
    const id = ctx.query.id
    let delData = await Db.delete('user', {
        _id: Db.getObjectID(id)
    })
    if(delData){
        ctx.redirect('/')
    }
})

// 查找学生信息：
router.get('/find', async ctx => {
    // 第二次继续访问/test，由于有长连接，所以查询速度提高，只有几毫秒
    console.time('hehe')
    const result = await Db.find('user', {})
    console.timeEnd('hehe')
    console.log(result)
    ctx.body = '查找记录'
})

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3015, ()=> console.log('listen on port 3015'))