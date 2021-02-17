interface Person {
    name: string
    hungry: boolean;
}

// extends 可以用于扩展接口：
interface Kyle extends Person {
    youtuber: boolean;
}

const me : Person = {
    name: 'Kyle',
    hungry: false,
}

// class类实现了Person：
class Kyle implements Person {
    name: string;
    hungry: boolean;
}

interface Greeting {
    ( name: string ) : string;
}

const myGreeting: Greeting = ( name: string ) => 'Hello!'

console.log(Kyle)