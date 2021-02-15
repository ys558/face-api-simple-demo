import React, { useState, useEffect,  useRef } from 'react'

const useEventListener = (eventType, handler) => {
  const handlerRef = useRef(handler)

  useEffect(()=> handlerRef.current = handler)

  useEffect(() => {
    console.log('effect Ran')

    const internalHandler = e => handlerRef.current(e)
    document.addEventListener(eventType, internalHandler)
    
    return () => document.removeEventListener(eventType, internalHandler)
  }, [eventType])
}

const UseEventListenerPage = () => {
  const [count, setCount] = useState(0)
  
  useEventListener('click', () => {
    console.log('i ma global', count);
  })

  return <div>
      <h1>UseEventListener</h1>
      <button onClick={() => setCount(c => c+1)}>hello: {count}</button>
    </div>
}

export default UseEventListenerPage
