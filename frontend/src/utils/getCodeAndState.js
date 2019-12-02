import queryString from "query-string";

export default function getCodeAndState() {
  return queryString.parse(queryString.extract(window.location.href))
}