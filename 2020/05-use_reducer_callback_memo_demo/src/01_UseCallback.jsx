import React, { useState, memo, useRef, useCallback } from 'react'

const UseCallback = () => {
  const [count, setCount] = useState(0)
  const favoriteNums = [7, 21, 37]

  // const increment = () => setCount(count + 1)
  // 3. 优化: increment需要用useCallback包起setCount函数
  const increment = useCallback(
    // 3. 且将 count 设置为回调函数触发, 
    // 则子组件再次点击button触发increment时,不会同时触发useCountRenders()  
    n => setCount( count => count + n ),
    [setCount],
  )
  
  return (
    <div>
      <Increment increment={increment} />
      <div>{count}</div>
    </div>
  )
}
export default UseCallback

// 1. increment 函数从父组件过来, 用React.memo包裹, 则等increment函数被触发时才更新, 不会页面整体刷新
const Increment = memo(({ increment }) => {
  useCountRenders()
  return <button onClick={ () => increment(3) }>increment</button>
})

// 2. 加入useRef, 使Increment Comp变得复杂, 此时点击increment,与useCountRenders无关, 控制台也会打印, 耗费性能
const useCountRenders = () => {
  const renders = useRef(0)
  console.log('renders:', renders.current++);
}
