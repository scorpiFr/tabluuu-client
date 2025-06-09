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
import getCurrentDateTime from "./Components/getCurrentDateTime.js";

// http://tabluuu.fr:3000?barid=1&table=Table1
// http://tabluuu.local:3000/?barid=1&table=Table1

export default function App() {
  const [barData, setBarData] = useState({
    data: [],
    isLoading: false,
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
        if (lines[cptL].items[cptI].qty > 0) {
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
    }

    // html content
    const htmlContent =
      "<html><head></head><body>" +
      config.table +
      "<br />" +
      commentaryContent +
      price +
      " €<br />" +
      orderContent +
      "</body></html>";

    // email
    const email =
      barData.data.email_service.length > 0
        ? barData.data.email_service
        : barData.data.email;
    // subject
    const subject = `${price} € - ${getCurrentDateTime()} - ${config.table}`;
    // sending mail
    sendMail_brevo(config.table, htmlContent, subject, email, "Tabluuu");
  }

  async function fetchBarData() {
    try {
      // call api
      resetBarData();
      setBarData((m) => ({ ...m, isLoading: true }));
      const res = await fetch(config.urlPrefix + config.barId + "/api.txt");
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
        setBarData((m) => ({ ...m, data: data, error: false }));
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
