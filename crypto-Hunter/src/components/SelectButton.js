import React from 'react'

export default function SelectButton({children,selected,onClick}) {
  return (
    <span onClick={onClick} style={{
        border:"1px solid gold",
        borderRadius:5,
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        fontFamily:'Montserrat',
        cursor:'pointer',
        backgroundColor:selected? 'gold':"",
        color:selected?'black':"",
        fontweight:selected?"black":"",
        width:"22%",

    }}  >{children}</span>
  )
}
