export default function Item({ item, imageDirectory }) {
  const desc = !item.description.length ? "" : <p>{item.description}</p>;
  const miniatureUrl = item.miniature ? item.miniature : item.image;
  const image = !item.image ? (
    ""
  ) : (
    <div className="image">
      <a
        href={`${imageDirectory}${item.image}`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="itemPreview"
          src={`${imageDirectory}${miniatureUrl}`}
          alt="Item"
        />
      </a>
    </div>
  );

  return (
    <div className="cadre">
      {image}

      <div className="texte">
        <p className="itemTitle">
          {item.name} - {item.price} €
        </p>
        {desc}
      </div>
    </div>
  );
}
