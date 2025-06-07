import DisabledItemOrder from "./DisabledItemOrder.js";

export default function LastOrder({ lastOrder, imageDirectory, barType }) {
  function getBill() {
    if (!lastOrder.items.length) {
      return 0;
    }
    let sum = 0;
    for (let cptI in lastOrder.items) {
      if (
        lastOrder.items[cptI].qty > 0 &&
        parseFloat(lastOrder.items[cptI].price) > 0
      ) {
        sum +=
          lastOrder.items[cptI].qty * parseFloat(lastOrder.items[cptI].price);
      }
    }
    return sum;
  }

  // bill
  const bill = getBill();

  // render functions
  let commentaryExample = "";
  if (barType === "bar") {
    commentaryExample = "des glacons, pas de citrons svp";
  } else if (barType === "kebab") {
    commentaryExample =
      "sauce algérienne, cannette de fanta et pas d'oignons svp";
  } else if (barType === "resto") {
    commentaryExample = "viande a point svp";
  }

  return (
    <>
      <div className="panierHeader">Panier</div>
      <br />

      {lastOrder.items.map(function (item) {
        return (
          <DisabledItemOrder
            itemData={item}
            imageDirectory={imageDirectory}
            key={item.id}
          />
        );
      })}
      <p className="orderCommentaryLine">
        Total: {bill}€ <br />
        Commentaires (optionnel) :
      </p>
      <p className="commentaryExample">ex : {commentaryExample}</p>
      <textarea
        disabled
        id="commentaire"
        placeholder={`(optionnel) : ${commentaryExample}`}
        value={lastOrder.commentary}
      />
      <br />
      <p>&#10004; Commande envoyée</p>
    </>
  );
}
