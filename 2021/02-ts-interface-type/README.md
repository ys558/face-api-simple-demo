# ts 中 interface 和 type 区别

1. 两者都可以用来描述 Objects / Functions :

`Interface` : 
```ts
interface Person {
    name: string;
    hungry: boolean;
}

interface Greeting {
    ( name: string ) : string;
}
```

`Type alias` :

```ts
type Person_t = {
    name: string
    hungry: boolean
}

type Greeting_t = ( name: string ) => string
```

## **`Type alias` 可以用于描述其他类型 `Interface` 不能，如：**
```ts
// primitive
type Hungry = boolean

// union
type Kyle_t = Person_t | Youtuber

// tuple
type Data = [number, string];

// dom
let div = document.createElement('div');
type B = typeof div;
```

2. 两者都可以扩展 `extends` 接口和类型别名不是互斥的。接口可以扩展类型别名，反之亦然。

`extends`: 

```ts
// Interface extends interface :
interface Person {
    name: string
    hungry: boolean
}
interface Kyle extends Person { youtuber: boolean }
```

```ts
// Type alias extends type alias :
type Person_t = {
    name: string
    hungry: boolean
}
type Youtuber = Person_t & { youtuber: boolean }
```

也可以交叉 `extends`:

```ts
// Interface extends type alias
type Person_t = { name: string }
interface Kyle extends Person_t { youtuber: true }
```

```ts
// Type alias extends interface
interface Person { name: string }
type Kyle = Person & { youtuber: true }
```

`implements` :
```ts
interface Person { name: string }
class Kyle implements Person { hungry: boolean }

type Person_t = { name: string }
class AAA implements Person_t {
    // type 进行implements时需要重写一遍所有Person_t的所有属性：
    name: string
    x: number
}

// 如果type为union类型，则不可以 implements
type Kyle_t = Person_t | Youtuber
```

3. `interface` 可 `extends class`

类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}
```

4. interface declaration merging

与类型别名不同，接口可以定义多次，并将被视为单个接口(合并所有声明的成员)。

```ts
// These two declarations become:
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```

5. `type alias`有计算属性，生成映射类型，interface没有

type 能使用 in 关键字生成映射类型，但 interface 不行。

```ts
type Keys = 'firstname' | 1

type combimeType = {
    [key in Keys] : string | number
}

const test: combimeType = {
    firstname: 'Kyle',
    1: 111
}

console.log(test)
// { '1': 111, firstname: 'Kyle' }
```

### 总结

interface 和 type 很像，很多场景，两者都能使用。但也有细微的差别：

+ 类型：对象、函数两者都适用，但是 type 可以用于基础类型、联合类型、元祖。
+ 同名合并：interface 支持，type 不支持。
+ 计算属性：type 支持, interface 不支持。

总的来说，公共的用 interface 实现，不能用 interface 实现的再用 type 实现。是一对互帮互助的好兄弟。