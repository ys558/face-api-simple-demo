# ES6的Symbol类型

属于对象（Object）类型里的一个属性，其关系类似于私生子的关系, 如：  
+ 如果 {} 为国王，  
+ Symbol()则为私生子，因为是国王的私生子，所以不能继承国王的遗产，即不能 ~~new Symbol()~~  
+ for...in等常规循环方法不能查询到Symbol(), 必须用Symbol.for() 才能查询

总结:  
1. Symbol函数接收一个可选参数为标识, 方便代码阅读和后期调试  
2. 用Object.getOwnPropertyNames(), Object.Keys(), for...in等方法无法显示Symbol属性名  
3. Object.getOwnPropertySymbols()方法返回所有Symbol属性的数组
4. Symbol函数不能用new关键字,因为他是原始值  
5. Symbol.for()创建共享Symbol, 即, 一个Symbol()可以接收多个值
6. Symbol创建的原始值都是唯一的
7. Symbol.KeyFor()返回已登记Symbol有关的键