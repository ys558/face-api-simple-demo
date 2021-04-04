let emperor = {
  prince: ['prince1', 'prince2', 'prince3'],
  princess: ['princess1', 'princess2',],
  prince: 'bastard'
}

// 如花有2个儿子, 我们希望一个Symbol值赋值两个value, 可以用Symbol.for():
const bastard1 = Symbol.for('如花')
emperor[bastard1] = '如花儿子1'

const bastard2 = Symbol.for('如花')
emperor[bastard2] = '如花儿子2'

// 似水有一个儿子：
const bastard3 = Symbol.for('似水')
emperor[bastard3] = '似水儿子'

console.log(emperor)
// ! 打印出来发现后面的'如花儿子2'覆盖前面的'如花儿子1', '如花儿子1'不显示
// {
//   prince: 'bastard',
//   princess: [ 'princess1', 'princess2' ],
//   [Symbol(如花)]: '如花儿子2',
//   [Symbol(似水)]: '似水儿子'
// }

// bastard1和bastard2都是Symbol值，但是它们都是由同样参数的Symbol.for方法生成的，所以实际上是同一个值:
console.log(bastard1 === bastard2) // true

// @ Symbol具有唯一性: 本质上他们是不相等的: 需要用Symbol.keyFor()才能查询到对应的key值:
console.log(bastard1, Symbol.keyFor(bastard1)) // Symbol(如花) 如花
console.log(bastard2, Symbol.keyFor(bastard2)) // Symbol(如花) 如花

// * Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
console.log(Reflect.ownKeys(emperor))
// [ 'prince', 'princess', Symbol(如花), Symbol(似水) ]

