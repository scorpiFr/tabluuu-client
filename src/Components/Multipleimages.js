import KeenSlider from "./KeenSlider.js";

/*

      <img
        src={`${imageDirectory}${barData.images[0]}`}
        alt={`Menu of ${barData.name}`}
      />

      */

export default function Multipleimages({ barData, imageDirectory }) {
  const images = barData.images.map(
    (currElement, index) => `${imageDirectory}${currElement}`
  );

  console.log(images);
  return (
    <div className="App">
      <p className="title">{barData.name.toUpperCase()}</p>
      <KeenSlider images={images} />
    </div>
  );
}
