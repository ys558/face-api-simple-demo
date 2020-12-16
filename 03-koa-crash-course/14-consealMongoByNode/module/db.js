// 引入方法1：
// const MongoClient = require('mongodb').MongoClient
// const ObjectID = require('mongodb').ObjectID

// 引入方法2：!!!可防止底层不是单例的引用情况
const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const ObjectID = MongoDB.ObjectID

const config = require('./config')
class Db {
    static getInstance() {
        if (!Db.instance) {
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor() {
        this.dbClient = ''
        //this.connect()
    }
    connect() { 
        return new Promise((resolve, reject)=>{
            if(!this.dbClient) {
                MongoClient.connect(config.url, (err, client) => {
                    if (err) {
                        reject(err)
                    }else{
                        this.dbClient = client.db(config.dbName)
                        resolve(this.dbClient)
                    }
                })
            }else{
                resolve(this.dbClient)
            }
        })
    }
    find(collectionName, json){
        return new Promise((resolve, reject) => {
            this.connect().then( db => {
                const result = db.collection(collectionName).find(json)
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
    insert(collectionName, json) {
        return new Promise((resolve, reject) =>{
            this.connect().then( db => {
                db.collection(collectionName).insertOne(json, (err, result)=>{
                    if(err) {
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }
    update(collectionName, json1, json2){
        return new Promise((resolve, reject)=> {
            this.connect().then( db => {
                db.collection(collectionName).updateOne( json1, 
                    { $set: json2 }, 
                    (err, result)=> {
                    if(err) {
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
            })
        })
    }
    delete(collectionName, json){
        return new Promise((resolve, reject) => {
            this.connect().then( db => {
                db.collection(collectionName).deleteOne(
                    json, (err, result) => {
                        if(err){
                            reject(err)
                        }else{
                            resolve(result)
                        }
                    }
                )
            })
        })
    }
    getObjectID(id) {
        /**mongodb 里查询_id，把字符串转换成对象 */
        return new ObjectID(id)
    }
}

module.exports=Db.getInstance();