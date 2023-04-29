import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./Components/NavbarComp";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        // eslint-disable-next-line no-lone-blocks
        {
          /*  console.log(res.data);*/
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Trading & Securuties</h1>

        <form>
          <h3>
            Search :&nbsp;
            <input
              type="text"
              placeholder="Search for cryptocurrency.."
              className="coin-input"
              onChange={handleChange}
            ></input>
          </h3>
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
          />
        );
      })}
      <NavbarComp />
      <h6 className="kartik">&copy; Kartik Gaikwad. All rights reserved.</h6>
    </div>
  );
}

export default App;
