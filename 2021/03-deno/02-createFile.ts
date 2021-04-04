const encoder = new TextEncoder()

const greetText = encoder.encode('hello world\nMy name is Kyle')

await Deno.writeFile('02-greet.txt', greetText)