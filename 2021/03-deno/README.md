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
7. Standard Library
8. Browser Compatible API

    直接使用例如`fetch`等API
9. Morden JS
10. Execute wasm binaries

    直接运行二进制文件，效率更高

### **读取文件时命令行的可选参数：**

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

可以运行 `deno run dateTime.ts`

`deno run --allow-write createFile.ts`

`deno run --allow-read readFile.ts`

`deno run --allow-net simpleServer.ts`