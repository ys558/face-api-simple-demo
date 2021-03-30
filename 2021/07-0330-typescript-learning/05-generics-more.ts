// define type:
// type numArray = Array<number>
type numArray = Array<number | any>

// last
const last = ( arr: numArray ) => {
  return arr[arr.length -1]
}
const l = last([1,2,3])
const l2 = last(['a','b','c'])
console.log(l, l2)

const first = <T>( arr: T[] ): T => arr[0]
const f1 = first<string>(['a', 'b', 'c'])
console.log(f1)


// makeArr: 2 generics, return, default value
const makeArr = <X, Y = 4> (x: X, y: Y): [X, Y] => [x, y]
const v = makeArr(1, 'a')
// overwrite inference:
const v1 = makeArr<string | null, number>('1', 2)
const v3 = makeArr('2', 2)
console.log(v, v1, v3)

const makeFullNmae = <T extends { firstName: string, lastName: string }>
  (obj: T) => ({
  ...obj,
  fullName: obj.firstName + ' ' + obj.lastName
})
// 传入参数多了个 age: 15, 须把上面的参数改为: 泛型继承extends
const v4 = makeFullNmae({ firstName: 'hehe', lastName: 'abc', age: 15 })
console.log(v4)

// interface with generics
interface Tab <T> {
  id: string,
  position: number,
  data: T
}
type NumberTab = Tab<Number>
type StringTab = Tab<String>