import { useState, useEffect } from "react";
import "./App.css";

// http://tabluuu.fr:3000?barid=1&table=Table1
// http://tabluuu.local:3000/?barid=1&table=Table1

let config = {
  urlPrefix: process.env.REACT_APP_API_URL_PREFIX,
  imageDirectory: process.env.REACT_APP_IMAGE_DIRECTORY,
  barId: new URLSearchParams(window.location.search).get("barid"),
  table: new URLSearchParams(window.location.search).get("table"),
};

function App() {
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

  return (
    <div className="App">
      <p className="title">{barData.data?.name?.toUpperCase()}</p>
      {barData.data.name ? (
        <img
          src={`${config.imageDirectory}${barData.data.images[0]}`}
          alt={`Menu of ${barData.data.name}`}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
