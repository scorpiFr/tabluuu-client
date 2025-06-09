import DisabledItemOrder from "./DisabledItemOrder.js";
import TooltipWrapper from "./TooltipWrapper.js";

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
        Total: {bill}€<br />
        <br />
        Commentaire (optionnel)
        <TooltipWrapper message={`ex : ${commentaryExample}`} />
        &nbsp;:
      </p>
      <textarea disabled id="commentaire" value={lastOrder.commentary} />
      <br />
      <p>&#10004; Commande envoyée</p>
    </>
  );
}
