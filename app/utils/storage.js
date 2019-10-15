import AsyncStorage from '@react-native-community/async-storage';

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return { ok: true, data: JSON.parse(value) };
    }
  } catch {
    return { ok: false, data: 'local storage failure' };
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key
 */
export async function remove(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

export async function getAllKeys() {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    console.log('AsyncStorage Error', e);
  }

  console.log(keys);
  // example console.log result:
  // ['@MyApp_user', '@MyApp_key']
}

/**
 * Clear storage
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}
