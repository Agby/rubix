import React from 'react'

const sideArray = ['front', 'back', 'right', 'left', 'top', 'bottom']
const Cube = props => (
  <div className="cube" style={props.style}>
    {sideArray.map(key => (
      <figure
        key={props.index + key}
        className={key}
        onClick={e => props.handleRubixRotate(e, props.index, key)}
      />
    ))}
  </div>
)

export default Cube

/*

        onContextMenu={e => {
          props.handleRubixRotate(e, props.index, key) 
          e.preventDefault()}
        }
        */