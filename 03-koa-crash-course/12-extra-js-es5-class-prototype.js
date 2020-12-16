// es5中的类和静态方法：

// 0. 用函数定影类，也叫实例方法：
function Person(name, age) {
    // 1. 构造含糊里的属性：
    this.name = name
    this.age = age

    // 2. 构造函数里的方法：
    this.run = function() {
        console.log(`Person的构造函数run():${this.name}---${this.age}`)
    }
}
// 3. 原型链上的属性和方法，可以被多个实例共享：用.prototype定义
Person.prototype.gender = "male"
Person.prototype.work = function() {
    console.log(`Person的原型链方法work():${this.name}----${this.age}----${this.gender}`)
}
// 4. 静态方法：
Person.setName=function() { console.log(`Person类的静态方法`) }

// 0.1 实例方法需要new才能被用， 
var p = new Person('zhangsan', '20')
p.run();/** p.run():zhangsan---20 */
p.work();/** p.work():zhangsan----20----male */

// 4.1 静态方法通过类名加点直接调用：
Person.setName(); /** Person类的静态方法 */

// 5. 继承：组合对象冒充+原型链继承
function Web(name, age) {
    // 5.1 组合对象冒充继承，也叫构造函数继承：
    Person.call(name, age)
}
// 5.2 原型链继承
// ！！！！注意：如果单用原型链继承，不用对象冒充继承，即上面函数里的Person.call(name, age)，那么，这种继承是不完整的，无法传值
Web.prototype = new Person()
var w = new Web('李四', 20)
// 继承后可以运行构造函数里的方法：
w.run()
w.work()