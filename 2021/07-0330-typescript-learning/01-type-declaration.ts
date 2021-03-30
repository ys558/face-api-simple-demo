
var st:string = '111111';
let num1 :number = 222
console.log('声明字符串：',st)
console.log('声明数字：',num1)

// ts定义array的几种方法：
const arr:number[] =[1,2,3,4,5];
console.log("定义array的几种方法：",arr);

const arr2:Array<number> = [33,4,4,5];
console.log("定义array的几种方法：",arr2);

const arr8: any [] =['hwirbd',3,45,6]
console.log("定义array的几种方法：",arr8);

// 元组类型：给数组中每一个位置指定一个类型：少用
const arr3: [number, string] = [33, 'hhhhh']
console.log("元组：",arr3)

// 枚举类型：
enum flag { blue=1, red="红", black="black" }
const f: flag= flag.red;
console.log("枚举：",f); // 红

enum flag2 { blue, red, black }
const f2: flag2= flag2.black;
console.log("枚举：",f2); //2

// 一个变量可以定义多种类型：
let some : number | string;
some = 123
console.log(`一个变量的多种类型：${some}, 为${typeof(some)}类型，`);

// 任意类型：any,相当于没有指定类型：用于获取dom节点
// const test: any = document.getElementById('box')

// null和undefined，一个元素可以不定义或不传：
let num: number | null | undefined;
console.log('null和undefined，', num);

// void: 方法没有返回值：
function run():void { console.log('void声明，多用于没有返回值的方法')}
run();

function run2(): number { return 6666  }
console.log(run2());