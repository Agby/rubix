const RotateCalc = {}

RotateCalc.clockWiseRotate = ([
	// from
	 a, d, g,
	 b, e, h,
	 c, f, i,
])  => ([
  // to
   c, b, a,
	 f, e, d,
	 i, h, g,
])

RotateCalc.counterClockWiseRotate = ([
	// from
	 a, d, g,
	 b, e, h,
	 c, f, i,
])  => ([
  // to
   g, h, i,
	 d, e, f,
	 a, b, c,
])

RotateCalc.convertArrayTo3d = ([a, b, c, d, e, f, g, h, i], rotateType) => {
	if (rotateType === 'x') {
		return [
			a, b, c,
			d, e, f,
			g, h, i,
		]
	} else if (rotateType === 'y') {
		return [
		  a, d, g,
		  b, e, h,
		  c, f, i,
		]
	} else {
		return [
			a, b, c,
			d, e, f,
			g, h, i,
		]
	}
}

export default RotateCalc