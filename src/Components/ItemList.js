import Item from "./Item.js";

export default function ItemList({ items, imageDirectory }) {
  return (
    <div className="flex-container">
      {items.map(function (item, index) {
        return (
          <Item item={item} imageDirectory={imageDirectory} key={item.id} />
        );
      })}
    </div>
  );
}
