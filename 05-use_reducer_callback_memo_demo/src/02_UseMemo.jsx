import React, { useState, useMemo, useEffect } from 'react'

// 设置一函数: 运行10亿次效率很慢, 面临两个窘境:
// 1. 页面或点击input框上下键改变数字, 有很大时延
// 2. 点击button改变主题时,会触发UseMemo,整体刷新,一并该函数的console.log('calling slow func'), 也有很大时延 
const slowFunction = (number) => {
  console.log('calling slow func')
  for (let i=0; i<=1000000000; i++) {}
  return number * 2
}

const UseMemo = () => {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  
  // const doubleNumber = slowFunction(number)
  // 1.0 利用useMemo优化该函数, 解决上面第2点, 点击button时, 页面只局部刷新, 不会执行slowFunction函数的console.log('calling slow func'):
  const doubleNumber = useMemo(()=> slowFunction(number), [number])

  // 1.2 此时themeStyles也可以用useMemo进行缓存优化: 当dark变量改变即点击button时, 才触发console.log('theme changed'),
  const themeStyles = useMemo(()=> ({
    backgroundColor: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black'
  }), [dark])

  // 1.1 当组件中加入useEffect函数, 且该函数绑定themeStyles, 也会触发页面整体刷新, 点击button时或者改变input框数字时, 均会触发console.log('theme changed')
  useEffect(() => console.log('theme changed'), [themeStyles])
  
  return <div>
    <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
    <button onClick={()=> setDark(prevDark => !prevDark)}>Change Theme</button>
    <div style={themeStyles}>{doubleNumber}</div>
  </div>
}
export default UseMemo

