import * as admin from 'firebase-admin';
import { envFirebase } from './config/config';

admin.initializeApp({
  projectId: envFirebase.project_id,
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };
