export const getNewDate = (date: any) => {
  var cleanDate = new Date(date.replace(/\./g, '/'));
  return (
    (cleanDate.getMonth() + 1).toString() +
    '/' +
    cleanDate.getDate().toString() +
    '/' +
    cleanDate.getFullYear().toString()
  );
};
