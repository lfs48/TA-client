import { authApi } from '@/api/auth.api';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';

interface SessionState {
    authenticated: boolean;
    id?: string;
}

const initialState: SessionState = {
    authenticated: !!localStorage.jwt && !!localStorage.userID,
    id: localStorage.userID || undefined,
};

// Session slice of state where data related to currently logged in user lives
const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    logout: state => {
        state.authenticated = false;
        state.id = "";
        localStorage.removeItem('userID');
        localStorage.removeItem('jwt');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
            authApi.endpoints.login.matchFulfilled,
            authApi.endpoints.register.matchFulfilled,
        ),
        (state, action) => {
            const {jwt, user} = action.payload;
            state.authenticated = true;
            state.id = user.id;
            localStorage.setItem('userID', user.id);
            localStorage.setItem('jwt', jwt);
        }
      )
  }
});

export const {
    logout
} = sessionSlice.actions;

export default sessionSlice.reducer;