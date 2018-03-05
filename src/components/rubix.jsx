// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import CubeBox from './cubeBox.jsx'
import RotateCalc from '../shared/rotateCalc'

type Props = {}
type State = {}

const cubeWidth = 100
const TIME_FRAME = 300

const filterRule = {
  x: (index, level) => Math.floor(index / 9) === level,
  y: (index, level) => Math.floor((index % 9) / 3) >= 2 - level,
  z: (index, level) => index % 3 === 2 - level,
}

export default class Rubix extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {
      rubixIndnexMap: new Array(27).fill().map((val, index) => index),
      rotateMap: new Array(27)
        .fill()
        .map((val, index) => ({ x: 0, y: 0, z: 0 })),
      posX: 0,
      posY: 0,
      autoRotate: true,
      camRotate: { x: 0, y: 0, z: 0 },
      showMovementSelect: false,
      lastDirection: { x: 2, y: 4, z: 0 },
    }
  }

  componentWillMount() {
    this.defaultRotateAnime = setInterval(() => {
      this.rotateAnime()
    }, TIME_FRAME)
  }

  componentWillUnmount() {
    clearInterval(this.defaultRotateAnime)
  }

  checkDegree(deg: number) {
    // deg 90 270 will cause CSS bug
    return deg === 90 || deg === 270 ? (deg += 1) : deg
  }

  rotateAnime() {
    const { camRotate, autoRotate, lastDirection } = this.state
    // if (autoRotate) {
    if (false) {
      camRotate.x += lastDirection.x % 4
      camRotate.y += lastDirection.y % 4
      camRotate.z += lastDirection.z % 4
      this.setState({ camRotate })
    }
  }

  handleRubixRotate(e, key) {
    this.rotateRubix('y', 0, true)
    e.stopPropagation()
    this.setState({
      showMovementSelect: true,
      autoRotate: false,
      onDrag: false,
    })
  }

  rotateRubix(rotateType: string, level: number, counter: boolean) {
    /* 
                   cubeData

              X0          X1          X2 

           Z2 Z1 Z0    Z2 Z1 Z0    Z2 Z1 Z20
     
       Y2   0  1  2     9 10 11    18 19 20
       Y1   3  4  5    12 13 14    21 22 23
       Y0   6  7  8    15 16 17    24 25 26

    */
    const newIndexMap = [...this.state.rubixIndnexMap]
    const newRotateMap = { ...this.state.rotateMap }
    const selectedLevel = this.state.rubixIndnexMap.filter(index =>
      filterRule[rotateType](index, level),
    )
    const rotatedLevel = counter
      ? RotateCalc.counterClockWiseRotate(selectedLevel)
      : RotateCalc.clockWiseRotate(selectedLevel)
    selectedLevel.forEach((originIndex, index) => {
      const originCubeDegree = this.state.rotateMap[originIndex][rotateType]
      newIndexMap[originIndex] = rotatedLevel[index]
      newRotateMap[originIndex][rotateType] = counter
        ? originCubeDegree + 90
        : originCubeDegree - 90
    })
    this.setState({
      rubixIndnexMap: newIndexMap,
      rotateMap: newRotateMap,
    })
  }

  handleCamRotate(e) {
    const { onDrag, posX, posY, camRotate } = this.state
    if (
      ['rubix', 'cube-box', 'cube-contain'].indexOf(e.target.className) > -1 ||
      onDrag
    ) {
      const { posX, posY, camRotate } = this.state
      const scale = 4.5
      const rad = Math.PI / 5
      const offsetX = e.clientY - posY
      const offsetY =
        Math.abs(camRotate.x % 360) < 90 || Math.abs(camRotate.x % 360) > 270
          ? e.clientX - posX
          : -e.clientX + posX
      const offsetZ = offsetX / Math.cos(rad)
      // origin rotate + offset
      const newCamRotate = {
        x: this.checkDegree(camRotate.x - offsetX / scale),
        y: this.checkDegree(camRotate.y + offsetY / scale),
        z: this.checkDegree(camRotate.z - offsetZ / scale),
      }
      this.setState({
        camRotate: newCamRotate,
        posX: e.clientX,
        posY: e.clientY,
        lastDirection: {
          x: -offsetX / scale,
          y: offsetY / scale,
          z: -offsetZ / scale,
        },
        onDrag: true,
      })
    }
  }

  render() {
    const { showAsixs, rotateMap } = this.state
    return (
      <div
        className="rubix"
        onMouseDown={e =>
          this.setState({ posX: e.clientX, posY: e.clientY, autoRotate: false })
        }
        onMouseUp={() => this.setState({ autoRotate: true, onDrag: false })}
        onMouseLeave={() => this.setState({ autoRotate: true })}
        onMouseMove={e => {
          if (!this.state.autoRotate) this.handleCamRotate(e)
        }}
      >
        <CubeBox
          ref={e => {
            this.camera = e
          }}
          cubeWidth={cubeWidth}
          rotateMap={rotateMap}
          handleRubixRotate={this.handleRubixRotate.bind(this)}
          camRotate={this.state.camRotate}
          showAsixs={this.state.showAsixs}
          animeTimeFrame={this.state.autoRotate ? TIME_FRAME : 100}
        />
        <button
          className="toggle-asixs"
          onClick={() => this.setState({ showAsixs: !showAsixs })}
        />
      </div>
    )
  }
}
