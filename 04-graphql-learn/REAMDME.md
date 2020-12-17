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
    ![graphql](https://raw.githubusercontent.com/ys558/js-simple-demo/master/04-graphql-learn/img-MD/1.2.png)

2. run the 02base.js and input the query sentence as below,  query syntax of graphql is a little bit similar to json but much easier than json. there is no need with "" , ',' and value in it:
    ```js
    {
      books {
        id
        name
      }
    }
    ```
    ![simple query sentence](https://raw.githubusercontent.com/ys558/js-simple-demo/master/04-graphql-learn/img-MD/2.png)

3. run the 03listQuery.js, in this file we may query book by authorId and query author by book's id (书名id和作者id互查)
    
    3.1 in here, we may click here to see the relationship of the query of book-->authorId and books' id --> author

    ![simple query sentence](https://raw.githubusercontent.com/ys558/js-simple-demo/master/04-graphql-learn/img-MD/3.1.gif)

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
    
    ![simple query sentence](https://raw.githubusercontent.com/ys558/js-simple-demo/master/04-graphql-learn/img-MD/3.3.gif)

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
    ![simple query sentence](https://raw.githubusercontent.com/ys558/js-simple-demo/master/04-graphql-learn/img-MD/3.2.gif)