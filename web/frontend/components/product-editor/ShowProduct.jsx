import { Button, EmptyState, DataTable } from "@shopify/polaris";

export function ShowProduct(productsTableDisplayData) {
    console.log(productsTableDisplayData, "productsTableDisplayData");
    console.log(typeof productsTableDisplayData, "typeof productsTableDisplayData")
    return (
        <>
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
        </>
    );
}
