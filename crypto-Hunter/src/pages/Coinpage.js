import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { SingleCoin } from "../Config";
import CoinInfo from "../components/CoinInfo";
import { Parser } from "html-to-react";
import { buyShare } from "../Serverapi/api";

export default function Coinpage() {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [cost, setcost] = useState("");
 const [alert,setalert]=useState('');
  const {funds,setfunds,logged,useremail, currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    try {
      const response = await fetch(SingleCoin(id));
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const data = await response.json();
      setCoin(data);
    } catch (error) {
      console.error(error);
    }
  };

  async function handlebuy(e) {
    
    e.preventDefault();
   
  if(cost>funds)
  {
    setalert('Insufficient funds')
    return;
  }
    const data = {
      email:useremail,
      name: coin.name,
      price: cost,
      quantity:cost/coin.market_data.current_price["inr"],
      boughtAt: coin.market_data.current_price["inr"],
    };
   
 if(logged)
 {
    try{
      
     const response =await buyShare(data);
     console.log("this is :" +response);
     if(response)
     {setfunds(funds-cost);
      setalert("Successfully bought share ")
  
      console.log("successfully bought share");}
     //console.log(response);
    }
    catch(err)
    { console.log("erre aagya")
      console.log(err.response);
      setalert("Connection error try again ")
    }
  }
  else{
    setalert("Please login to buy share!")
  }
    setcost("");
    setTimeout(() => {
      setalert("");
    }, 2000);

  }

  useEffect(() => {
    fetchCoin();
  }, [currency]);
  const htmlParser = new Parser();
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return <div>loading.........</div>;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "30%",

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
          borderRight: "2px solid grey",
        }}
      >
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <div
          style={{
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
          }}
        >
          {coin?.name}
        </div>

        <div
          style={{
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
          }}
        >
          {htmlParser.parse(coin?.description.en.split(".")[0])}.
        </div>
        <div></div>
        <span
          style={{
            display: "flex",
            fontFamily: "Montserrat",

            paddingLeft: "0px",
          }}
        >
          <h5>RANK : {coin?.market_cap_rank}</h5>
        </span>
        <span
          style={{
            display: "flex",
            fontFamily: "Montserrat",
            paddingLeft: "0px",
          }}
        >
          <h5>
            CURRENT PRICE : {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.current_price[currency.toLowerCase()]
            )}
          </h5>
        </span>
        <span
          style={{
            display: "flex",
            fontFamily: "Montserrat",
          }}
        >
          <h5>
            MARKET CAP : {symbol}{" "}
            {numberWithCommas(
              coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
            )}
            M{" "}
          </h5>
        </span>
        <form onSubmit={handlebuy}>
          <input
            type="text"
            value={cost}
            onChange={(e) => setcost(e.target.value)}
            placeholder="Enter amount in RS"
          />
          <button
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "bold",

              color: "#fff",
              backgroundColor: "green",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              marginLeft: "20px",
              marginTop: "10px",
            }}
            type="Submit"
          >
            Buy
          </button>
        </form>
        <div style={{
          textAlign:'left',
          color:logged?'green':'red',
        }}>{alert}</div>
      </div>

      <div
        style={{
          width: "70%",
        }}
      >
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
}
