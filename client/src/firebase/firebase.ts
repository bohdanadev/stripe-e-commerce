import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentReference,
} from 'firebase/firestore';
import { getAuth, User } from 'firebase/auth';
import { firebaseEnv } from '../config/config';

const firebaseConfig = {
  apiKey: firebaseEnv.apiKey,
  authDomain: firebaseEnv.authDomain,
  projectId: firebaseEnv.projectId,
  storageBucket: firebaseEnv.storageBucket,
  messagingSenderId: firebaseEnv.messagingSenderId,
  appId: firebaseEnv.appId,
};

const app = initializeApp(firebaseConfig, 'client');
const db = getFirestore(app);
const auth = getAuth(app);

interface AdditionalData {
  [key: string]: any;
}

const createUserProfileDocument = async (
  userAuth: User | null,
  additionalData?: AdditionalData
) => {
  if (!userAuth) return;

  const userRef: DocumentReference = doc(db, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any) {
      console.log('Error creating user', error.message);
      throw new Error('Error creating user');
    }
  }

  return userRef;
};

export { db, createUserProfileDocument, auth };
