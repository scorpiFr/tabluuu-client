import { useState } from "react";
import ItemLineListOrder from "./ItemLineListOrder.js";
import Panier from "./Panier.js";
import LastOrder from "./LastOrder.js";

export default function Commande({
  barData,
  imageDirectory,
  setBarData,
  sendMail,
}) {
  const [nbrItemOrdered, setNbrItemOrdered] = useState(0);
  const [lastOrder, setLastOrder] = useState({ commentary: "", items: [] });
  const [firstTimeAdd, setfirstTimeAdd] = useState(false);

  function resetLastOrder() {
    setLastOrder({ commentary: "", items: [] });
  }

  function populateLastOrder(commentary) {
    let lastOrderNewData = { commentary: commentary, items: [] };
    for (let cptL in barData.lines) {
      for (let cptI in barData.lines[cptL].items) {
        if (barData.lines[cptL].items[cptI].qty > 0) {
          lastOrderNewData.items.push({
            ...barData.lines[cptL].items[cptI],
          });
          barData.lines[cptL].items[cptI].qty = 0;
        }
      }
    }
    setBarData((b) => ({ ...b, data: barData }));
    setLastOrder(lastOrderNewData);
    setNbrItemOrdered(0);
  }

  // add 1 item to the order.
  function handleAddOrder(itemId) {
    setBarData(function (b) {
      if (!b.data.lines.length) {
        return b;
      }
      for (let cptL in b.data.lines) {
        for (let cptI in b.data.lines[cptL].items) {
          if (b.data.lines[cptL].items[cptI].id === itemId) {
            b.data.lines[cptL].items[cptI].qty += 1;
          }
        }
      }
      return b;
    });
    setNbrItemOrdered((n) => n + 1);
    resetLastOrder();

    // scroll to top if first time add item
    if (!firstTimeAdd) {
      setfirstTimeAdd(true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // remove 1 item to the order.
  function handleSubtractOrder(itemId) {
    setBarData(function (b) {
      if (!b.data.lines.length) {
        return b;
      }
      for (let cptL in b.data.lines) {
        for (let cptI in b.data.lines[cptL].items) {
          if (b.data.lines[cptL].items[cptI].id === itemId) {
            b.data.lines[cptL].items[cptI].qty =
              b.data.lines[cptL].items[cptI].qty <= 0
                ? 0
                : b.data.lines[cptL].items[cptI].qty - 1;
          }
        }
      }
      return b;
    });
    setNbrItemOrdered((n) => (n <= 0 ? 0 : n - 1));
    resetLastOrder();
  }

  // render functions
  const appClassName = barData.type === "bar" ? "App-bar" : "App-resto";

  // last order
  if (lastOrder.items.length > 0) {
    return (
      <div className={`menu ${appClassName}`}>
        <p className="title">{barData.name.toUpperCase()}</p>
        <div className="lineList2">
          <LastOrder
            lastOrder={lastOrder}
            imageDirectory={imageDirectory}
            barType={barData.type}
          />
        </div>
        <div className="lineList2">
          <ItemLineListOrder
            lines={barData.lines}
            imageDirectory={imageDirectory}
            addOrder={handleAddOrder}
            subtractOrder={handleSubtractOrder}
            useTwoColumns={1}
            nbrItemOrdered={nbrItemOrdered}
          />
        </div>
      </div>
    );
  }

  // 2 columns
  if (nbrItemOrdered <= 0) {
    return (
      <div className={`menu ${appClassName}`}>
        <p className="title">{barData.name.toUpperCase()}</p>
        <div className="lineList2">
          <ItemLineListOrder
            lines={barData.lines}
            imageDirectory={imageDirectory}
            addOrder={handleAddOrder}
            subtractOrder={handleSubtractOrder}
            useTwoColumns={1}
            nbrItemOrdered={nbrItemOrdered}
          />
        </div>
      </div>
    );
  }

  // 2 column + panier
  return (
    <div className={`menu ${appClassName}`}>
      <p className="title">{barData.name.toUpperCase()}</p>

      <div className="lineList2">
        <div className="lineList2">
          <Panier
            lines={barData.lines}
            imageDirectory={imageDirectory}
            addOrder={handleAddOrder}
            subtractOrder={handleSubtractOrder}
            handlePopulateLastOrder={populateLastOrder}
            sendMail={sendMail}
            barType={barData.type}
          />
        </div>
        <ItemLineListOrder
          lines={barData.lines}
          imageDirectory={imageDirectory}
          addOrder={handleAddOrder}
          subtractOrder={handleSubtractOrder}
          useTwoColumns={1}
          nbrItemOrdered={nbrItemOrdered}
        />
      </div>
    </div>
  );
}
