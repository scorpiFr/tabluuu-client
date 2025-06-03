import ItemLine from "./ItemLine.js";

export default function ItemLineList({ lines, imageDirectory }) {
  return (
    <div>
      {lines.map((line) => (
        <ItemLine line={line} imageDirectory={imageDirectory} key={line.id} />
      ))}
    </div>
  );
}
