import React, {  createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import { CoinList } from './Config';
const Crypto= createContext()
export default function CryptoContext({children}) {
 const [currency, setCurrency] = useState("INR");
 const [symbol,setSymbol] = useState("₹");
 const [username, setusername] = useState('');
 const [useremail,setuseremail]=useState('');
 const [logged,setlogged]= useState(0);
 const [alert,setalert]=useState('');
 const [coins, setCoins] = useState([]);
 const [funds,setfunds]=useState(100000);


 useEffect(()=>{
    if(currency=== "INR" ) setSymbol("₹");
    else if(currency === "USD" ) setSymbol("$");
 },[currency])

 const fetchCoins = async () => {
   
   try {
     const response = await fetch(CoinList(currency));
     if (!response.ok) {
       throw new Error("Network response was not OK");
     }
     const data = await response.json();
     setCoins(data);
   } catch (error) {
     console.error(error);
   }
   
 };
 useEffect(() => {
   fetchCoins();
 }, [currency]);

    return (
   <Crypto.Provider value={{funds,setfunds,coins,alert,setalert,useremail,setuseremail,currency,symbol,setCurrency,username,setusername,logged,setlogged}}>
    {children}
   </Crypto.Provider>
  )
}

export function CryptoState()
{
   return useContext(Crypto);

}