import { useState } from "react";

export default function ItemOrder({
  itemData,
  imageDirectory,
  addOrder,
  subtractOrder,
}) {
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
  const desc = !itemData.description.length ? (
    ""
  ) : (
    <p>{itemData.description}</p>
  );
  const miniatureUrl = itemData.miniature ? itemData.miniature : itemData.image;
  const image = !itemData.image ? (
    ""
  ) : (
    <div className="image">
      <a
        href={`${imageDirectory}${itemData.image}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="itemPreview"
          src={`${imageDirectory}${miniatureUrl}`}
          alt={`Item ${itemData.id}`}
        />
      </a>
    </div>
  );

  return (
    <div className="cadre">
      {image}

      <div className="texte">
        <p className="itemTitle">
          {itemData.name} - {itemData.price} €
        </p>
        {desc}
        <div classNAme="buttons">
          {itemData.qty === 0 ? (
            <button
              className="button-20"
              onClick={() => handleAddOrder(itemData.id)}
            >
              Ajouter
            </button>
          ) : (
            <>
              <button
                className="button-20"
                onClick={() => handleSubstractsOrder(itemData.id)}
              >
                -
              </button>
              {itemData.qty}
              <button
                className="button-20"
                onClick={() => handleAddOrder(itemData.id)}
              >
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
