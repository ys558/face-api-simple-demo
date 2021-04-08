const n1 = { data: 100 }
const n2 = { data: 200 }
n1.next = n2

// 最简单的链表结构：一个数据里有指向下一个数据的指针：
console.log(n1) // { data: 100, next: { data: 200 } }