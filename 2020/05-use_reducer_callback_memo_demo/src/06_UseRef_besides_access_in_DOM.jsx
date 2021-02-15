import React, { useState, useRef, useEffect, useCallback } from 'react'

const UsageOneAvoidReRender = () => {
  const [name, setName] = useState('')
  // 1. 用法1: 用useRef解决页面用prevState死循环重复渲染问题: 
  const renderCount = useRef(0)

  // 下面这种写法会造成死循环:
  // const [renderCount, setRenderCount] = useState('')
  // useEffect(() => setRenderCount(prevRenderCount => prevRenderCount + 1))
  // 1. 用法1: useRef会根据
  useEffect( () => renderCount.current = renderCount.current + 1 )

  return <>
    <input value={name} onChange={e => setName(e.target.value)}/>
    <div>My name is {name}</div>
    <div>I render {renderCount.current} times</div>
  </>
}

const UsageTwoAccessDOM = () => {
  // 2. 用法2: 在真是DOM上获取原生DOM事件, 比如获取input框的焦点:
  const inputRef = useRef()
  return <>
    <input ref={inputRef} type="text"/>
    <button onClick={() => {inputRef.current.focus(); inputRef.current.value = 'some text'} }>focus</button>
  </>
}

const UsageThreeGetPrveState = () => {
  const [name, setName] = useState('')
  // 3. 用法3: 获取上一步的状态prevState:
  const prevName = useRef('')

  useEffect(()=> prevName.current = name, [name])

  return <>
    <input value={name} onChange={e => setName(e.target.value)}/>
    <div>My name is {name}, <br/>
    and it used to be {prevName.current}</div>
  </>
}


const UseRefBesidesDOM = () => <>
  <UsageOneAvoidReRender/>
  <hr/>
  <UsageTwoAccessDOM/>
  <hr/>
  <UsageThreeGetPrveState/>
</>

export default UseRefBesidesDOM
