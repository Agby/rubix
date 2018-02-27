// @flow

import React from 'react'
import Cube from './cube.jsx'

type Props = {}
type State = {}

export default class CubeBox extends React.PureComponent<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {}
  }

  render() {
    const offsetArray = [this.props.cubeWidth, 0, -this.props.cubeWidth]
    return (
      <div className="cube-box">
        <div className="cube-contain">
          {offsetArray.map((x, indexX) =>
            offsetArray.map((y, indexY) =>
              offsetArray.map((z, indexZ) => (
                <Cube
                  key={indexX * 9 + indexY * 3 + indexZ}
                  style={{
                    transform: `translate3d(${offsetArray[indexX]}px, ${
                      offsetArray[indexY]
                    }px, ${offsetArray[indexZ]}px)`,
                    transformOrigin: `${50 + offsetArray[indexX]}%, ${50 +
                      offsetArray[indexY]}%, ${offsetArray[indexZ]}%)`,
                  }}
                />
              )),
            ),
          )}
        </div>
      </div>
    )
  }
}
