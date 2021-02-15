// async await
async function testAsync() {
    return 'hello async'
}
// const result = testAsync();
// console.log(result);
// // Promise { 'hello async' }

// 1.1 获取async数据的方法1：promise的.then()
// 但仍有回调
const result = testAsync();
// result.then(data => { console.log(data) })

// 1.2 获取async数据的方法2: 定义变量用await
async function getData() {
    return '张三'
}

async function test() {
    const v2 = await testAsync()
    const v1 = await getData()
    console.log(v1, v2)
}
// test()

// 2. await的阻塞功能
// 以下代码不会打印'张三'
async function test2() {
    console.log(1);
    await getData()
    console.log(2);
    console.log(3);
}
// test2()
// 1
// 2
// 3

// 3. async定义的方法返回值是Promise对象：
// 3.1 以前的.then()获取方式：
// function getData2() {
//     return new Promise((resolve,rejects) => {
//         setTimeout(()=>{
//             const username = '张三'
//             resolve(username)
//         },1000)
//     })
// }
// const p = getData2()
// p.then(function(d){console.log(d);
// })

// 3.2 awai获取方式：再封装一个函数，用await阻塞获取
function getData2() {
    return new Promise((resolve,rejects) => {
        setTimeout(()=>{
            const username = '张三'
            resolve(username)
        },1000)
    })
}
async function test() {
    const data = await getData2()
    console.log(data);
}
test()