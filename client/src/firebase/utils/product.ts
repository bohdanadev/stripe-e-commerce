import { db } from '../firebase';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { IProduct } from '../../interfaces/product.interface';
import SHOP_DATA from '../../data';

export const addProductsToFirestore = async () => {
  const products = SHOP_DATA;

  try {
    for (const product of products) {
      await setDoc(doc(db, 'products', product.id.toString()), product);
    }
    console.log('All products added successfully.');
  } catch (error) {
    console.error('Error adding products to Firestore: ', error);
  }
};

export const getProductsList = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...(doc.data() as Partial<IProduct>) } as IProduct)
  );
};
