export function isEmpty(text) {
  return text.trim().length === 0;
}

export function isNotLongEnough(text, howLong) {
  return text.trim().length < howLong;
}

export function isTooLong(text, howLong) {
  return text.trim().length > howLong;
}
