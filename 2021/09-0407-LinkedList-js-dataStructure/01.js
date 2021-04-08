class Node {
  // 链表最后一个节点指向null
  constructor( data, next = null ) {
    this.data = data
    this.next = next
  }
}

const n1 = new Node(100)
console.log(n1) // Node { data: 100, next: null }

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0;
  }

  // 插入第一个节点，链表是栈结构，先进的数据在底部
  insertFirst(data) {
    this.head = new Node(data, this.head)
    this.size ++ 
  }

  // 插入最后一个节点，即在栈底部插入一个元素：
  insertLast(data) {
    let node = new Node(data)
    let current
    //  如果为空， 创造一个头：
    if(!this.head) {
      this.head = node
    } else {
      current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size ++ 
  }

  // 按索引值插入元素：
  insertAt(data, index) {
    // 超出范围直接return
    if(index > 0 && index > this.size ) return
    // 如果是第一个：
    if (index === 0) {
      this.head = new Node(data, this.head)
      return this.insertFirst(data)
    }
    const node = new Node(data)
    let current, previous
    // 设置cureent成为第一个：
    current = this.head
    let count = 0;
    while(count < index) {
      previous = current // 节点位于索引之前
      count ++
      current = current.next // 节点位于索引之后
    }
    node.next = current
    previous.next = node
    this.size ++
  }

  // 获得索引值
  getAt(index) {
    let current = this.head
    let count = 0
    while (current) {
      if (count == index) console.log(current.data)
      count ++
      current = current.next
    }
    return null
  }

  // 删除索引
  removeAt(index) {
    if (index > 0 && index > this.size) return
    let current = this.head
    let previous
    let count = 0

    // 删除第一个：
    if (index === 0) {
      this.head = current.next
    } else { 
      while(count) {
        count ++
        previous = current
        current = current.next
      }
      previous.next = current.next
    }
    this.size --
  }

  // 清除链表
  clearList () {
    this.head = null
    this.size = 0
  }

  // 打印出链表的数据
  printListData() {
    let current = this.head
    while(current) {
      console.log(current.data)
      current = current.next
    }
  }
}

const ll = new LinkedList()
ll.insertFirst(100)
console.log(ll) // LinkedList { head: Node { data: 100, next: null }, size: 0 }

ll.insertFirst(200)
ll.insertFirst(300)
ll.printListData()
// 300
// 200
// 100
console.log('-------------')

ll.insertLast(400)
ll.printListData()
// 300
// 200
// 100
// 400
console.log('-------------')

ll.insertAt(55555, 3)
ll.printListData()
// 300
// 200
// 100
// 5
// 400

console.log('-------------')
ll.insertAt(99999, 10)
ll.printListData()
// 10号位不存在，故没有插入链表
// 300
// 200
// 100
// 55555
// 400

console.log('-------------')
ll.getAt(4)
// 400

console.log('-------------')
// ll.removeAt(0)
ll.printListData()
// 200
// 100
// 55555
// 400

ll.clearList()