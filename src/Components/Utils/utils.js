export const getRandomWord = (array) =>  {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};