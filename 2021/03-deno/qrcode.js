import { qrcode } from 'https://deno.land/x/qrcode/mod.ts'

const imgSrc = await qrcode(Deno.args[0])
Deno.writeTextFile("qrcode.html", `<img src="${imgSrc}" />`)