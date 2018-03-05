// @flow

import React from 'react'
import Cube from './cube.jsx'
import Asix from './asixs.jsx'

type Props = {}
type State = {}

export default class CubeBox extends React.PureComponent<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {}
  }

  renderAsixs() {
    return [
      <Asix key="x" asixKey="x" />,
      <Asix key="y" asixKey="y" />,
      <Asix key="z" asixKey="z" />,
    ]
  }
  render() {
    const offsetArray = [-this.props.cubeWidth, 0, this.props.cubeWidth]
    return (
      <div
        className="cube-box"
        style={{
          transform: `rotateX(${this.props.camRotate.x}deg)
           rotateY(${this.props.camRotate.y}deg)
           rotateZ(${this.props.camRotate.z}deg)
          `,
          transition: `transform ${this.props.animeTimeFrame / 500}s linear`,
        }}
      >
        <div className="cube-contain">
          {offsetArray.map((x, indexX) =>
            offsetArray.map((y, indexY) =>
              offsetArray.map((z, indexZ) => {
                const cubeIndex = indexX * 9 + indexY * 3 + indexZ

                return (
                  <Cube
                    index={cubeIndex}
                    key={cubeIndex}
                    style={{
                      transform: `translate3d(${offsetArray[indexX]}px, ${
                        offsetArray[indexY]
                      }px, ${offsetArray[indexZ]}px)
                         rotateX(${this.props.rotateMap[cubeIndex].x}deg)
                         rotateY(${this.props.rotateMap[cubeIndex].y}deg)
                         rotateZ(${this.props.rotateMap[cubeIndex].z}deg)
                        `,
                      'transform-origin': `
                        ${50 - offsetArray[indexX]}%
                        ${50 + offsetArray[indexY]}%
                        ${-offsetArray[indexZ]}px`,
                    }}
                    handleRubixRotate={this.props.handleRubixRotate}
                  />
                )
              }),
            ),
          )}
        </div>
        {this.props.showAsixs ? this.renderAsixs() : null}
      </div>
    )
  }
}
