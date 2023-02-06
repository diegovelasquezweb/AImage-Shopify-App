import { TextField, Button, Form, FormLayout, EmptyState, DataTable, Card, TextContainer } from "@shopify/polaris";
import { ResourcePicker, Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../../hooks";
import { useState, useMemo, useEffect } from "react";

export function EditProduct({ listImages, isLoading }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const fetch = useAuthenticatedFetch();

  const toastMarkup = showToast ? (
    <Toast
      content="Changes saved"
      onDismiss={() => setShowToast(false)}
      duration={3000}
    />
  ) : null;

  const imagesArray = listImages.map((image) => image.url);
  const images = imagesArray.toString()

  const handleSubmit = async () => {
    const response = await fetch("/api/products/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        images
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

      {/* { listImages.map((image, index) => <img key={index} className="" width="200" height="200" src={image.url} alt="" />) } */}
      <Form onSubmit={handleSubmit}>
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
          <Button primary submit>Create Product</Button>
          <a href={images} download target="_blank">Download image</a>
        </FormLayout>
      </Form>

    </>
  );
}