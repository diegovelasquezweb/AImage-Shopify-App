import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./../shopify.js";

export default async function fetchProducts(session) {
    try {
        const client = new shopify.api.clients.Graphql({ session });
        const data = await client.query({
            data: `query {
            products(first: 10, reverse: true) {
              edges {
                node {
                  id
                  title
                  handle
                  resourcePublicationOnCurrentPublication {
                    publication {
                      name
                      id
                    }
                    publishDate
                    isPublished
                  }
                }
              }
            }
          }`,
        });
ß
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