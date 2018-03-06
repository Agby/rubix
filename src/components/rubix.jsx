// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import CubeBox from './cubeBox.jsx'
import RotateCalc from '../shared/rotateCalc'

type Props = {}
type State = {}

const cubeWidth = 100
const TIME_FRAME = 300
const originIndexMap = [
  0,  1,  2,     9, 10, 11,    18, 19, 20,
  3,  4,  5,    12, 13, 14,    21, 22, 23,
  6,  7,  8,    15, 16, 17,    24, 25, 26,
]
const filterRule = {
  x: (index, level) => Math.floor(index / 9) === level,
  y: (index, level) => Math.floor((index % 9) / 3) === 2 - level,
  z: (index, level) => index % 3 === 2 - level,
};

export default class Rubix extends React.Component<Props, State> {
  constructor(props: Object) {
    super(props)
    this.state = {
      rubixIndexMap: originIndexMap,
      rotateMap: new Array(27)
        .fill()
        .map((val, index) => ({ x: 0, y: 0, z: 0 })),
      posX: 0,
      posY: 0,
      onDrag: false,
      camRotate: { x: 2, y: 2, z: 0 },
      showMovementSelect: false,
      lastDirection: { x: 4, y: 4, z: 0 },
      autoRotate: true,
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
    if (autoRotate) {
      camRotate.x += lastDirection.x % 5
      camRotate.y += lastDirection.y % 5
      camRotate.z += lastDirection.z % 5
      this.setState({ camRotate })
    }
  }

  handleRubixRotate(e, index: number, key: string) {
    e = e || window.event
    const counterRotate = (e.which === 3 || e.button === 2) ? true : false
    const rubixIndex = this.state.rubixIndexMap.indexOf(index)
    if ([1, 9, 10, 11, 19, 3, 4, 12, 13, 14, 21, 22, 23, 7, 15, 16, 17, 25].indexOf(rubixIndex) > -1) {
      this.rotateRubix('x', 0, counterRotate)
    } else {
      this.rotateRubix('y', 0, counterRotate)
    }
    e.preventDefault()
    this.setState({
      showMovementSelect: true
    })
  }

  rotateRubix(rotateType: string, level: number, counter: boolean) {
    /* 
                   cubeData

              Z0          Z1          Z2 

           X0 X1 X2    X0 X1 X2    X0 X1 X2
     
       Y2   0  1  2     9 10 11    18 19 20
       Y1   3  4  5    12 13 14    21 22 23
       Y0   6  7  8    15 16 17    24 25 26

    */
    const newIndexMap = [...this.state.rubixIndexMap]
    const newRotateMap = [...this.state.rotateMap]
    let selectedLevel = []
    originIndexMap.forEach((value, index) => {
      if (filterRule[rotateType](value, level)) selectedLevel.push({index: index, value: this.state.rubixIndexMap[index]})
    })
    selectedLevel = RotateCalc.convertArrayTo3d(selectedLevel, rotateType)
    const rotatedLevel = counter
      ? RotateCalc.counterClockWiseRotate(selectedLevel)
      : RotateCalc.clockWiseRotate(selectedLevel)
    selectedLevel.forEach((target, index) => {
      const originCubeDegree = this.state.rotateMap[target.value][rotateType]
      newIndexMap[target.index] = rotatedLevel[index].value 
      newRotateMap[target.value][rotateType] = counter
        ? originCubeDegree - 90
        : originCubeDegree + 90
    })
    this.setState({
      rubixIndexMap: newIndexMap,
      rotateMap: newRotateMap,
    })
  }

  handleCamRotate(e) {
    const { onDrag, posX, posY, camRotate } = this.state
    const scale = 5
    const rad = Math.PI / 5
    const offsetX = e.clientY - posY
    const offsetY =
      Math.abs(camRotate.x % 360) < 90 || Math.abs(camRotate.x % 360) > 270
        ? e.clientX - posX
        : -e.clientX + posX
    const offsetZ = offsetX / Math.cos(rad) +  offsetY / Math.sin(rad)
    // origin rotate + offset
    const newCamRotate = {
      x: this.checkDegree(camRotate.x + offsetX / scale),
      y: this.checkDegree(camRotate.y + offsetY / scale),
      z: this.checkDegree(camRotate.z + offsetZ / scale),
    }
    this.setState({
      camRotate: newCamRotate,
      posX: e.clientX,
      posY: e.clientY,
      lastDirection: {
        x: Math.abs(offsetX) > scale ? offsetX / 1.2 : offsetX,
        y: Math.abs(offsetY) > scale ? offsetY / 1.2 : offsetY,
        z: Math.abs(offsetZ) > scale ? offsetZ / 1.2 : offsetZ,
      },
      // autoRotate: false,
    })
  }

  render() {
    const { showAsixs, rotateMap } = this.state
    return (
      <div
        className="rubix"
        onMouseDown={e =>
          this.setState({ posX: e.clientX, posY: e.clientY, onDrag: true})
        }
        onMouseUp={() => this.setState({autoRotate: true, onDrag: false })}
        onMouseLeave={() => this.setState({ autoRotate: true, onDrag: false })}
        onMouseMove={e => {if (this.state.onDrag) this.handleCamRotate(e)}}
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
          className="button toggle-asixs"
          onClick={() => this.setState({ showAsixs: !showAsixs })}
        />
      </div>
    )
  }
}
