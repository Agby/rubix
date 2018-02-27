// @flow

import React from 'react'
import CubeBox from './cube-box.jsx'

type Props = {}
type State = {}

const cubeWidth = 100

export default class Rubix extends React.PureComponent<Props, State> {
  render() {
    return (
      <div className="main">
        <CubeBox cubeWidth={cubeWidth} />
      </div>
    )
  }
}
