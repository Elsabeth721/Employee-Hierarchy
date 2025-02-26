// src/services/positionService.ts
import { db } from '../../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// ✅ Fetch positions
export const fetchPositionsFromApi = async () => {
  const querySnapshot = await getDocs(collection(db, 'positions'));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Add a position
export const addPositionToApi = async (position: any) => {
  const docRef = await addDoc(collection(db, 'positions'), position);
  return { id: docRef.id, ...position };
};

// ✅ Update a position
export const updatePositionInApi = async (id: string, position: any) => {
  const positionRef = doc(db, 'positions', id);
  await updateDoc(positionRef, position);
  return { id, ...position };
};

// ✅ Delete a position
export const deletePositionFromApi = async (id: string) => {
  const positionRef = doc(db, 'positions', id);
  await deleteDoc(positionRef);
  return id;
};
