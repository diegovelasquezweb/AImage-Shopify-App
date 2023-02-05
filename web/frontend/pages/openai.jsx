import { useState } from "react"
import Header from "../components/openai/Header"
import ImageResults from "../components/openai/ImageResults"
import { Card, Page, Layout, TextContainer, Heading } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function PageName() {
    const [listImages, setListImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  return (
    <Page>
      <TitleBar
        title="Page name"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
                <Header setListImages={setListImages} setIsLoading={setIsLoading} />
                <ImageResults listImages={listImages} isLoading={isLoading} />
            </TextContainer>
          </Card>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card sectioned>
            <Heading>Heading</Heading>
            <TextContainer>
              <p>Body</p>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}