import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBhm56FslxivR4YA_4_iLUTJubyor9oWmQ',
  authDomain: 'dream-for-earth.firebaseapp.com',
  projectId: 'dream-for-earth',
  storageBucket: 'dream-for-earth.appspot.com',
  messagingSenderId: '714126607170',
  appId: '1:714126607170:web:951ff513a6a732d9537edb',
  measurementId: 'G-F2ZRK49Y14',
};

initializeApp(firebaseConfig);
export const firestore = getFirestore();
