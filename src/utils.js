const precision = 100;

export function convert(val) {
  return Math.round(val * precision);
}

export function toSeconds(val) {
  if (val === 0) {
    return 0;
  }

  return val / precision;
}

export function format(val) {
  return toSeconds(val).toFixed(2);
}
