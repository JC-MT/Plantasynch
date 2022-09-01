const readyToBeWatered = (lastWater) => {
  const lastDay = new Date(lastWater);
  const today = new Date();

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = today.getTime() - lastDay.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

module.exports = {
  readyToBeWatered
};