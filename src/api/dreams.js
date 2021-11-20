/* eslint-disable object-curly-newline */
import { collection, addDoc, getDocs, getDoc, doc } from 'firebase/firestore';
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
        snapshot.forEach((document) => {
          const { id } = document;
          const { name, email, country, categories, text, type } = document.data();
          arr.push({ id, name, email, country, categories, text, type });
        });
        return arr;
      });
  },
  getById(docId) {
    if (!docId) throw new Error('ID не указан');
    const ref = doc(dreamsCollection, docId);
    return getDoc(ref).then((document) => {
      const { id } = document;
      const { name, email, country, categories, text, type } = document.data();
      return { id, name, email, country, categories, text, type };
    });
  },
};

export default dreams;
