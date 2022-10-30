const { Application, Router } = require("@oakserver/oak");
require("dotenv").config();

const { create, getAll, getOriginal } = require("./services/url");

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = `
    <!DOCTYPE html>
    <h1>My URL shortener</h1>
    <form action="/api/urls" method="post">
        <input type="url" name="url">
        <button type="submit">Shorten</button>
    </form>
    `;
  })
  .get("/:id", async (context) => {
    const original = await getOriginal(context.params.id);
    context.response.redirect(original);
  })
  .get("/api/urls", async (context) => {
    const urls = await getAll();
    context.response.body = urls;
  })
  .post("/api/urls", async ({ request, response }) => {
    const body = request.body();
    const params = await body.value;
    const original = params.get("url");
    const shortened = await create(original);
    response.body = `
      <!DOCTYPE html>
      <a href="${original}">${original}</a>
      is now at
      <a href="/${shortened}">/${shortened}</a>
      `;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(":3000");
