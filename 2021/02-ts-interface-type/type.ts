type Hungry = boolean

type Greeting_t = ( name: string ) => string
const greeting: Greeting_t = ( name ) => 'Hello!'

type Person_t = {
    name: string
    hungry: boolean
}

type Youtuber = { youtuber: boolean }

// type可声明联合类型：
type Kyle_t = Person_t | Youtuber

const kyle: Kyle_t = {
    name: 'Kyle',
    hungry: false,
    youtuber: false
}

class AAA implements Person_t {
    name: string
    hungry: boolean
    x: number
}


type Keys = 'firstname' | 1

type combimeType = {
    [key in Keys] : string | number
}

const test: combimeType = {
    firstname: 'Kyle',
    1: 111
}

console.log(test) // { '1': 111, firstname: 'Kyle' }