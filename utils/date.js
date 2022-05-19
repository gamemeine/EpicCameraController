// date to YYYY-MM-DD format
export const convertDate = (date) =>
  new Date(date).toLocaleDateString().split(".").reverse().join("-");
