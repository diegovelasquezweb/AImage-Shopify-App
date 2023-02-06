import { useState } from "react"
import { Card, Page, Layout } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { EditProduct, CreateImages, ShowImages } from "../components";

export default function PageName() {
    const [listImages, setListImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  return (
    <Page>
      <TitleBar
        title="Create images with AI"
        primaryAction={{
          content: "Learn more",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Lorem Ipsum",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <CreateImages setListImages={setListImages} setIsLoading={setIsLoading} />
            <ShowImages listImages={listImages} isLoading={isLoading} />
            <EditProduct listImages={listImages} />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}