// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import productCreator from "./product-creator.js";

// @ts-ignore
const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  // @ts-ignore
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products", async (_req, res) => {
  try {
    const response = await shopify.api.rest.Product.all({
      session: res.locals.shopify.session,
    });
    res.status(200).send(response);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// app.get("/api/products/create", async (req, res) => {
//   console.log(req.body)
//   if (!req?.body?.title) {
//     return res.status(400).send({ 'message': 'field is required' });
//   }

//   let status = 200;
//   let error = null;

//   try {
//     const session = res.locals.shopify.session;
//     const client = new shopify.api.clients.Graphql({ session });
//     await client.query({
//       data: `mutation {
//         productCreate(input: { title: "${req.body.title}", productType: "snow", vendor: "apple" }) {
//           product {
//             id
//           }
//         }
//       }`
//     })

//   } catch (err) {
//     console.log(err);
//     status = 500;
//     error = err.message;
//   }
//   res.status(status).send({ success: status === 200, error })
// });

app.post("/api/products/create", async (req, res) => {
  // if (!req?.body?.title) {
  //   return res.status(400).send({ 'message': 'field is required' });
  // }
  const myData = req.body.title;

  const title = req.body.title ? req.body.title : 'test3';
  const count = 1;
  const session = res.locals.shopify.session;

  try {
    await productCreator(session, count, title);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
  }
  res.status(200).send(myData);
});



app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
