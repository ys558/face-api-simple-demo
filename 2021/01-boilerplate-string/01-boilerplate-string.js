const yy = 'yy', action = 'action'

// 当传入的参数为``字符串模板，则传入的参数被分为两组参数，
/**
 *  标签字符串：类似于函数的传参
 *  @第一个参数 ： 除了${}以外的部分
 *  @第二个参数 ： ${}里面的部分，可以用解构...接收所有${}的参数，否则则按形参一个个传入
 * 
 */

const tag = ( arr, ...rest) => {
    console.log(arr)
    console.log(...rest)
}

const ret = tag`这是模板字符串的内容${yy}, ${action}。这是标签模板板以外的内容`

console.log(ret)
// [ '这是模板字符串的内容', ', ', '。这是标签模板板以外的内容' ]
// yy action

