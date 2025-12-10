export const getRandomWord = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const deactivateWord = (data, wordId) => {
  const wordIndex = data.findIndex((word) => word.id === wordId);
  data[wordIndex].active = false;
};
