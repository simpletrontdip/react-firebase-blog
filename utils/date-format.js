const formatter = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
});

const formatDate = (date) => {
  return formatter.format(new Date(date));
};

export { formatDate };
