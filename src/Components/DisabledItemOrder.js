export default function DisabledItemOrder({ itemData, imageDirectory }) {
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
        <div className="buttons">
          <button className="button-20" disabled="disabled">
            -
          </button>
          {itemData.qty}
          <button className="button-20" disabled="disabled">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
