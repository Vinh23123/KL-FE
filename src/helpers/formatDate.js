export const formatDate = (date) => {
  const dateObj = new Date(date);
  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
};
