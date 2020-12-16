import React,{ useState, useEffect, } from 'react'


// custom hooks 1: set input value into local storage
export const useLocalStorage = (key, initialValue) => {
  const getSavedValue = (key, initialValue) => {
    const savedValue = JSON.parse(localStorage.getItem(key))
    
    if (savedValue) return savedValue
    if (initialValue instanceof Function) return initialValue()
  
    return initialValue
  }

  const [value, setValue] = useState(() => getSavedValue(key, initialValue))

  useEffect(()=> {
    localStorage.setItem(key, JSON.stringify(value))
  },[value])

  // 匿名导出:
  return [value, setValue]
}

// custom hooks 2: output logger in browser console
export const useUpdateLogger = (value) => {
  useEffect(() => {
    console.log(value);
  }, [value])
}


const CustomHook = () => {
  // [name, setName] 名字可自定义,不参照useLocalStorage里的[value, setValue]
  const [name, setName] = useLocalStorage('name', '')
  useUpdateLogger(name)

  return <input
    type="text"
    value={name}
    onChange={e => setName(e.target.value)}
  />
}

export default CustomHook

