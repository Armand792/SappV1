import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IUserLogin, IUserState } from '@/interfaces/store.interface';

const initialState: IUserState = {
  auth: {
    token: '',
    user_id: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveLoginData: (state, action: PayloadAction<IUserLogin>): void => {
      state.auth = {
        ...state.auth,
        token: action.payload.token,
        user_id: action.payload.user_id,
      };
    },
  },
});

export const { saveLoginData } = userSlice.actions;

export default userSlice.reducer;
