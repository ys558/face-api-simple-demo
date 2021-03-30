// 1. 泛型是解决 类 接口 函数的复用性。及对不特定数据类型的支持
// 例如同时返回string类型和number类型的方法，要写两份，此时要用到泛型：any可以解决，但又放弃了类型检查
// 此时用到泛型：
// 1.1 定义：
// T可以替换
function getDatas <T> (value:T): T {
    return value;
}

getDatas<number>(123);

// 2. 泛型类:解决类的类型校验
// 2.1 普通类：
// class MyClass {
//     public list: number []=[];
//     add(num: number) {
//         this.list.push(num)
//     }
//     minus():number{
//         var minNum = this.list[0];
//         for(var i in this.list){
//             if (minNum >this.list[i]){
//                 minNum = this.list[i]
//             }
//         }
//         return minNum
//     }
// }
// var m = new MyClass();
// m.add(2);
// m.add(33);
// m.add(1);
// m.add(4)
// m.add(6)
// console.log(m.minus());

class MinClass <T> {
    public list:T[]=[];
    add(value: T):void {
        this.list.push(value)
    }
    minus():T{
        var minNum = this.list[0];
        for(var i in this.list){
            if (minNum >this.list[i]){
                minNum = this.list[i]
            }
        }
        return minNum
    }
}
// 2.1 规定类传入number和string:
var m1 = new MinClass<number>();
m1.add(6);
m1.add(5);
m1.add(8);
console.log(m1.minus());

var m2 = new MinClass<string>();
m2.add('哈哈');
m2.add('呵呵');
m2.add('吼吼');
console.log(m2.minus());

// 3. 泛型接口
// 3.1 普通函数类型接口：
// interface ConfigFn {
//     (value1:string, value2:string):string;
// }
// var setData:ConfigFn = function(value1:string, value2:string):string {
//     return value1+value2
// }

// 3.2 泛型接口：
// 3.2.1 定义方法1：
interface ConfigFn {
    <T>(value:T):T;
}
var getData:ConfigFn = function<T>(value:T):T{
    return value;
}
getData<string>('张三');

// 3.2.1 方法2：
interface ConfigFn2 <T> {
    (value:T):T;
}
function getData2 <T>(value:T):T{
    return value;
}
var myGetDaata: ConfigFn2 <string> = getData;