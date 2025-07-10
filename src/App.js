import { useState, useEffect } from "react";
import "./App.css";
import config from "./config.js";
import sendMail_brevo from "./Components/sendMail_brevo.js";
import Footer from "./Footer";
import Loader from "./Components/Loader.js";
import InternetError from "./Components/InternetError.js";
import ClosedBar from "./Components/ClosedBar.js";
import Oneimage from "./Components/Oneimage.js";
import Multipleimages from "./Components/Multipleimages.js";
import Menu from "./Components/Menu.js";
import Commande from "./Components/Commande.js";
import OtherCaseError from "./Components/OtherCaseError.js";

export default function App() {
  const [barData, setBarData] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  function resetBarData() {
    setBarData({
      data: [],
      isLoading: false,
      error: false,
    });
  }
  function sendMail(commentary, lines) {
    // commentary
    const commentaryContent =
      commentary.length <= 0
        ? ""
        : "<div style='color: red;'>" +
          commentary.replace(/\n/g, "<br />") +
          "</div><br />";

    // price + orderContent
    let price = 0;
    let orderContent = "";
    for (let cptL in lines) {
      for (let cptI in lines[cptL].items) {
        if (lines[cptL].items[cptI].qty <= 0) {
          continue;
        }
        orderContent +=
          lines[cptL].items[cptI].qty <= 1
            ? ""
            : lines[cptL].items[cptI].qty + " - ";
        orderContent += lines[cptL].items[cptI].name + "<br />";
        price +=
          lines[cptL].items[cptI].qty *
          parseFloat(lines[cptL].items[cptI].price);
      }
    }

    // table name
    const tableName = config.table.length > 0 ? config.table : "Tabluuu";

    // html content
    const htmlContent =
      "<html><head></head><body>" +
      tableName +
      "<br />" +
      commentaryContent +
      price +
      " €<br /><br />" +
      orderContent +
      "</body></html>";

    // email
    const email =
      barData.data.email_service.length > 0
        ? barData.data.email_service
        : barData.data.email;

    // sending mail
    sendMail_brevo(config.barId, tableName, price, htmlContent, email);
  }

  async function fetchBarData() {
    try {
      // call api
      resetBarData();
      setBarData((m) => ({ ...m, isLoading: true }));
      // const res = await fetch(config.urlPrefix + config.barId + "/api.txt");
      const res = await fetch(
        config.tabluuu_server + "/etablissementfrontdata/" + config.barId
      );
      // internet error
      if (!res.ok) {
        console.log("fetching bar data error");
        throw new Error("Something went wrong with fetching data");
      }
      const data = await res.json();
      // no data found
      if (!data.name) {
        setBarData((m) => ({ ...m, error: true }));
      } else {
        // data found
        const data2 = cleanBarData(data);
        setBarData((m) => ({ ...m, data: data2, error: false }));
        document.title = data.name;
        document.body.className = data.type === "bar" ? "bar" : "resto";
      }
    } catch (err) {
      console.log(err.message);
      setBarData((m) => ({ ...m, error: true }));
    } finally {
      setBarData((m) => ({ ...m, isLoading: false }));
    }
  }

  function cleanBarData(data) {
    data.isAvailable = parseInt(data.isAvailable);
    if (!data.lines || !data.lines.length) {
      return data;
    }
    for (let i in data.lines) {
      if (!data.lines[i].items || !data.lines[i].items.length) {
        continue;
      }
      for (let j in data.lines[i].items) {
        data.lines[i].items[j].price = parseFloat(data.lines[i].items[j].price);
        data.lines[i].items[j].qty = 0;
      }
    }
    return data;
  }

  useEffect(
    function () {
      fetchBarData();
      return function () {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // loading status
  if (barData.isLoading) {
    return <Loader />;
  }

  // fetch error / no data
  if (barData.error || !barData.data) {
    return <InternetError />;
  }

  // bar not available
  if (!barData.data.isAvailable) {
    return <ClosedBar />;
  }

  // 1 image
  if (
    barData.data.menutype === "image" &&
    Array.isArray(barData.data.images) &&
    barData.data.images.length === 1
  ) {
    return (
      <>
        <Oneimage
          barData={barData.data}
          imageDirectory={config.imageDirectory}
        />
        <Footer />
      </>
    );
  }

  // multiple images
  if (
    barData.data.menutype === "image" &&
    Array.isArray(barData.data.images) &&
    barData.data.images.length > 1
  ) {
    return (
      <>
        <Multipleimages
          barData={barData.data}
          imageDirectory={config.imageDirectory}
        />
        <Footer />
      </>
    );
  }

  // menu
  if (barData.data.menutype === "menu") {
    return (
      <center>
        <div className="menu">
          <Menu barData={barData.data} imageDirectory={config.imageDirectory} />
          <Footer />
        </div>
      </center>
    );
  }

  // commande
  if (barData.data.menutype === "commande") {
    return (
      <center>
        <div className="menu">
          <Commande
            barData={barData.data}
            imageDirectory={config.imageDirectory}
            setBarData={setBarData}
            sendMail={sendMail}
          />
          <Footer />
        </div>
      </center>
    );
  }
  // other cases
  return <OtherCaseError />;
}
