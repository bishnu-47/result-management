export const isValidSessionFormat = (session) => {
  if (!session) return false;
  // check if it has '-'
  if (session[4] !== "-") return false;

  let str = session.split("-");
  // check session length
  if (str[0].length !== 4 && str[1].length !== 2) {
    return false;
  }
  // check if it contains numbers
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  if (isNumeric(str[0]) && isNumeric(str[1])) {
    return true;
  } else return false;
};
