import {
  Card, Page, Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { trophyImage } from "../assets";
import { useEffect, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";


export default function HomePage() {
  const [data, setData] = useState([]);
  const fetch = useAuthenticatedFetch();

  // create async function to fetch products
  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const dataMarkup = data.map((item, index) => {
    return (
      <div key={index}>
        <h1>{item.title}</h1>
      </div>
    );
  });

  return (
    <Page>
      <TitleBar
        title="AImage generator"
        primaryAction={{
          content: "Settings",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Support",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Text variant="heading4xl" as="h1">
                    Welcome to <span style={{ color: "#ff595e" }}>AI</span>mage
                  </Text>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, dolorum illo! Aut obcaecati fuga facilis adipisci similique voluptate deserunt natus, fugiat suscipit assumenda consequatur vel explicabo neque ipsam, blanditiis maxime?
                  </p>
                  <>
                    <Link url="#" external>
                      Help
                    </Link> - {" "}
                    <Link url="#" external>
                      Support
                    </Link> - {" "}
                    <Link
                      url="#"
                      external
                    >
                      Docs
                    </Link> - {" "}
                  </>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat eaque tenetur architecto soluta esse, similique quos ad voluptatum.
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
          <Card sectioned>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam consequuntur, id modi fuga labore vel asperiores dignissimos rem quas, odit facere recusandae non ratione blanditiis sit dolorum, corrupti alias maiores.
            </p>
          </Card>
          <Card sectioned>
            { dataMarkup }
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
