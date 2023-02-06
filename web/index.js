// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";
import productCreator from "./graphql/product-creator.js";

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


//get all products
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

//post new product
app.post("/api/products/create", async (req, res) => {

  const title = req.body.title ? req.body.title : 'Product Fail';
  const description = req.body.description ? req.body.description : 'Product Fail';
  const images = req.body.images ? req.body.images : null;
  const session = res.locals.shopify.session;

  // testing purpose
  const myData = [req.body.title, req.body.description, req.body.images];


  try {
    await productCreator(session, title, description, images);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
  }

  // testing purpose
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
