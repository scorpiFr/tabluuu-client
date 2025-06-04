import ItemOrder from "./ItemOrder.js";

export default function ItemListOrder({
  items,
  imageDirectory,
  addOrder,
  subtractOrder,
  useTwoColumns,
}) {
  return (
    <div
      className={useTwoColumns === 1 ? "flex-container2" : "flex-container1"}
    >
      {items.map(function (item) {
        return (
          <ItemOrder
            itemData={item}
            imageDirectory={imageDirectory}
            addOrder={addOrder}
            subtractOrder={subtractOrder}
            key={item.id}
          />
        );
      })}
    </div>
  );
}
