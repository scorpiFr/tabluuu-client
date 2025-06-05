import { useState } from "react";
import ItemOrder from "./ItemOrder";
import Loader from "./Loader.js";

export default function Panier({
  lines,
  imageDirectory,
  addOrder,
  subtractOrder,
  handlePopulateLastOrder,
  sendMail,
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

  const bill = getBill();
  return (
    <>
      <div className="panierHeader">Panier</div>
      <br />
      {lines.map((line) =>
        line.items
          .filter((i) => i.qty > 0)
          .map(function (item) {
            return (
              <ItemOrder
                itemData={item}
                imageDirectory={imageDirectory}
                addOrder={addOrder}
                subtractOrder={subtractOrder}
                key={item.id}
              />
            );
          })
      )}
      <p></p>
      <form onSubmit={handleSubmit}>
        <p className="orderCommentaryLine">
          Total: {bill}€ <br />
          Commentaires :
        </p>
        <textarea
          placeholder="Avec des glaçons svp"
          value={commentary}
          onChange={(e) => setCommentary(e.target.value)}
        />
        <br />
        <button className="button-20" onClick={handleSubmit}>
          Commander
        </button>
      </form>
    </>
  );
}
