import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';
import { IAuth } from '../../interfaces/user.interface';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, createUserProfileDocument } from '../../firebase/firebase';
import { onSnapshot } from 'firebase/firestore';

type AuthUser = {
  uid: string;
  userEmail: string | null;
  displayName: string | null;
};

interface IState {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
}

const initialState: IState = {
  user: null,
  loading: true,
  error: false,
};

const login = createAsyncThunk<AuthUser, IAuth>(
  'authSlice/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email!,
        password!
      );
      const { uid, email: userEmail, displayName } = userCredential.user;

      return { uid, userEmail, displayName };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const register = createAsyncThunk<void, IAuth>(
  'authSlice/register',
  async ({ email, firstname, password }, { rejectWithValue }) => {
    try {
      createUserWithEmailAndPassword(auth, email!, password!).then(
        (userCredential) => {
          const user = userCredential.user;
          createUserProfileDocument(user, { displayName: firstname });
        }
      );
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, thunkAPI) => {
    return new Promise<void>((resolve) => {
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);
          if (!userRef) return resolve();

          onSnapshot(userRef, (snapShot) => {
            thunkAPI.dispatch(
              actions.setUser({
                id: snapShot.id,
                ...snapShot.data(),
              })
            );
            thunkAPI.dispatch(actions.setLoading(false));
            resolve();
          });
        } else {
          thunkAPI.dispatch(actions.setUser(null));
          thunkAPI.dispatch(actions.setLoading(false));
          resolve();
        }
      });

      return () => unsubscribeFromAuth();
    });
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state) => {
        state.loading = false;
      })
      .addMatcher(isRejected(login, register), (state) => {
        state.error = true;
      })
      .addMatcher(isFulfilled(login, register), (state) => {
        state.error = false;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  login,
  register,
  checkAuthState,
};

export { authReducer, authActions };
