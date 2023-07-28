import React from 'react'
import Carousel from './Carousel'
import '../Banners/banner.css'

export default function Banner() {
  return (
    <div className='rower' style={{
      
      height:400,
      display:"flex",
      flexDirection:"column",
      paddingTop:25,
      justifyContent:"space-around"
    }}>
      
      <div style={{
        display:'flex',
        height:'40%',
        flexDirection:"column",

      }}>
      <div className="d-flex justify-content-center" style={{
         fontSize:50,
         color:"gold",
         fontFamily: 'Montserrat',
         fontWeight: 'bold',
         
       
      }}>
        CryptoKeeper
        
      </div>
      <div className="d-flex justify-content-center" style={{
         fontSize:10,
         color:'darkgray',
         fontFamily: 'Montserrat',
         fontWeight: 'bold',
         
        
      }}>
        Get all the Info regarding your favourite Crypto Currency
      </div>
      </div>
      <Carousel/>
       </div>
  )
}
