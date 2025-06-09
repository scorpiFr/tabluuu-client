import { useState } from "react";
import ItemOrderPanier from "./ItemOrderPanier";
import Loader from "./Loader.js";
import TooltipWrapper from "./TooltipWrapper.js";

export default function Panier({
  lines,
  imageDirectory,
  addOrder,
  subtractOrder,
  handlePopulateLastOrder,
  sendMail,
  barType,
}) {
  const [commentary, setCommentary] = useState("");
  const [isLoading, setIsLoading] = useState(0);

  function handleSubmit(e) {
    // loading status
    e.preventDefault();
    setIsLoading(1);
    // sending mail
    sendMail(commentary, lines);
    // populate last order
    handlePopulateLastOrder(commentary);
    // unloading status
    setIsLoading(0);
    return false;
  }

  function getBill() {
    if (!lines.length) {
      return 0;
    }
    let sum = 0;
    for (let cptL in lines) {
      for (let cptI in lines[cptL].items) {
        if (
          lines[cptL].items[cptI].qty > 0 &&
          parseFloat(lines[cptL].items[cptI].price) > 0
        ) {
          sum +=
            lines[cptL].items[cptI].qty *
            parseFloat(lines[cptL].items[cptI].price);
        }
      }
    }
    return sum;
  }

  // loading status
  if (isLoading) {
    return <Loader />;
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
      {lines.map((line) =>
        line.items
          .filter((i) => i.qty > 0)
          .map(function (item) {
            return (
              <ItemOrderPanier
                itemData={item}
                imageDirectory={imageDirectory}
                addOrder={addOrder}
                subtractOrder={subtractOrder}
                key={item.id}
              />
            );
          })
      )}
      <form onSubmit={handleSubmit}>
        <p className="orderCommentaryLine">
          Total: {bill}€<br />
          <br />
          Commentaire (optionnel)
          <TooltipWrapper message={`ex : ${commentaryExample}`} />
          &nbsp;:
        </p>
        <textarea
          id="commentaire"
          placeholder={`(optionnel) : ${commentaryExample}`}
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
        />
        <br />
        <button className="button-20" onClick={handleSubmit}>
          Envoyer la commande
        </button>
      </form>
    </>
  );
}
