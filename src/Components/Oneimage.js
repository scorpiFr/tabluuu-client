export default function Oneimage({ barData, imageDirectory }) {
  return (
    <div className="App">
      <p className="title">{barData.name.toUpperCase()}</p>
      <img
        src={`${imageDirectory}${barData.images[0]}`}
        alt={`Menu of ${barData.name}`}
      />
    </div>
  );
}
