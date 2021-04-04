let a = function ():string {
    return 'hehe'
}
console.log("定义函数要声明返回值，没返回值声明void",a())

const b= function(name: string, age: number=30, married?:boolean):string{
    return `传值需要声明：
    我叫${name}，
    年龄${age}，${married}`
}
console.log(b('zs',20));