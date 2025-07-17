import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
    loadAuth(state) {
      const data = JSON.parse(localStorage.getItem('auth'));
      if (data) {
        state.isAuthenticated = data.isAuthenticated;
        state.user = data.user;
      }
    },
  },
});

export const { login, logout, loadAuth } = authSlice.actions;
export default authSlice.reducer;
