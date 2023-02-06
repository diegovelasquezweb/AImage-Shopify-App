import React, { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

function CreateProduct() {
  const [product, setProduct] = useState({
    title: "My New Product",
    vendor: "My Vendor",
    product_type: "My Product Type",
    body_html: "This is my new product description.",
    variants: [
      {
        price: "19.99",
        sku: "MY-SKU-001"
      }
    ]
  });

  const [createProduct, { loading, error }] = useAuthenticatedFetch({
    url: "/admin/api/2021-01/products.json",
    method: "POST",
    body: JSON.stringify({ product })
  });

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const data = await createProduct();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>Error creating product: {error.message}</p>}
      <button type="submit" disabled={loading}>
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
