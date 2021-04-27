# react-query 前后端小项目

## server模块:

初始化项目:
```shell
mkdir server && cd server
npm init -y
```
安装依赖: 

```shell
yarn add express lowdb morgan nanoid cors swagger-jsdoc swagger-ui-express
touch index.js
```

`index.js`中写下:
```js
const express  = require("express");
const cors  = require("cors");
const morgan  = require("morgan");
const low = require("lowdb");

const PORT = process.env.PORT || 4000

const FileSync = require("lowdb/adapters/FileSync")

// 用 db.json 充当数据库:  
const adapter = new FileSync("db.json")
const db = low(adapter)

db.defaults({ books: [] }).write()

const app = express()

app.db = db

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.listen(PORT, () => console.log(`the server run on port ${PORT}`))
```

**保存后会见到目录结构如下:**  
    
    server
      |__node_modules/
      |__db.json
      |__index.js
      |__package.json
      |__yarn.lock

上图中`db.json`即`const adapter = new FileSync("db.json")`生成

`db.json`里面还是空的,加上一些数据:
```json
{
  "books": [
    {
      "id": "iEuOBYkU",
      "title": "The Little Book of Semaphores",
      "author": "Allen B. Downey "
    },
    {
      "id": "0kFaJHB2",
      "title": "Programming Pearls",
      "author": "Jon Bentley"
    },
    {
      "id": "ukjXyUuM",
      "title": "The Elements of Programming Style",
      "author": "Brian W. Kernighan and Phillip J. Plauger"
    }
  ]
}
```

编写route:
```shell
mkdir routes && touch books.js
```
```js
const express  = require("express");
const router  = express.Router()
const { nanoid }  = require("nanoid");

const idLength = 8

router.get('/', (req, res) => {
  const books = req.app.db.get('books')
  res.send(books)
})

router.get('/:id', (req, res) => {
  const book = req.app.db.get('books').find({ id: req.params.id }).value()
  if (!book) res.send(404)
  res.send(book)
})

router.post('/', (req, res) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body
    }
    req.app.db.get('books').push(book).write()
    res.send(book)
  }catch (error) {
    return res.status(500).send(error)
  }
})

router.put('/:id', (req, res) => {
  try {
    req.app.db.get('books').find({ id: req.params.id }).assign(req.body).write()
    res.send(req.app.db.get('books')).find({id: req.params.id})
  }catch (error) {
    return res.status(500).send(error)
  }
})

router.delete('/:id', (req, res) => {
  req.app.db.get('books').remove({ id: req.params.id }).write()
  res.sendStatus(200)
})

module.exports = router
```

在`index.js`里添加swagger配置:
```js
// 配置swagger:
const swaggerUI  = require("swagger-ui-express");
const swaggerJsDoc  = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API"
    },
    servers: [{ url: "http://localhost:4000"}],
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
```

可运行`node index.js` 并在浏览器打开`localhost:4000/api-docs/`看到swagger的界面

`books.js`添加每个API对应的swagger, 页面才能显示, 类似多行注释, 例如:
```js
/**
*@swagger
*components:
*  schemas:
*    Book:
*      type: object
*      required:
*        - title
*        - author
*      properties:
*        id:
*          type: string
*          description: The auto-generated id of the book
*        title:
*          type: string
*          description: The book title
*        author:
*          type: string
*          description: The book author
*      example:
*        id: d5fE_asz
*        title: The New Turing Omnibus
*        author: Alexander K. Dewdney
*/

// 1. 这个配置将 Books 打上tags:
/**
 * @swagger
 *  tags:
 *    name: Books
 *    description: The books managing API
 */

// 1. 将API /books 归类到Books tags下:
/**
*@swagger
* /books:
*   get:
*     summary: Returns the list of all the books
*     tags: [Books]
*     responses:
*       200:
*         description: The list of the books
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Book'
*/

router.get('/', (req, res) => {
  const books = req.app.db.get('books')
  res.send(books)
})
```

其余API的swagger配置见[`books.js`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/server/routes/books.js)

## client模块:

**react-query hook的官网: https://react-query.tanstack.com/**

编写前端界面:  

初始化项目:
```shell
npx create-react-app client && cd client
```

安装依赖并运行: 
```shell
yarn add react-query react-router-dom react-hook-form @rebass/forms @rebass/preset styled-components react-loader-spinner
yarn start
```

修改`src/client.js` 文件如下:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import App from './App'
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components"
import preset from "@rebass/preset"

// 核心部分: react-query
import { QueryClientProvider, QueryClient } from "react-query"
// 实例化queryClient
const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={preset}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

创建 `src/api.js`, 函数`getAllBooks`用于对接backend返回的数据, 如下:
```js
export const getAllBooks = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books`)
  if (!response.ok) throw new Error('something wrong')

  return response.json()
}
```
上面的`${process.env.REACT_APP_API_SERVER}`部分可以创建另一个文件`src/.env`, 如下:
```
REACT_APP_API_SERVER = http://localhost:4000
```

制作通用组件导航栏[`src/shared/NavBar.jsx`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/shared/NavBar.jsx), 并封装一通用组件[`src/shared/Container.jsx`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/shared/Container.jsx), 非核心代码, 这里不贴出

创建`src/BookList/index.js`和`src/BookList/BookList.jsx`, 如下:

`src/BookList/index.js`:
```js
export * from './BooksList'
```

`src/BookList/BookList.jsx`:
```jsx
import { useQuery } from 'react-query'
import { Flex } from 'rebass'
import { getAllBooks } from '../api'
import { Container } from '../shared/Container'
import Loader from 'react-loader-spinner'

export const BooksList = () => {
  const { data, error, isLoading, isError } = useQuery('books', getAllBooks)

  if (isLoading) return <Container>
    <Flex>
      <Loader type='ThreeDots' color='#ccc' height={30} />
    </Flex>
  </Container>

  if (isError) return <span>
    Error: {error.message}
  </span>

  return <Container>
    <Flex flexDirection='column' alignItems='center'>
    {
      data.map(({author, title, id}) => (
        <div key={id}>
          {author} -- {title}
        </div>
      ))
    }
    </Flex>
  </Container>
}

```

修改`src/App.js`文件如下: 将`BookList`导入`App.js`, 如下:
```js
import { Switch, Route } from 'react-router-dom'
import { BooksList } from './BooksList'

function App() {
  return (
    <>
      <Switch>
        <Route path='/'>
          <BooksList />
        </Route>
      </Switch>
    </>
  )
}

export default App;
```

当然, 其余的模块[`CreateBook`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/CreateBook/), [`UpdateBook`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/UpdateBook/)也是同样重复上述操作再导入`App.js`里

修改每个条目的样式, 创建[`src/BookList/BookItem.jsx`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/BookList/BookItem.jsx), 并在[`src/BookList/BookList.jsx`](https://github.com/ys558/tech-blog-code/tree/master/08-react-query/client/src/BookList/BookList.jsx) 里将

```html
<div key={id}>
  {author} -- {title}
</div>
```

替换为
```jsx
import { BookItem } from './BookItem'

<BookItem author={author} title={title} id={id} key={id}/>
```

添加 `DELETE` 方法:

在`src/api.js`里增加一个 `removeBook` 的方法

```js
export const removeBook = async id => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) throw new Error(response.json().message)
  
  return true
}
```

而 `src/BooksList/BookItem.jsx` 修改如下: 

```js
import { Flex, Text, Button, Link as StyledLink } from 'rebass/styled-components'
import { Link } from 'react-router-dom'

// react-query DELETE方法的核心:
import { useMutation, useQueryClient } from 'react-query'
import { removeBook } from '../api'
import Loader from 'react-loader-spinner'

export const BookItem = ({ author, title, id }) => {
  // 官方文档: https://react-query.tanstack.com/reference/useMutation
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(removeBook)

  const remove = async () => {
    await mutateAsync(id)
    queryClient.invalidateQueries('books')
  }

  return <Flex p={3} width="100%" alignItems='center'>
    <Link component={StyledLink} to={`/update-book/${id}`} mr="auto">
      { title }
    </Link>
    <Text>{author}</Text>
    <Button ml="3" onClick={remove}>
      { isLoading ? <Loader type='ThreeDots' color='#fff' height={10} />: 'Remove' }
    </Button>
  </Flex>
}
```

添加局部更新 `PUT` 方法: 

在`src/api.js`里增加一个 `getBook` 的函数, 通过id, 获取对应的book

```js
export const getBook = async ({ queryKey }) => {
  /* eslint-disable no-unused-vars */
  const [ _key, { id } ] = queryKey
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books/${id}`)

  if (!response.ok) throw new Error(response.json().message)

  return response.json()
}
```

再增加一个`updateBook` 函数, 用于更新对应的book

```js
export const updateBook = async ({ id,  ...data }) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books/${id}`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(response.json().message)

  return response.json()
}
```

添加 `src/shared/BookForm.jsx` 的页面:

```js
import { Box, Button } from 'rebass/styled-components'
import { Label, Input } from '@rebass/forms'
import { useForm } from 'react-hook-form'
import Loader from 'react-loader-spinner'

export const BookForm = ({ defaultValues, onFormSubmit, isLoading }) => {
  const { register, handleSubmit } = useForm({ defaultValues })
  const onSubmit = handleSubmit( data => {
    onFormSubmit(data)
  })

  return <form onSubmit={onSubmit}>
    <Box sx={{ marginBottom : 3 }}>
      <Label htmlFor="title">Title</Label>
      <Input ref={register} id='title' name='title' type='text' />
    </Box>
    <Box sx={{ marginBottom : 3 }}>
      <Label htmlFor='author'>Author</Label>
      <Input ref={register} id='author' name='author' type='text' />
    </Box>
    <Button>
      { isLoading ? <Loader type='ThreeDots' color='#fff' height={10} /> : 'Submit' }
    </Button>
  </form>
} 
```

修改`src/UpdateBook/UpdateBook.jsx`, 修改如下:

```jsx
import Loader from "react-loader-spinner"
import { useMutation, useQuery } from "react-query"
import { useHistory, useParams } from "react-router-dom"
import { Box, Flex, Heading } from "rebass/styled-components"
import { getBook, updateBook } from "../api"
import { BookForm, Container } from "../shared"

export const UpdateBook = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, error, isLoading, isError } = useQuery(['book', {id}], getBook)

  const { mutateAsync, isLoading: isMutating } = useMutation(updateBook)
  const onFormSubmit = async data => {
    await mutateAsync({ ...data, id })
    history.push('/')
  }

  if ( isLoading ) return <Container>
      <Flex>
        <Loader type='ThreeDots' color='#ccc' height={30} />
      </Flex>
    </Container>

  if ( isError ) return <Container>
    <Flex py='5' justifyContent='center'>
      Error: {error.message}
    </Flex>
  </Container>

  return <Container>
    <Box sx={{ py: 3 }}>
      <Heading sx={{ marginBottom: 3 }}>Update Book</Heading>
      <BookForm defaultValues={data} onFormSubmit={onFormSubmit} isLoading={isMutating} />
    </Box>
  </Container>
}
```

增加 `POST` 方法添加一个新书:

在`src/api.js`里增加一个 `createBook` 的函数

```js
export const createBook = async (data) => {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/books/`, {
    // method默认GET, 其他方法必须制定, 否则报错:
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!response.ok) throw new Error(response.json().message)

  return response.json()
}
```

再创建`src/CreateBook/CreateBook.jsx` 如下

```jsx
import { useMutation } from "react-query"
import { useHistory } from "react-router-dom"
import { Box, Heading } from "rebass"
import { createBook } from "../api"
import { BookForm, Container, } from '../shared'

export const CreateBook = () => {
  const history = useHistory()

  const { mutateAsync, isLoading } = useMutation(createBook)
  const onFormSubmit = async data => {
    await mutateAsync(data)
    history.push('/')
  }

  return <Container>
    <Box sx={{ py: 3 }}>
      <Heading sx={{ marginBottom: 3 }}>Create New Book</Heading>
      <BookForm onFormSubmit={onFormSubmit} isLoading={isLoading} />
    </Box>
  </Container>
}
```