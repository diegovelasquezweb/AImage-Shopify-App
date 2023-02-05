import { useEffect, useState } from "react";

const Header = ({ setListImages, setIsLoading }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch("https://genieart-api-production.up.railway.app/openai/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: inputValue
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
    <div>
      <form className="" onSubmit={handleSubmit}>
        <input value={inputValue} onChange={handleInputChange} className="" type="text" placeholder="Unleash the power of AI to create" />
        <button type="submit" className="">
          Click
        </button>
      </form>
    </div>
  );
};

export default Header;