// 函数柯里化：
function uri_curring ( protocol ) {
    return function ( hostname, pathname ) {
        return `${protocol}${hostname}${pathname}`
    }
}

const uri_https = uri_curring('https://')

const uri2 = uri_https('www.happy.com','/点赞')
// 相当于：
// const uri2 = uri_curring('https://')('www.happy.com','/点赞')
const uri3 = uri_https('www.happy.com','/收藏')

console.log(uri2) // https://www.happy.com/点赞
console.log(uri3) // https://www.happy.com/收藏


// 作用1. 用于 浏览器兼容性检查：以下代码用于浏览器script
// const whichEvent = (() => {
//     if ( window.addEventListener ) {
//         return ( ele, type, listener, useCapture ) => {
//             ele.addEventListener( type, e => {
//                 listener.call(ele, e)
//             }, useCapture)
//         }
//     }else if ( window.attachEvent ) {
//         ele.attachEvent(`on${type}`, e => handler.call(ele, e))
//     } 
// })()



// 作用2. 用于延迟执行：
// 面试题：不定化传参，写一个plus函数，传入不定的参数全部加起来得出返回结果，如：
// plus(1)(2)(3) = 6
// plus(1)(2)(3)(4)(5) = 15
// plus(1,2,2)(4) = 9
// plus(1)(2,5) = 8

function plus() {
    let args = Array.prototype.slice.call( arguments )
    let inner = function () {
        args.push(...arguments)
        return inner
    }
    inner.toString = () => args.reduce( (prev, cur) => prev + cur )
    return inner
}

console.log(plus(1)(2)(3))
// 浏览器结果：ƒ 6
// node结果：[Function: inner] { toString: [Function (anonymous)] }
console.log(typeof plus(1)(2)(3)) 
// 浏览器和node均为：funcion
console.log(plus(1)(2)(3).toString())
// 浏览器和node均为：6

console.log(plus(1,2,3)(4).toString())
// 浏览器和node均为：10


// 箭头函数在柯里化中的应用：
const nameList1 = [
    { mid: '沙皇', profession: '中单' },
    { mid: '哈傻k', profession: '中单' },
    { mid: '卡牌', profession: '中单' },
    { mid: '发条', profession: '中单' },
]
const nameList2 = [
    { adc: '轮子妈', profession: 'ADC' },
    { adc: 'VN', profession: 'ADC' },
    { adc: '老鼠', profession: 'ADC' },
]
console.log(nameList1.map(hero => hero.mid)) // [ '沙皇', '哈傻k', '卡牌', '发条' ]
console.log(nameList2.map(hero => hero.adc)) // [ '轮子妈', 'VN', '老鼠' ]

// 如果数组增多，则应该封装独立的方法进行柯里化：
// const curring = function (name) {
//     return function(el) {
//         return el[name]
//     }
// }

// 以上的函数可以简写为箭头=>函数
const curring = name => el => el[name]

console.log(nameList1.map(curring('mid'))) // [ '沙皇', '哈傻k', '卡牌', '发条' ]
console.log(nameList2.map(curring('adc'))) // [ '轮子妈', 'VN', '老鼠' ]


// 写法2：
const curry = (fn, len = fn.length) => currySelf.call(this, fn, len)

const currySelf = (fn,len,...args) => (...params) => {
  const _args = [...args,...params];
  console.log(_args)
  if(_args.length >= len){
      return fn.apply(this, _args);
  }else{
      return currySelf.call(this, fn, len, ..._args)
  }
}

const _fn = curry((a,b,c,d,e) => console.log(a + b + c + d + e));

_fn(1,2,3,4,5);
// [ 1, 2, 3, 4, 5 ]
// 15
_fn(1)(2)(3,4,5);
// [ 1 ]
// [ 1, 2 ]
// [ 1, 2, 3, 4, 5 ]
// 15
_fn(1,2)(3,4)(5);  
// [ 1, 2 ]
// [ 1, 2, 3, 4 ]
// [ 1, 2, 3, 4, 5 ]
// 15
_fn(1)(2)(3)(4)(5);
// [ 1 ]
// [ 1, 2 ]
// [ 1, 2, 3 ]
// [ 1, 2, 3, 4 ]
// [ 1, 2, 3, 4, 5 ]
// 15