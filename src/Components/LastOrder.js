import DisabledItemOrder from "./DisabledItemOrder.js";

export default function LastOrder({ lastOrder, imageDirectory }) {
  const lastCommentary = lastOrder.commentary.replace(/\n/g, " - ");
  return (
    <>
      <div className="panierHeader">Panier</div>
      <br />
      <p>&#10004; Commande envoyée</p>
      {lastCommentary.length <= 0 ? "" : <p>{lastCommentary}</p>}
      {lastOrder.items.map(function (item) {
        return (
          <DisabledItemOrder
            itemData={item}
            imageDirectory={imageDirectory}
            key={item.id}
          />
        );
      })}
    </>
  );
}
