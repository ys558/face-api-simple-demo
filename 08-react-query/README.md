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

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

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

可运行`node index.js` 并在浏览器打开`localhost:4000`看到swagger的界面

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

其余API的swagger配置见[`books.js`](https://github.com/ys558/js-simple-demo/tree/master/08-react-query/server/routes/books.js)