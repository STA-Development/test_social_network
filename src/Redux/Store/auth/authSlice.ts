import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/typeSection';

interface AuthUser {
  auth: User | null;
  token: string;
}

const initialState: AuthUser = {
  auth: {
    uId: '',
    name: '',
    email: '',
    picture: undefined,
  },
  token: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userAuth: (state, { payload }: PayloadAction<User>) => {
      return {
        ...state,
        auth: payload,
      };
    },
    userLogOut: (state) => {
      return {
        ...state,
        auth: null,
        token: '',
      };
    },
    userToken: (state, { payload }: PayloadAction<string>) => {
      return {
        ...state,
        token: payload,
      };
    },
  },
});

export const { userAuth, userLogOut, userToken } = authSlice.actions;

export default authSlice.reducer;
