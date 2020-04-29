function getWidthString(span) {
  if (!span) return
  let width = (span / 12) * 100
  return `width ${width}%`
}
export default getWidthString
