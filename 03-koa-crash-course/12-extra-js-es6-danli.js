// 单例模式定义：
// 无论实例化多少次，类里的构造函数只执行一次。有利于提高性能

class Db {
    constructor() {
        console.log('实例化会触发构造的函数')
        this.connect()
    }
    connect () { console.log('连接数据库') }
    find() { console.log('查询数据库') }

    // ！！！！用静态方法封装单例模式的思路：
    static getInstance() {
        // 如果Db上没有实例化的方法，那么实例化Db：
        if(!Db.instace) { Db.instace =  new Db() }
        // 如果有实例，直接返回实例，不用重新实例化：
        return Db.instace
    }
}

// 1. 没封装静态方法前：
// const myDb = new Db()
// const myDb1 = new Db()
// 如果没有封装单例模式，每次调用都会触发'实例化会触发构造的函数'
/*
实例化会触发构造的函数
连接数据库
实例化会触发构造的函数
连接数据库
*/

// 2. 封装完后调用类里的静态方法：
const myDb = Db.getInstance()
const myDb2 = Db.getInstance()
// 控制台只输出了一次：
// 实例化会触发构造的函数
// 连接数据库

myDb2.find()
// 查询数据库