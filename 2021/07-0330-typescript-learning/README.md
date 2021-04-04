继上一个项目`06-0328-ts-react`后，感觉有必要理清所有`typescript`语法：

## 运行typescript两种方法:

### 1. 浏览器运行：将ts转换为js后执行:

安装ts：

`npm install -g typescript`

初始化：

`tsc --init`

编译ts：如果要其在浏览器中直接使用，必须转换为js文件，则需运行：

`tsc helloworld.ts`

> 这里会在项目文件夹中生成：tsconfig.json文件，可在里面修改ts编译后的ts文件生成路径

执行以上命令后会生成一个js文件, 该文件就可以使用啦~

VS code 里的设置自动执行tsc编译：
+   在 “终端”——“运行任务”——“tsc监视”，则ts文件写完后保存会自动生成对应的js文件

### 2. 利用`ts-node`直接运行.ts文件

参考该文档: https://www.npmjs.com/package/ts-node

安装

```shell
npm install -g typescript
npm install -g ts-node
```

运行:
```shell
ts-node xxx.ts
```