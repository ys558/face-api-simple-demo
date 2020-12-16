// es6的类：规范很多：

// 1. 类（其余自行体会，不解释）
class Person {
    constructor(name, age) {
        this. _name = name
        this._age = age
    }
    setName(name) { this. _name = name }
    getName() { console.log(this._name) }

    // 3. es6的静态方法：static 
    // 不可被子类继承
    static work() { console.log('es6的静态方法')}
}

var p= new Person('张三1', '20')
p.getName() //张三1
p.setName('李四') 
p.getName() //李四

// 2. es6的继承 extends
class Web extends Person {
    constructor(name,age, gender) {
        // super实例化子类时，可以给父类传参：
        super(name, age)
        this.gender = gender
    }
    print() { console.log(this.gender) }
}

var w= new Web('王五','30','男')
w.getName() // 王五
w.print() // 男

// 3. es6的静态属性定义：
Person.instance="这是Person的静态属性" 
Person.work(); /** es6的静态方法 */
console.log(Person.instance) /** 这是Person的静态属性 */

