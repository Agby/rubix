const RotateCalc = {}

RotateCalc.clockWiseRotate = ([
  // from
  a,
  d,
  g,
  b,
  e,
  h,
  c,
  f,
  i,
]) => [
  // to
  b,
  a,
  d,
  c,
  e,
  g,
  f,
  i,
  h,
]

RotateCalc.counterClockWiseRotate = ([
  // from
  a,
  d,
  g,
  b,
  e,
  h,
  c,
  f,
  i,
]) => [
  // to
  d,
  g,
  h,
  a,
  e,
  i,
  b,
  c,
  f,
]

export default RotateCalc
