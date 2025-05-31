import { useState, useEffect } from "react";
import "./App.css";

/*
const apiReturn = {
  name: "bartest",
  isAvailable: 1,
  menutype: "image",
  images: ["http://localhost:3000/menu1.jpg"],
};
*/

let config = {
  urlPrefix: "http://localhost:3000/",
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
      const res = await fetch(config.urlPrefix + "api.txt");
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
        <img src={barData.data.images} alt={`Menu of ${barData.data.name}`} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
