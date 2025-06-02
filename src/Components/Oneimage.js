export default function Oneimage({ barData, imageDirectory }) {
  const appClassName = barData.type === "bar" ? "App-bar" : "App-resto";

  return (
    <div className={appClassName}>
      <p className="title">{barData.name.toUpperCase()}</p>
      <img
        src={`${imageDirectory}${barData.images[0]}`}
        alt={`Menu of ${barData.name}`}
      />
    </div>
  );
}
