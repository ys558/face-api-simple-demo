//http://mongodb.github.io/node-mongodb-native/3.0/quick-start/quick-start/

/*
nodejs操作mongodb数据库
1.安装mongodb、
    npm install mongodb --save

2.引入mongodb下面的MongoClient
    var MongoClient = require('mongodb').MongoClient;

3.定义数据库连接的地址 以及配置数据库
    koa数据库的名称

    var url = 'mongodb://localhost:27017/';
    var dbName = 'koa'

4.nodejs连接数据库

MongoClient.connect(url,function(err,client){
        const db = client.db(dbName);  // 数据库db对象
})

5.操作数据库
    db.user.insert
    MongoClient.connect(url,function(err,db){
            db.collection('user').insertOne({"name":"张三"},function(err,result){

                db.close() //关闭连接
            })
    })
*/

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'koa-crash-course'

// 官方提供的数据库操作方法：不能直接用！！！！必须优化！！！！
// **测试性能：
console.time('**测试性能：')
MongoClient.connect(url, (error, client) => {
    if(error) { 
        console.log(error); 
        return
    }
    const db=client.db(dbName)
    // 增加数据：
    db.collection('user').insertOne({
        'username': '王五2',
        'age': 34,
        'gender': 'M',
        'status': '0'
    }, (error, result) => {
        if(!error) { console.log('数据增加成功') }
        client.close()
        // **测试性能：
        console.timeEnd('**测试性能：')
        // **测试性能：: 1043.232ms
        // ！！！插入一条数据足足耗费了1秒多！，主要时间都耗费在连接和关闭数据库上
    })
})

// 单例模式封装：
/*
1. 新建
    14-consealMongoByNode/module/config.js
    14-consealMongoByNode/module/db.js
2. 其余内容见这两个文件里的内容
*/