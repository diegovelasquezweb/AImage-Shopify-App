import { TextField, Button, Form, FormLayout, EmptyState, DataTable, Card, TextContainer } from "@shopify/polaris";
import { ResourcePicker, Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../../hooks";
import { useState, useMemo, useEffect } from "react";

export function EditProduct(listImages) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const fetch = useAuthenticatedFetch();

  console.log(listImages, "listImages");

  const toastMarkup = showToast ? (
    <Toast
      content="Changes saved"
      onDismiss={() => setShowToast(false)}
      duration={3000}
    />
  ) : null;

  // const productsTableDisplayData = useMemo(() => products.map((product) => [
  //   product.id, product.title, `${product.title}${appendToTitle}`, product.descriptionHtml, `${product.descriptionHtml}${appendToDescription}`
  // ]), [products, appendToTitle, appendToDescription]);

  const handleSubmit = async () => {
    console.log(title, "title")
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description
      }),
    });

    if (response.ok) {
      setShowToast(true);
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      {toastMarkup}
      <Form>
        <FormLayout>
          <TextField
            label="Title"
            value={title}
            onChange={setTitle}
          />
          <TextField
            label="Description"
            value={description}
            onChange={setDescription}
            multiline={4}
          />
          {/* <Button primary submit>Update Products</Button> */}
          {/* <TextField
            label="Append to description1"
            value={appendToDescription}
            onChange={setAppendToDescription}
          />
          <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={pickerOpen}
            selectMultiple={false}
            onSelection={(resources) => {
              setProducts(resources.selection);
              setId(resources.selection[0].id);
              // console.log(resources.selection[0], "resources");
            }}
          />
          <Button primary onClick={() => setPickerOpen(true)}>Select Product</Button> */}
          {/* <ShowProduct productsTableDisplayData={result} /> */}

          {/* {productsTableDisplayData.length ?
            <DataTable
              columnContentTypes={['text', 'text', 'text', 'text', 'text']}
              headings={['ID', 'oldTitle', 'newTitle', 'oldDesc', 'NewDesc']}
              rows={productsTableDisplayData}
            /> : <EmptyState
              heading="No products selected"
              image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            >
              <p>Lorem ipsum</p>
            </EmptyState>
          } */}


        </FormLayout>
      </Form>
      <Card
        sectioned
        spacing="loose"
        primaryFooterAction={{
          content: "Create Product",
          onAction: handleSubmit,
        }}
      >
      </Card>
    </>
  );
}