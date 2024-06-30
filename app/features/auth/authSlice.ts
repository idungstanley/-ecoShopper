import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelfReq, UserProps } from './auth.interface';

interface InitialState {
    self: SelfReq | null;
    signupAccountType: null | string;
    users: UserProps[];
}

const initialState: InitialState = {
    self: null,
    signupAccountType: null,
    users: []
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getSelf: (state, action: PayloadAction<SelfReq | null>) => {
            state.self = action.payload;
        },
        getAllUser: (state, action: PayloadAction<UserProps[]>) => {
            state.users = action.payload;
        },
        setSignupAccountType: (state, action: PayloadAction<string | null>) => {
            state.signupAccountType = action.payload;
        }
    }
});

export const { getSelf, setSignupAccountType, getAllUser } = authSlice.actions;
export default authSlice.reducer;
