import ItemLineList from "./ItemLineList.js";

export default function Menu({ barData, imageDirectory }) {
  const appClassName = barData.type === "bar" ? "App-bar" : "App-resto";

  return (
    <div className={`menu ${appClassName}`}>
      <p className="title">{barData.name.toUpperCase()}</p>
      <ItemLineList
        lines={barData.lines}
        imageDirectory={imageDirectory}
        key="itemLineList"
      />
    </div>
  );
}
