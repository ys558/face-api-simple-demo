// 封装：
const MongoClient = require('mongodb').MongoClient
const config = require('./config')

class Db {
    /**1. 单例模式性能优化： */
    static getInstance() {
        if (!Db.instance) {
            // ！！！！在这实例化，以后调用无需再实例化：
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor() {
        this.dbClient = '' /**属性，用来放db对象 */
        // 2. 另一种模式性能优化：初始化时即连接数据库
        // this.connect()
    }
    // 连接数据库：
    connect() { 
        // let _that = this
        return new Promise((resolve, reject)=>{
            /* 1. 单例模式的优化：解决数据库多次连接的问题
            如果没有连接数据库：
            */
            if(!this.dbClient) {
                MongoClient.connect(config.url, (err, client) => {
                    if (err) {
                        reject(err)
                    }else{
                        this.dbClient = client.db(config.dbName)
                        /**则用dbClient连接*/
                        resolve(this.dbClient)
                    }
                })
            }else{
                resolve(this.dbClient)
            }
        })

    }
    // find函数式异步的，所以仍要封装在promise里，否则拿不到数据：
    // find(collectionName, json) {
    //     this.connect().then((db)=> {
    //         const result = db.collection(collectionName).find(json)
    //         result.toArray((err, docs)=>{
    //             console.log(docs)
    //         })
    //     })
    // }
    find(collectionName, json){
        return new Promise((resolve, reject) => {
            this.connect().then( db => {
                const result = db.collection(collectionName).find(json)
                // console.log(result)
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err)
                        return
                    }else{
                        resolve(docs)
                    }
                })
            })
        })
    }

    insert() {}
}

// // 没封装前可以发现这两次的查询都接近2秒，性能没有提升：
// console.time('**封装后性能测试')
// const myDb = new Db
// myDb.find('user', {}).then(data => {
//     // console.log(data)
//     console.timeEnd('封装后第一次性能测试')
// })
// console.time('封装后第一次性能测试')
// /* 封装后第一次性能测试: 2044.151ms */ 

// console.time('第二次查询性能')
// myDb.find('user', {}).then(data => {
//     // console.log(data)
//     console.timeEnd('第二次查询性能')
// })
// /*第二次查询性能: 2048.303m*/ 


/**
 * 1.但测试时不能用两次一样的测试，因为这两次测试都是异步的，所以会一直走if(!this.dbClient)处代码
 * 又不准确，
 * 这里暂时封装在setTimeout函数里：
 */
// ！！！！这里为什么要用setTimeout(),因为myDb.find().then()本身就是异步函数，如果不用宏任务包装，那么每次调用都会是认为第一次调用
const myDb = Db.getInstance()
setTimeout( ()=>{
    console.time('封装实例化后第一次查询，需连数据库，耗时')
    myDb.find('user', {}).then(data => {
        // console.log(data)
        console.timeEnd('封装实例化后第一次查询，需连数据库，耗时')
    })
},0)
/**封装实例化后第一次查询，需连数据库，耗时: 2032.989ms */

setTimeout(()=>{
    console.time('第二次查询性能')
    myDb.find('user', {}).then(data => {
        // console.log(data)
        console.timeEnd('第二次查询性能')
    })
},3000)
/**第二次查询性能: 6.037ms*/

const myDb2 = Db.getInstance()
setTimeout( ()=>{
    console.time('重新实例化后再查')
    myDb2.find('user', {}).then(data => {
        // console.log(data)
        console.timeEnd('重新实例化后再查')
    })
},5000)
/**重新实例化后再查: 1.198ms */

setTimeout(()=>{
    console.time('重新实例化后第二次查')
    myDb2.find('user', {}).then(data => {
        // console.log(data)
        console.timeEnd('重新实例化后第二次查')
    })
},7000)
/**重新实例化后第二次查: 1.415ms*/


