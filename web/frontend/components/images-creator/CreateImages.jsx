import { useState } from "react";
import { TextContainer, TextField, Button } from "@shopify/polaris";

export const CreateImages = ({ setListImages, setIsLoading }) => {
  const [promptValue, setPromptValue] = useState("");

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://aimage-api-production-7cdf.up.railway.app/openai/images", {
        // const response = await fetch("http://localhost:5500/openai/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: promptValue
        })
      })
      const jsonData = await response.json();
      setListImages(jsonData.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TextContainer spacing="loose">
        <TextField
          label="Create an image with a prompt"
          value={promptValue}
          onChange={setPromptValue}
        />
        <Button primary onClick={() => handleSubmit()}>Generate Image</Button>
    </TextContainer>
  );
};
