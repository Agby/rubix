import React from 'react'

const Cube = props => (
  <div className="cube" style={props.style}>
    <figure className="front" />
    <figure className="back" />
    <figure className="right" />
    <figure className="left" />
    <figure className="top" />
    <figure className="bottom" />
  </div>
)

export default Cube
