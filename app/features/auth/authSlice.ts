import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelfReq } from './auth.interface';

interface InitialState {
    self: SelfReq | null
    signupAccountType: null | string;
}

const initialState: InitialState = {
    self: null,
    signupAccountType: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getSelf: (state, action: PayloadAction<SelfReq | null>) => {
            state.self = action.payload;
        },
        setSignupAccountType: (state, action: PayloadAction<string | null>) => {
            state.signupAccountType = action.payload;
        }
    }
});

export const { getSelf, setSignupAccountType } = authSlice.actions;
export default authSlice.reducer;
