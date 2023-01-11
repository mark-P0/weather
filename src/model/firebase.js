/**
 * https://firebase.google.com/docs/web/setup#add-sdks-initialize
 * (Also in the project's settings itself)
 *
 * https://firebase.google.com/docs/database/web/start#add_the_js_sdk_and_initialize
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCKeBiEMQvzV0BAbOUJ0Zf1RAK41Mb_YyM',
  authDomain: 'weather-56468.firebaseapp.com',
  databaseURL:
    'https://weather-56468-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'weather-56468',
  storageBucket: 'weather-56468.appspot.com',
  messagingSenderId: '73577039305',
  appId: '1:73577039305:web:116142918af08ad70b9418',
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * https://firebase.google.com/docs/database/web/read-and-write#read_data_once
 * @type {(key: string) => Promise<string | null>}
 */
export async function read(key) {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, key));
    if (snapshot.exists()) return snapshot.val();
  } catch (error) {
    console.error(error);
  }
  return null;
}

/**
 * https://firebase.google.com/docs/database/web/read-and-write#web_value_events
 * @type {(key: string, callback: (data: any | null) => void) => void}
 */
export async function listen(key, callback) {
  const dbRef = ref(database, key);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.exists() ? snapshot.val() : null;
    callback(data);
  });
}
