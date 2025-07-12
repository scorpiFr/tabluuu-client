import ItemLineOrder from "./ItemLineOrder.js";

export default function ItemLineListOrder({
  lines,
  imageDirectory,
  addOrder,
  subtractOrder,
  useTwoColumns,
  nbrItemOrdered,
}) {
  return (
    <div>
      {lines.map((line) => (
        <ItemLineOrder
          line={line}
          imageDirectory={imageDirectory}
          addOrder={addOrder}
          subtractOrder={subtractOrder}
          useTwoColumns={useTwoColumns}
          nbrItemOrdered={nbrItemOrdered}
          key={line.id}
        />
      ))}
    </div>
  );
}
