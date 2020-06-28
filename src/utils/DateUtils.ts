const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatMonthYear = (date: Date) => {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export { formatMonthYear };
