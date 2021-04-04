// 接口是对规范的约束：
// 用于批量操作：
// 1.属性接口： 对json的约束
interface FullName{
    firstName: string;
    secondName: string;
}

function printName( name:FullName ) {
    console.log(`${name.firstName}+${name.secondName}`);
}

var obj = {
    age:20,
    firstName: 'hehe',
    secondName: 'haha'
}
printName(obj)

// 1.1. 接口可选属性：
// 应用：
interface Config {
    type: string;
    url: string;
    data?:string;
    dataType:string;
}

function ajax (config:Config) {
    var xhr= new XMLHttpRequest()
    xhr.open(config.type, config.url, true)
    xhr.send(config.data)
    xhr.onreadystatechange =
    function(){
        if(xhr.readyState===4 && xhr.status==200) {
            console.log('success')
            if(config.dataType==='json') {
                console.log(JSON.parse(xhr.responseText).result);
            }else{
                console.log(xhr.responseText)
            }
        }
    }
}

ajax({
    type:'get',
    url:'http://a.itying.com/api/productlist',
    dataType: 'json'
})

// 2。 函数类型接口：对函数传入的参数，以及返回值进行约束
// 2.1 加密的函数类型接口:
interface encrypt {
    (key:string, value:string):string;
}

var md5: encrypt= function(key:string, value:string):string{
    // 模拟操作：
    return key+value;
}
console.log(md5('name','zhangshan'));

// 3. 可索引接口：数组，对象的约束，不常用
// 3.1 数组的约束：
interface UserArr {
    // [索引值为数值]，元素为字符串类型：
    [index:number]:string
}
const arr1: UserArr=['hehe', 'jjjjj']
console.log(arr1[1]);
// 3.2 对象的约束：
interface UserObj {
    [index:string]: any
}
const obj3:UserObj={name: 'uuuuu', eee:'kkkk'}
console.log(obj3['eee']);


// 4. 类class 类型接口：
interface Animal7 {
    name:string;
    eat3(str:string):void;
}
// implements意为实现接口
class Dog2 implements Animal7 {
    name: string;
    constructor(name:string){
        this.name = name;
    }
    eat3(){
        console.log(`${this.name}吃东西`)
    }
}
var d3 = new Dog2('小黑')
d3.eat3();

// 5. 接口的扩展：接口可以继承接口：
interface Animal8 {
    eat():string;
}
interface Person8 {
    work():void;
}

class Programmer {
    public name:string;
    constructor(name:string) {
        this.name = name
    }
    coding(code:string){
        console.log(`${this.name}+code`);
        
    }
}

class Ren extends Programmer implements Person8, Animal8 {
    public name:string;
    constructor(name:string) {
        // 用super继承Programmer的属性
        super(name)
        this.name = name
    }
    eat():string {
        return `${this.name}喜欢吃东西`
    }
    work():void {
        console.log(`${this.name}在工作`)
    }
    coding():void {
        console.log(`${this.name}在写代码`);
    }
}

const xiaoming = new Ren('小明')
xiaoming.coding();