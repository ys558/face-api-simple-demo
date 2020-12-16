import React, { useState, useEffect, useCallback } from 'react'

const UseCallback2 = () => {
  const [dark, setDark] = useState(false)
  const [number, setNumber] = useState(1)

  // 不用useCallback, 点击按钮时会连带触发List组件更新, 控制台打印一直update items, 耗费性能
  // const getItems = () => {
  //   return [number, number+1, number+2]
  // }

  const getItems = useCallback(n => {
    return [number, number+1+n, number+2+n]
  }, [number])

  const theme = {
    backgroundColor: dark ? '#333': '#FFF',
    color: dark ? '#FFF' : '#333'
  }

  return (
    <div style={theme}>
      <input type="text" value={number} onChange={e => { 
        if (e.target.value ){
          setNumber(parseInt(e.target.value))
        }
      }} />
      <List getItems={getItems}/>
      <button onClick={() => setDark(prevDark => !prevDark)}>Toggle theme</button>
    </div>
  )
}

export default UseCallback2

const List = ({ getItems }) => {
  const [items, setItems] = useState([])
  
  useEffect(() => {
    setItems(getItems(5))
    console.log('update items');
  }, [getItems])

  return items.map(i => <div key={i}> {i}</div>)
}