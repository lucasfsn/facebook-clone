export const getMonths = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months;
};

export const getYears = () =>
  Array.from(new Array(119), (_, i) => new Date().getFullYear() - i);

export const getDays = (year: number, month: number) => {
  return Array.from(
    new Array(new Date(year, month, 0).getDate()),
    (_, i) => i + 1,
  );
};
