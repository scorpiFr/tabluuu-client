import ItemListOrder from "./ItemListOrder.js";

export default function ItemLineOrder({
  line,
  imageDirectory,
  addOrder,
  subtractOrder,
  useTwoColumns,
  nbrItemOrdered,
}) {
  return (
    <>
      <div className="lineHeader">{line.name}</div>
      <ItemListOrder
        items={line.items}
        imageDirectory={imageDirectory}
        addOrder={addOrder}
        subtractOrder={subtractOrder}
        useTwoColumns={useTwoColumns}
        nbrItemOrdered={nbrItemOrdered}
        key={line.id}
      />
    </>
  );
}
