import ImageCard from "./ImageCard";
import Skeleton from "./Skeleton"
import { useEffect } from "react";

const ImageResults = ({ listImages, isLoading}) => {
  useEffect(() => {
    console.log(listImages)
  }, [listImages])
  return (
    <div className="">
      <div className="">
        {listImages.map((image, index) => <ImageCard image={image.url} key={index} />)}
      </div>
    </div>
  )
}

export default ImageResults