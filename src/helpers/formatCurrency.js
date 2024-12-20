export const formatCurrency = (number) => {
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
  });
};

export const formatReviewDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
