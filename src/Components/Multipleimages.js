import KeenSlider from "./KeenSlider.js";

export default function Multipleimages({ barData, imageDirectory }) {
  // construct images full url
  const images = barData.images.map(
    (currElement) => `${imageDirectory}${currElement}`
  );

  return (
    <div className="App">
      <p className="title">{barData.name.toUpperCase()}</p>
      <KeenSlider images={images} />
    </div>
  );
}
