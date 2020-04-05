import moment from "moment";

export function toLowerCaseAndRemoveSpaces(string) {
  return String(string)
    .toLowerCase()
    .replace(/ /g, "-");
}

export function groupBy(xs, key, processValue = key => key) {
  return xs.reduce(function(rv, x) {
    (rv[processValue(x[key])] = rv[processValue(x[key])] || []).push(x);
    return rv;
  }, {});
}

export function getTime(value) {
  return moment(value).format("H:00");
}
