// 写法1：
fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())
    .then(data => console.log(data))

// 写法2：
const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
const result = await data.json()
console.log(result)

window.addEventListener('load', () => {
    console.log('loaded')
})
window.addEventListener('unload', () => {
    console.log('unloaded')
})
