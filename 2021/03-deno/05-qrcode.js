import { qrcode } from 'https://deno.land/x/qrcode/mod.ts'

const imgSrc = await qrcode(Deno.args[0])
Deno.writeTextFile("05qrcode.html", `<img src="${imgSrc}" />`)