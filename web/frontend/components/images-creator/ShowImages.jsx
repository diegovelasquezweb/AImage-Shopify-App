const Skeleton = ({ item }) => {
  return [...Array(item).keys()].map((index) => (
    <div className="" key={index}>
      <div className="">
        Loading...
      </div>
    </div>
  ))
}

const ImageCard = ({ image }) => {
  return (
    <img className="" width="200" height="200" src={image} alt="" />
  )
}

export const ShowImages = ({ listImages, isLoading }) => {
  return (
    <div className="">
      {isLoading ? <Skeleton item={1} /> : listImages.map((image, index) => <ImageCard image={image.url} key={index} />)}
    </div>
  )
}