export const fractionate = (val: number, minVal: number, maxVal: number) => {
  return (val - minVal) / (maxVal - minVal)
}

export const modulate = (
  val: number,
  minVal: number,
  maxVal: number,
  outMin: number,
  outMax: number
) => {
  var fr = fractionate(val, minVal, maxVal)
  var delta = outMax - outMin
  return outMin + fr * delta
}

export const avg = (arr: number[]) => {
  var total = arr.reduce((sum: number, b: number) => {
    return sum + b
  })
  return total / arr.length
}

export const max = (arr: number[]) => {
  return arr.reduce(function(a, b) {
    return Math.max(a, b)
  })
}
