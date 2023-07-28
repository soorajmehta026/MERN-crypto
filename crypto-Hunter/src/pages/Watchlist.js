import { CryptoState } from "../CryptoContext";
import "../pages/Watchlist.css";
import React, { useEffect, useState } from "react";
import { watchlistdata } from "../Serverapi/api";
import { sellshare } from "../Serverapi/api";
import { useNavigate } from "react-router-dom";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Watchlist() {
  const [profit, setprofit] = useState(0);

  const { setfunds,funds, useremail,setuseremail, coins } = CryptoState();
  const [items, setitems] = useState([]);
  const navigate = useNavigate();
  

  //console.log(useremail)
 const email=localStorage.getItem('email');
 

  async function fetchdata() {
    try{
    const { data } = await watchlistdata(email);
    setitems(data.data);

    const totalNet = data.data.reduce((acc, curr) => {
      const { net } = getCoinDetails(curr);
      return acc + net;
    }, 0);

    setprofit(totalNet);

    setfunds(100000-data.totalPrice)
    console.log(data.data);
    }
    catch(err)
    {
        console.log("got error");
    }

  }
  useEffect(() => {
    fetchdata();
  }, []);
  function getCoinDetails(item) {
    const coin = coins.find((c) => c.name === item.name);
    if (coin) {
      const net = (coin.current_price - item.boughtAt) * item.quantity;
      const percentage = ((coin.current_price - item.boughtAt) / item.boughtAt) * 100;
      

      return {
        img: coin.image, // Replace "img" with the actual property name for the coin image in the coins array
        currentPrice: coin.current_price, // Replace "currentPrice" with the actual property name for the current price in the coins array
        symbol: coin.symbol,
        id: coin.id,
        net: net,
        percentage: percentage,
      };
    }
   
    return {
      img: "", // Default image if coin not found
      currentPrice: 0, // Default current price if coin not found
      symbol: "",
      id: 0,
      net: 0,
      percentage: 0,
    };
  }
 async function sell(data)
  {
     try{
        await sellshare({name:data.name,email:useremail});
        setfunds(funds+data.price);
        setitems((prevItems) => prevItems.filter((item) => item.name !== data.name));
        setprofit(profit-data.net);
        
        console.log("successfully sold");
     }
     catch(err)
     {
        console.log(err);
     }
  }
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            margin: "15px 15px",
            fontWeight: "bold",
          }}
        >
          <div>Funds left : ₹ {numberWithCommas(funds.toFixed(2))}</div>
          <div>Invested : ₹ {numberWithCommas((100000-funds).toFixed(2))} </div>
          <div>Net gains : ₹ {numberWithCommas(profit.toFixed(2))}</div>
        </div>

        <div className="container">
          {
            <table className="table table-borderless table-dark">
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
                  <th> Coin</th>
                  <th>Net Qty</th>
                  <th>Avg Price</th>
                  <th>Current Price</th>
                  <th>Profit/loss</th>
                  <th>Sell</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const { img, currentPrice, symbol, id, net, percentage } =
                    getCoinDetails(item);

                  return (
                    <tr
                      key={item.name}
                      style={{
                        backgroundColor: "black",
                        " :hover": {
                          backgroundColor: "green",
                        },
                        borderBottom: "1px solid grey",
                      }}
                    >
                      <td
                        onClick={() => navigate(`/coins/${id}`)}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={img}
                          alt={item.name}
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
                            {symbol}
                          </span>
                          <span
                            style={{
                              color: "darkgoldenrod",
                            }}
                          >
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          color: "white",
                        }}
                      >
                        {numberWithCommas(item.quantity.toFixed(2))}
                      </td>

                      <td
                        style={{
                          color: "white",
                        }}
                      >
                        ₹ {numberWithCommas(item.boughtAt.toFixed(2))}
                      </td>
                      <td>₹ {numberWithCommas(currentPrice.toFixed(2))}</td>
                      <td
                        style={{
                          color: net >= 0 ? "green" : "red",
                        }}
                      >
                        ₹ {numberWithCommas(net.toFixed(2))} (
                        {numberWithCommas(percentage.toFixed(2))})%
                      </td>
                      <td>
                        <div>
                          <button onClick={()=>{
                            sell({name:item.name,
                                   price:currentPrice*item.quantity,
                                  net:net});
                          }}
                            style={{
                              backgroundColor: "red",
                              borderRadius: "2px",
                              color: "white", 
                              padding: "10px 20px", 
                              border: "none", 
                              fontSize: "16px", 
                              fontWeight: "bold", 
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", 
                              cursor: "pointer",
                              textTransform: "uppercase", 
                              outline: "none", 
                            }}
                          >
                            Sell
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
}

export default Watchlist;
