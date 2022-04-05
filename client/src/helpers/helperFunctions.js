export const isValidSessionFormat = (session) => {
  const re = /^\d{4}-\d{2}$/;

  return re.test(session);
};
