+ [函数柯里化]()：

```js
function plus() {
    console.log(arguments) // [Arguments] { '0': 1 }
    let args = arguments;
    let inner = function () {
        args.push(...arguments)
    }
    return inner
}
console.log(plus(1)) // 正确
console.log(plus(1)(2)) // 错误 TypeError: args.push is not a function
```

将上面的`let args = arguments;`改为：`let args = Array.prototype.slice.call( arguments )`：  
但传入第三个参数时，还是报错，还未实现延迟输入：  
```js
function plus() {
    let args = Array.prototype.slice.call( arguments )
    let inner = function () {
        args.push(...arguments)
        let sum = args.reduce((prev, cur)=> prev + cur )
        return sum
    }
    return inner
}
console.log(plus(8)) // [Function: inner]
console.log(plus(1)(2)) // 正确
console.log(plus(1)(2)(3)) // 错误 TypeError: plus(...)(...) is not a function
```

这种情况就需要递归，不可能写无限个`sum`函数来配合无限个参数：
```js
function plus() {
    let args = Array.prototype.slice.call( arguments )
    let inner = function () {
        args.push(...arguments)
        return inner
    }
    return inner
}
console.log(plus(1)(2)) // [Function: inner]
console.log(plus(1)(2)(3)) // [Function: inner]

```

node调用.toString()方法，可打印出来函数本体:   
```shell
function () {
    args.push(...arguments)
    return inner
}
```
由此得出提示，return inner可以重写.toString()得以实现出结果：  
```js
function plus() {
    let args = Array.prototype.slice.call( arguments )
    let inner = function () {
        args.push(...arguments)
        return inner
    }
    inner.toString = function () {
        return args.reduce( (prev, cur) => prev + cur )
    }
    return inner
}
```
但其执行的结果，浏览器和node执行还有不同：
```js
console.log(plus(1)(2)(3))
// 浏览器结果：ƒ 6
// node结果：[Function: inner] { toString: [Function (anonymous)] }
console.log(typeof plus(1)(2)(3)) 
// 浏览器和node均为：funcion
```

可以发现，无论浏览器还是node，结果仍需执行一次`.toString()`方法才能进行正常输出：  
```js
console.log(plus(1)(2)(3).toString())
// 浏览器和node均为：6

console.log(plus(1,2,3)(4).toString())
// 浏览器和node均为：10
```

箭头函数在柯里化中的应用：  
```js
const curring = function (name) {
    return function(el) {
        return el[name]
    }
}

// 可简写为：
const curring = name => el => el[name]
```

+ [标签模板作为函数传参]()：
