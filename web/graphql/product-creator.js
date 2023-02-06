import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../shopify.js";


const CREATE_PRODUCTS_MUTATION = `
  mutation productCreate($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id,
        title,
        bodyHtml
      }
    }
  }
`;

export default async function productCreator(
  session,
  count,
  title,
  description
) {
  const client = new shopify.api.clients.Graphql({ session });

  try {
    for (let i = 0; i < count; i++) {
      await client.query({
        data: {
          query: CREATE_PRODUCTS_MUTATION,
          variables: {
            input: {
              title: title,
              bodyHtml: description
            },
          },
        },
      });
    }
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
