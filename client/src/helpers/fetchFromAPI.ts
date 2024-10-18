import { apiConfig } from '../config/config';
import { auth } from '../firebase/firebase';

const API = apiConfig.apiUrl;

export const fetchFromAPI = async (endpoint: string, options?: any) => {
  const { method, body } = { method: 'POST', body: null, ...options };
  const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
};
