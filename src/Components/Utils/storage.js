import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveCurrentWord = async (wordObj) => {
  try {
    await AsyncStorage.setItem("currentWord", JSON.stringify(wordObj));
  } catch (e) {
    console.log("Error saving current word:", e);
  }
};

export const loadCurrentWord = async () => {
  try {
    const word = await AsyncStorage.getItem("currentWord");
    return word ? JSON.parse(word) : null;
  } catch (e) {
    console.log("Error loading current word:", e);
    return null;
  }
};

export const setArray = async (key, array) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(array ?? []));
  } catch (e) {
    console.log(`Error saving array for key ${key}:`, e);
  }
};

export const getArray = async (key) => {
  try {
    const array = await AsyncStorage.getItem(key);
    return array ? JSON.parse(array) : [];
  } catch (e) {
    console.log(`Error getting array for key ${key}:`, e);
    return [];
  }
};

export const saveCount = async (word, count) => {
  try {
    const counts = JSON.parse(await AsyncStorage.getItem("wordCounts")) || {};
    counts[word] = count;
    await AsyncStorage.setItem("wordCounts", JSON.stringify(counts));
  } catch (e) {
    console.log("Error saving count:", e);
  }
};

export const getCount = async (word) => {
  try {
    const counts = JSON.parse(await AsyncStorage.getItem("wordCounts")) || {};
    return counts[word] || 0;
  } catch (e) {
    console.log("Error getting count:", e);
    return 0;
  }
};