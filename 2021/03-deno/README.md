# deno 初探

### **deno是什么？**

用Rust编程，基于V8引擎，一种原生支持JS或TS的运行时

### **特征：**

1. Use JS / TS 
2. ES Modules
3. Secure by Default
4. Top Level / First Class Await

    单独使用 `await` 关键字

5. De-centralized Packages：
    
    去中心化的模块化导入，直接引入 package, 不必像 `npm` 一样下载到本地, 也不需要`package.json`文件

    ```js
    import { App } from 'https://deno.lang/x/oak/mod.ts'
    ```

6. Built In Testing

    直接集成了测试模块, 类似前端的BDD测试，基本的运行命令为 `deno test <filename>.test.js`

7. Standard Library
8. Browser Compatible API

    直接使用浏览器的api例如`window`,`setTimeout`,`fetch`等API, 见[例子](https://github.com/ys558/tech-blog-code/tree/master/2021/03-deno/browserApi.js)
9. Morden JS
10. Execute wasm binaries

    直接运行二进制文件，效率更高

### **运行文件时使用的中间件参数**

**！！deno运行的文件如何涉及网络通讯、对文件的io操作等，都需要加入参数进行运行，否则报错无法运行：**

| 安全参数 | 作用 |
| --- | --- | 
| `--allow-write`| 允许写入 |
| `--allow-read` | 允许读取 |
| `--allow-net` | 允许运行于网络 |
| `--allow-env` | 运行环境 |
| `--allow-plugin` | 读取插件 |
| `--allow-hrtime` | allow high resolution time measurement |
| `--allow-run` | 运行 |
| `-A` | 所有权限 |

### 常规实操：

+ 安装见 [官网](https://deno.land/#runtime-documentation)

+ REPL, 安装完成后直接输入：`deno`可进入，如下：

```bash
yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ deno
Deno 1.7.4
exit using ctrl+d or close()
> const a = 1
undefined
>
```

+ [标准库](https://deno.land/std@0.87.0)

复制 `https://deno.land/std@0.87.0/examples/welcome.ts` 并执行如下，可见:

```bash
yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ deno run https://deno.land/std@0.87.0/examples/welcome.ts
Welcome to Deno!

yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ curl https://deno.land/std@0.87.0/examples/welcome.ts
console.log("Welcome to Deno!");
```

+ 建立一个文件读取服务器：

方法1：直接运行标准库：

`deno run --allow-net --allow-read https://deno.land/std@0.87.0/http/file_server.ts`

会见到服务拉起跑在4507端口：

```bash
yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ deno run --allow-net --allow-read https://deno.land/std@0.87.0/http/file_server.ts
HTTP server listening on http://0.0.0.0:4507/
```

浏览器打开本地4507端口可见到如下：

![文件服务器](https://github.com/ys558/tech-blog-code/tree/master/2021/03-deno/img/file-server.png)

方法2：可以将标准库`file_server.ts`下载到本地运行

执行`install`命令如下：

```bash
yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ deno install https://deno.land/std@0.87.0/http/file_server.ts
✅ Successfully installed file_server
C:\Users\yuyi\.deno\bin\file_server.cmd
C:\Users\yuyi\.deno\bin\file_server (shell)
```

+ 运行本地文件：`deno run <filename>.js`

可分别运行以下命令查看效果： 

`deno run dateTime.ts`

`deno run --allow-write createFile.ts`

`deno run --allow-read readFile.ts`

`deno run --allow-net simpleServer.ts`

### **rest api 应用**

见 [`restt-api`](https://github.com/ys558/tech-blog-code/tree/master/2021/03-deno/rest-api) 文件夹

### 标准库---二维码工具:

[demo](https://github.com/ys558/tech-blog-code/tree/master/2021/03-deno/qrcode.js)，运行`deno run --allow-write qrcode.js test`，会随机生成一个`qrcode.html`的二维码文件，`test`为试生成一随机二维码

### 标准库---测试: 
[demo](https://github.com/ys558/tech-blog-code/tree/master/2021/03-deno/qrcode.js), 运行如下：

```bash
yuyi@dell-laptop MINGW64 ~/Documents/study/tech-blog-code/2021/03-deno (master)
$ deno test testSample.test.js
Check file:///C:/Users/yuyi/Documents/study/tech-blog-code/2021/03-deno/$deno$test.ts
running 1 tests
test Testing sum ... ok (3ms)

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (6ms)
```