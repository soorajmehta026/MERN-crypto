import React, { useState, useEffect } from "react";
import { CoinList } from "../Config";
import { CryptoState } from "../CryptoContext";
import { useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {
  
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { coins,currency, symbol } = CryptoState();

  

  

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ margin: 18, fontFamily: "Montserrat" }}>
          Cryptocurrency Prices by Market Cap
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for Cryptocurrency. . . ."
            style={{
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "8px",
              marginBottom: "15px",
              color: "white",
              width: "30%",
              backgroundColor: "black",
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        {
          <table
            className="table table-borderless table-dark"

            // alignItems: 'center',
          >
            <thead
              style={{
                background: "#FFA7A6",
              }}
            >
              <tr
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontFamily: "Montserrat",
                }}
              >
                <th>Coin</th>
                <th>Price</th>
                <th>24h change</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {handleSearch().map((row) => {
                return (
                  <tr
                    onClick={() => navigate(`/coins/${row.id}`)}
                    key={row.name}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "black",
                      " :hover": {
                        backgroundColor: "green",
                      },
                    }}
                  >
                    <td
                      style={{
                        display: "flex",
                        gap: 15,
                      }}
                    >
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{ marginBottom: 10 }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 22,
                          }}
                        >
                          {row.symbol}
                        </span>
                        <span
                          style={{
                            color: "darkgoldenrod",
                          }}
                        >
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        color: "white",
                      }}
                    >
                      {symbol} {numberWithCommas(row.current_price.toFixed(2))}
                    </td>

                    <td
                      style={{
                        color:
                          row.price_change_percentage_24h >= 0
                            ? "green"
                            : "red",
                      }}
                    >
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td>
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      </div>

      <div
        style={{
          textAlign: "centre",
          justifyContent: "center",
        }}
      >
        Designed by Suraj
      </div>
    </>
  );
}
