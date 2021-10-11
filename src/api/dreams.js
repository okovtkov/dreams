/* eslint-disable object-curly-newline */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from './firestore';

const dreamsCollection = collection(firestore, 'dreams');
const dreams = {
  create(dream) {
    return addDoc(dreamsCollection, dream);
  },
  get() {
    return getDocs(dreamsCollection)
      .then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          const { name, email, country, categories, text } = doc.data();
          arr.push({ name, email, country, categories, text });
        });
        return arr;
      });
  },
};

export default dreams;
