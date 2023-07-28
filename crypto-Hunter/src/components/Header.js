import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import Userlogged from '../user/Userlogged';
export default function Header() {
  const navigate = useNavigate();
  const { alert,setalert,currency , setCurrency } =CryptoState();

  return (
    <nav className="navbar" style={{ backgroundColor:'black' ,outline: '2px solid black' }}>
      <div
        className="navbar__title"
        style={{
          color: '#FFA7A6',
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          cursor: 'pointer',
          
        }}
        onClick={() => navigate("/crypto-hunter")}
      >
        CryptoKeeper
    

      </div>
      <div style={{color:'green'}}>
        {alert}
      </div>
      
      <div className="navbar__select"
      style={{
        display:'flex',
        flexDirection:'row',
      }}
      >
      <Userlogged/>


        <select  style={{
            backgroundColor: 'WHITE',
            color: 'BLACK',
            border: '10px white',
            borderRadius: '4px',
            padding: '6px',
          }}  value={currency} onChange={(e)=> setCurrency(e.target.value)}>
           
          <option value={"INR"}>INR</option>
          <option value={"USD"}>USD</option>
        </select>
      </div>
    </nav>
  );
}
