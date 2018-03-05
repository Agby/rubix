import React from 'react'

const sideArray = ['front', 'back', 'right', 'left', 'top', 'bottom']
const Asixs = props => (
  <div className={`asix -${props.asixKey}`} style={props.style}>
    {sideArray.map(key => <figure key={props.index + key} className={key} />)}
  </div>
)

export default Asixs
