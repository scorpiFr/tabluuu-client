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
          />
          <Footer />
        </div>
      </center>
    );
  }
  // other cases
  return <OtherCaseError />;
}
