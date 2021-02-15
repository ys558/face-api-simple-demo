const yy = 'yy', action = 'action'

// 应用场景：例如：将不同的参数${}添加不同样式：
const tag = ( arr, ...rest) => 
    arr.reduce((prev, cur, i)=> prev + `<span style="color: red;">${rest[i-1]}</span>` + cur)


const ret = tag`这是模板字符串的内容${yy}, ${action}。这是标签模板板以外的内容`

console.log(ret)
// 这是模板字符串的内容<span style="color: red;">yy</span>, <span style="color: red;">action</span>。这是标签模板板以外的内容
