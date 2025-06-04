import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Loader from "./Components/Loader.js";
import InternetError from "./Components/InternetError.js";
import ClosedBar from "./Components/ClosedBar.js";
import Oneimage from "./Components/Oneimage.js";
import Multipleimages from "./Components/Multipleimages.js";
import Menu from "./Components/Menu.js";
import Commande from "./Components/Commande.js";
import OtherCaseError from "./Components/OtherCaseError.js";

// http://tabluuu.fr:3000?barid=1&table=Table1
// http://tabluuu.local:3000/?barid=1&table=Table1

let config = {
  urlPrefix: process.env.REACT_APP_API_URL_PREFIX,
  imageDirectory: process.env.REACT_APP_IMAGE_DIRECTORY,
  barId: new URLSearchParams(window.location.search).get("barid"),
  table: new URLSearchParams(window.location.search).get("table"),
};

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

  async function sendMail(commentary, lines) {
    const price = "68 €";
    const rnd = Math.floor(Math.random() * 100000000);
    let htmlContent = commentary.replace("\n", "<br/>");

    htmlContent =
      "<html><head></head><body>" +
      "<p>" +
      htmlContent +
      "</p>" +
      "</body></html>";

    const body = {
      sender: {
        name: "tabluuu",
        email: "camille.khalaghi@gmail.com",
      },
      to: [
        {
          email: "camille.khalaghi@gmail.com",
          name: "Camille",
        },
      ],
      subject: `Table_4 - ${price} - ${rnd}`,
      htmlContent: htmlContent,
    };

    const headers = {
      Accept: "application/json",
      "api-key":
        "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",
      "Content-Types": "application/json",
    };
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      body: JSON.stringify(body),
      headers: headers,
      method: "POST",
    });
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
