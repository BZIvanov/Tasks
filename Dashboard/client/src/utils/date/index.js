export default () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
  const day = currentDate.getDate();
  return `${year}-${month}-${day}`;
};
