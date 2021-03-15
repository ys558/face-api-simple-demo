let file = await Deno.open('02-greet.txt')
await Deno.copy(file, Deno.stdout)
file.close()