const Skeleton = ({ item }) => {
  return [...Array(item).keys()].map((index) => (
    <div className="" key={index}>
      <div className="">
        Icon
      </div>
    </div>
  ))
}

export default Skeleton