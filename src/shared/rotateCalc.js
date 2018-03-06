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

export default RotateCalc