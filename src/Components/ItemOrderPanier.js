import { useState } from "react";

export default function ItemOrderPanier({
  itemData,
  imageDirectory,
  addOrder,
  subtractOrder,
}) {
  // eslint-disable-next-line
  const [tmp, setTmp] = useState(0);
  function handleAddOrder(itemId) {
    addOrder(itemData.id);
    setTmp((t) => t + 1);
  }
  function handleSubstractsOrder(itemId) {
    subtractOrder(itemData.id);
    setTmp((t) => t + 1);
  }

  // render functions
  return (
    <div className="cadre">
      <div className="texte">
        <p className="panierItemTitle" nowrap="true">
          <button
            className="minibutton-20"
            onClick={() => handleSubstractsOrder(itemData.id)}
          >
            -
          </button>
          &nbsp;{itemData.qty}&nbsp;
          <button
            className="minibutton-20"
            onClick={() => handleAddOrder(itemData.id)}
          >
            +
          </button>
          &nbsp;
          {itemData.name}
        </p>
      </div>
    </div>
  );
}
