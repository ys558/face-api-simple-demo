1.  file '01helloworld.js' show how to run the graphql on http server
    
    1.1 according to the file, run server on port 5000, open the browser, you may see the page of graphql default pages

    1.2 input the query sentence as follow, may see that message of 'hello world'
    ```js 
    query {
      message
    }
    ```
    the 'query' words can be skipped and you will get the same result
    ```js
    {
      message
    }
    ```
    ![graphql](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/1.2.png)

2. run the 02base.js and input the query sentence as below,  query syntax of graphql is a little bit similar to json but much easier than json. there is no need with "" , ',' and value in it:
    ```js
    {
      books {
        id
        name
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/2.png)

3. run the 03listQuery.js, in this file we may query book by authorId and query author by book's id (书名id和作者id互查)
    
    3.1 in here, we may click here to see the relationship of the query of book-->authorId and books' id --> author

    [here](https://github.com/ys558/tech-blog-code/2020/blob/master/04-graphql-learn/img-MD/3.1.gif) is a gif picture show how to check up the field relationship in page

    3.2 authors --> books
    ```js
    {
      authors {
        books {
          id
          name
        }
      }
    }
    ```
    
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/3.3.png)

    ```js
    {
      books {
        author {
          id
          name
        }
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/3.2.png)

4. 04singleQuery.js, query one book by book id (by params, as below type) and its author
    ```js
    {
      book(id: 4) {
        name
        author {
          name
        }
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/4.png)

    4.1 query one author by author id,
    ```js
    {
      author(id: 1) {
        name
      }
    }
    ```
    and query one author by author id and this author's all book
    ```js
    {
      author(id: 1) {
        name
        books {
          name
        }
      }
    }
    ```
    ![](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/4.2.png)

    4.2 query all books with author name
    ```js
    {
      books {
        name
        author {
          name
        }
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/4.1.png)
    
    and also query all authors with their all books' name
    ```js
    {
      authors {
        name
        books {
          name
        }
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/4.1.1.png)
    
5. mutationType, change record on POST, DELETE, PUT etc method to change record by rest api
  
    5.1 add `mutation: RootMutationType` in code
    ```js
    const Schema = new GraphQLSchema({
      query: RootQueryType,
      mutation: RootMutationType
    })
    ```
    click the 'Docs' on query page, we may see 2 mutation functions as below: 

    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/5.png)

    query the books, the record was added:
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/5.4.png)


    and input the query sentence on query page:
    ```js
    mutation {
      addBook(name: "new book", authorId: 1) {
        id
        name
      }
    }
    ```
    and the results:

    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/5.1.png)

    same process as changing author:
    ```js
    mutation {
      addAuthor(name: "new author") {
        name
      }
    }
    ```
    results:
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/5.2.png)

    we may query authors, the record was added
    ![simple query sentence](https://raw.githubusercontent.com/ys558/tech-blog-code/2020/master/04-graphql-learn/img-MD/5.3.png)


