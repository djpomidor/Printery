import React from 'react'
import { useState } from 'react'

const Color_switch = (props) => {
  const [color, setColor] = useState() 
  
  return (
    <div className={color}>
        <button onClick={()=>setColor("bg-danger")}>red</button>
        <button onClick={()=>setColor("bg-warning")}>yelloy</button>
        <button onClick={()=>setColor("bg-success")}>green</button>
        color_switch</div>
  )
}

export default Color_switch