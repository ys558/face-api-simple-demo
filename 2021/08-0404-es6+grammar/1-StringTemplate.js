/**
 *  标签字符串：类似于函数的传参
 *  @第一个参数 ： 除了${}以外的部分
 *  @第二个参数 ： ${}里面的部分，可以用解构...接收所有${}的参数，否则则按形参一个个传入
 * 
 */

const custom = (strings, ...placeholder) => {
    console.log(strings)
    console.log(placeholder)
}

const firstName = '呵呵'
const hobby = '点赞'

// 类似普通函数使用：
console.log(custom`my name is ${firstName}, my hobby is ${hobby}`)
// [ 'my name is ', ', my hobby is ', '' ]
// [ '呵呵', '点赞' ]

// 实际运用：
// 让占位符添加css样式：
const a = (arr, ...placeholder) => arr.reduce((prev, cur, i) => prev + `<span class="addColor">${placeholder[i-1]}</span>`+ cur)

console.log(a`my name is ${firstName}, my hobby is ${hobby}`)
// my name is <span class="addColor">呵呵</span>, my hobby is <span class="addColor">点赞</span> 