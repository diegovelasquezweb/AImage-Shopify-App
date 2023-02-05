import { TextField, Button, Form, FormLayout, EmptyState, DataTable } from "@shopify/polaris";
import { ResourcePicker, Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../../hooks";
import { useState, useMemo } from "react";
// import { ShowProduct } from "../../components";

export function EditProduct() {

  const [appendToTitle, setAppendToTitle] = useState('');
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

  const productsTableDisplayData = useMemo(() => products.map((product) => [
    product.id, product.title, `${product.title}${appendToTitle}`, product.descriptionHtml, `${product.descriptionHtml}${appendToDescription}`
  ]), [products, appendToTitle, appendToDescription]);

  // const result = Object.values(productsTableDisplayData);
  return (
    <>
      {toastMarkup}
      <Form>
        <FormLayout>
          <TextField
            label="Append to title"
            value={appendToTitle}
            onChange={setAppendToTitle}
            spacer="--p-space-025"
          />
          <TextField
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
              console.log(resources.selection[0], "resources");
            }}
          />
          <Button primary onClick={() => setPickerOpen(true)}>Select Product</Button>
          {/* <ShowProduct productsTableDisplayData={result} /> */}
          
            {productsTableDisplayData.length ?
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
            }
            <Button primary>Update Products</Button>
        
        </FormLayout>
      </Form>
    </>
  );
}