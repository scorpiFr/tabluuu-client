import KeenSlider from "./KeenSlider.js";

export default function Multipleimages({ barData, imageDirectory }) {
  const appClassName = barData.type === "bar" ? "App-bar" : "App-resto";
  // construct images full url
  const images = barData.images.map(
    (currElement) => `${imageDirectory}${currElement}`
  );

  return (
    <div className={appClassName}>
      <p className="title">{barData.name.toUpperCase()}</p>
      <KeenSlider images={images} />
    </div>
  );
}
