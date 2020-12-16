### koa基础知识点按顺序看，具体写在注释中，此处不再赘述
### 15-connectToMongo.js对应14-consealMongoByNode里的东西

## koa官方应用生成器的安装和启动命令：
> ### 需全局安装：
`npm i koa-generator -g`
> ### 创建项目：
`koa xxx`
> ### 安装依赖：
```
cd xxx
npm i
```
> ### 拉起项目：
> `npm start`

## /16-koa-demo是用koa官方应用生成器生成的项目

+ ## /17-koa-demo2是模仿koa官方应用生成器目录结构搭建的项目
   ### 路由模块化：
> #### 安装基础依赖：
```
mkdir 17-koa-demo2
cd 17-koa-demo2
npm init -y
npm i --save koa koa-router
```
   > #### 创建各个模块文件夹：
```
mkdir module routes statics views
touch app.js
```

> #### 以上的app.js成了路由中转，各个模块独立出去开发

+ ### 静态模板引擎模块化：
   ```
   npm i --save art-template koa-art-template
   ```
> #### art-template 语法官方网址：/17-koa-demo2不演示art-template具体语法，因为基本上用不到，具体参考：
> http://aui.github.io/art-template/zh-cn/docs/syntax.html
