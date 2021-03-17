import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./route.ts";
const port = 5000;

const app = new Application();

/*
  !如果不加router功能，报错如下：
  ! error: Uncaught TypeError: There is no middleware to process requests.
  !        throw new TypeError("There is no middleware to process requests.");
*/  
app.use(router.routes());
app.use(router.allowedMethods());


console.log(`server running on port ${port}`);

await app.listen({ port });
