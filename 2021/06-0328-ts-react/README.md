# React 与 typescript

## 安装

### 脚手架，只需带`--template typescript`参数即可：

```shell
create-react-app <app name> --template typescript
#or 
yarn create react-app <app name> --template typescript
```

### 在原有`create-react-app`基础上增加typescript内容：
```shell
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
 
# or
 
yarn add typescript @types/node @types/react @types/react-dom @types/jest
```
## 基础元素：  

### 指定函数或者类组件：
```tsx
React.FC
# or
React.CElement
```  

## props的tsx写法：
```tsx
export const TextField: React.FC<{ text: string }> = () => {
  return <div><input type="text"/></div>
}

// 或将 { text: string } 独立为接口类：

interface Props {
  text: string
}
export const TextField: React.FC<Props> = () => {
  return <div><input type="text"/></div>
}

```
其中，接口可以随意扩展及定义子接口，如：  

```ts
interface Person {
  firstName: string
  lastName: string
}

interface Props {
  text: string
  ok?: boolean
  i?: number
  fn?: (bob: string) => string
  person: Person
}
```


## hooks的ts写法：
### `useState` 的写法： 

```ts
// 或用 | ，不用 ||
const [count, setCount] = useState < string | null | { text: string } >({ text: 'hello' })

// 或 独立为接口：
interface TextNode {
  text: string
}
const [count, setCount] = useState < number | TextNode >(5)
```
如果要将`setCount`作为props进行传参，则需：
```tsx
interface Props {
  children:(
    count: number,
    setCount: React.Dispatch<React.SetStateAction<number>>
  ) => JSX.Element | null
}

export const Counter: React.FC<Props> = ({ children }) => {
  const [count, setCount] = useState(0)
  return <div>
    {children(count, setCount)}
  </div>
}
```

### `useRef` 的写法：
```tsx
// 如果打上ref的是<div></div>, 则用HTMLDivElement
const inputRef = useRef<HTMLInputElement>(null)
```
另外，handleChange
```tsx
// 如果是Props传过来，并且定义了interface接口，则要注明：
interface Props {
  handleChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void
  // 或者如下定义为any，但不建议，因失去了检查的作用：
  // handleChange: ( event: any ) => void
}
```

### `useReducer`的写法：
```tsx
interface Todos {
  text: string
  complete: boolean
}

// type State = Array<Todos>
// or
type State = Todos[]
type Actions = { type: 'add', text: string } | { type:'remove', idx: number }

const TodoReducer = ( state: State, action: Actions ) => {
  switch (action.type) {
    case 'add':
      return [...state, { text: action.text, complete: false }]
    case 'remove':
      return state.filter((_, i) => action.idx !== i)
    default:
      return state;
  } 
}

const [todos, dispatch] = useReducer(TodoReducer, [])
```

## render props的ts写法：  
