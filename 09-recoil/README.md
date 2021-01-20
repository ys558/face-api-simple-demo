# React的官方的状态管理器Recoil的使用

Recoil为Facebook官方出的, 原理和Redux类似, 和Redux不同的是, Recoil能局部更新组件, 不像Redux更新后需要整体刷新, 耦合性太强

用 `create-react-app` 生成项目后, 修改`src/index.js`文件:

将 RecoilRoot 引入并包裹在根部, 使其全局生效:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
++ import { RecoilRoot } from 'recoil'

ReactDOM.render(
++  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
++  </RecoilRoot>,
  document.getElementById('root')
);

```

创建`src/stateManager.js`, `atom` 存储一些键值对的状态
```js
import { atom } from 'recoil'

export const leftColorState = atom({
    key: 'leftColorState', 
    default: 'red',
});

export const rightColorState = atom({
    key: 'rightColorState', 
    default: 'green',
});
```


分别创建两个 Components : [`components/LeftBox.jsx`](https://github.com/ys558/js-simple-demo/tree/master/09-recoil/src/components/LeftBox.jsx) 和 [`components/RightBox.jsx`](https://github.com/ys558/js-simple-demo/tree/master/09-recoil/src/components/RightBox.jsx)

改写`src/App.js`, 整体项目结构是, 点击左边方块让右边变色; 点击右边方块, 让左边变色, 用App.js包着, 利用Recoil里的atom将state独立出去管理, 不再由父组件管理状态:

```js
import { LeftBox } from './components';
import { RightBox } from './components';

function App() {
  return  <div style={{display: "flex", flexDirection: "row"}}>
    <LeftBox />
    <RightBox />
  </div>
}

export default App;
```

