import React from 'react'
import './SelectButton.css'
export default function SelectButton({children,selected,onClick}) {
  return (
    <span className='select-button' onClick={onClick} style={{
      backgroundColor:selected? 'gold':"",
      color:selected?'black':"",
      fontweight:selected?"black":"",
    }}  >{children}</span>
  )
}
