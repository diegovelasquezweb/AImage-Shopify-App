import { TextField, Button, Form, FormLayout, EmptyState, DataTable, Card, TextContainer } from "@shopify/polaris";
import { ResourcePicker, Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../../hooks";
import { useState, useMemo, useEffect } from "react";

export function EditProduct() {

  const [title, setTitle] = useState('');
  const [appendToDescription, setAppendToDescription] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [id, setId] = useState('');
  const fetch = useAuthenticatedFetch();

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

  // useEffect(() => {
  //   console.log(title, "title");
  // }, [title]);


  // string to json
  // const title = JSON.parse(appendToTitle);
  // console.log(title, "title");

  // const handleUpdate = async () => {
  //   await fetch("/api/products/create", {
  //     title: JSON.stringify(appendToTitle),
  //   })
  // };


  const handlePopulate = async () => {
    console.log(title, "title")
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title
      }),
    });

    if (response.ok) {
      console.log("Success");
      console.log(response, "response");
    } else {
      console.log("Error");
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/products");
  //     try {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {toastMarkup}
      <></>
      <Form>
        <FormLayout>
          <TextField
            label="Append to title"
            value={title}
            onChange={setTitle}
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
        title="Product add"
        sectioned
        primaryFooterAction={{
          content: "Dios",
          onAction: handlePopulate,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Sample products are created with a default title and price. You can
            remove them at any time.
          </p>
        </TextContainer>
      </Card>
    </>
  );
}