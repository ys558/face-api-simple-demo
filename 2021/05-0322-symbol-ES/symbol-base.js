let emperor = {
  prince: ['prince1', 'prince2', 'prince3'],
  princess: ['princess1', 'princess2',],
  prince: 'bastard'
}

console.log(emperor)
// ! 我们会发现 prince: 'bastard' 会覆盖掉上面的 prince: ['prince1', 'prince2', 'prince3'],
// { prince: 'bastard', princess: [ 'princess1', 'princess2' ] }

// @正确做法：
let emperor1 = {
  prince: ['prince1', 'prince2', 'prince3'],
  princess: ['princess1', 'princess2',],
}

// * 这里建议填写Symbol()里的参数prince，是这个Symbol值的一个描述，如果不填写，又加入多个Symbol()的话会分不清：
const prince = Symbol('prince')
emperor1[prince] = 'bastard'

console.log(emperor1)
// {
//   prince: [ 'prince1', 'prince2', 'prince3' ],
//   princess: [ 'princess1', 'princess2' ],
//   [Symbol(prince)]: 'bastard'
// }

// ! 用普通方法遍历不出 [Symbol(prince)]: 'bastard'
console.log(Object.keys(emperor1)) // [ 'prince', 'princess' ]
for (p in emperor1) {
  console.log(p, emperor1[p])
  // princess [ 'princess1', 'princess2' ]
}
// @ Symbols自己的特殊方法可以查询：
console.log(Object.getOwnPropertySymbols(emperor1))
// [ Symbol(prince) ]


// @ 利用原有的[]键名选择器定义obj里的Symbol属性 :
const prince3 = Symbol('prince')
let emperor2 = {
  prince: ['prince1', 'prince2', 'prince3'],
  princess: ['princess1', 'princess2',],
  // ! 如果不加[], 则会变成普通属性, 不会转换为Symbol
  [prince] : 'bastard',
}

console.log(emperor2)
// {
//   prince: [ 'prince1', 'prince2', 'prince3' ],
//   princess: [ 'princess1', 'princess2' ],
//   [Symbol(prince)]: 'bastard'
// }