// 普通类：
class Person {
    name: string;
    constructor(n:string){
        this.name = n;
    }
    run():void {
        console.log(this.name)
    }
    getName():string{
        return this.name
    }
    setName(name:string):void{
        this.name=name;
    }
}
const p=new Person('张三')
p.run()//张三
console.log(p.getName())//张三
p.setName('李四')
console.log(p.getName())//李四

// 2. 继承： extends, super
class Person2 {
    name: string;
    constructor(name:string){
        this.name = name
    }
    run():string {
        return `父类的run方法：${this.name}在运动`
    }
}
// var p2 =new Person2('zhangsan');
// alert(p2.run())

class A extends Person2 {
    constructor(name:string) {
        // 初始化父类的构造函数：super拿了上面的name属性
        super(name)
    }
    run():string {
        return `子类的run方法：${this.name}在运动`
    }
}
var A2= new A('lisi')
// 子类有和父类一样的方法：则先执行子类的方法，如果没有，再执行父类的方法：
console.log('继承：', A2.run()) //继承： 子类的run方法：lisi在运动 

// 3. 类的修饰符：
// public 
// protected 当前类和其子类可以访问，外部无法访问
// private 只有当前类可以访问
// 不加修饰符，默认是public
class Person3 {
    public name: string;
    protected age: number;
    private hehe: string;
    constructor( name:string, age: number, hehe:string, ){
        this.name = name
        this.age = age
        this.hehe = hehe
    }
    run():string {
        return `父类的run方法：${this.hehe}, hehe是父类里的私有方法，只有父类自己能调用`
    }
}

class A3 extends Person3 {
    constructor(name:string, age: number, hehe:string, ) {
        super(name, age, hehe)
    }
    run():string {
        // 如果下面加上：${this.hehe}则会报错
        return `子类的run方法：${this.name}, ${this.age}`
    }
}
var P1 = new Person3('lisi', 33, 'hehe')
console.log(P1.run());

var B = new A3('哈哈', 2344, 'hehe')
console.log(B.run());

// 4. 静态方法及静态属性：static
// // es5定义静态方法：
// function XX() {
//     // 这个是类里的实例方法：
//     this.run = function() {}
// }
// // es5的定义静态方法：
// XX.run=function(){}
// // es5的定义静态属性：
// XX.name= "dd";

class X {
    public name: string;
    static hehe: string="静态属性";
    constructor(name:string) { this.name = name }
    run():void {console.log(`${this.name}在运动`)}
    work():void {console.log(`${this.name}在工作`)}
    static print() {
        // 静态方法是独立的，只能调用静态属性static，不能调用正常属性：
        console.log('X的静态方法', `直接调用hehe的${X.hehe}`);
    }
}
var x1=new X('llllllllllll');
console.log(x1.work());
// 静态方法可以直接调用：
X.print();
console.log(X.hehe);


// 5. 抽象方法 abstract
// 抽象类不能直接实例化，他是提供给其他子类继承的基类
abstract class Animal {
    public name: string;
    constructor(name:string) {
        this.name = name;
    }
    // 5.1 抽象类里必须有抽象方法：否则报错：
    abstract eat():any;
}
class Dog extends Animal {
    constructor(name:string){
        super(name)
    }

    // 5.2 继承了抽象类的子类里必须有父类的抽象方法，否则报错：
    eat() {
        return console.log('子类的抽象方法:',`${this.name}吃东西`);
    }
}
var d= new Dog('小黑');
d.eat();
