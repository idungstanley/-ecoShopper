import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    selectedRole: null | string;
    signupAccountType: null | string;
}

const initialState: InitialState = {
    selectedRole: null,
    signupAccountType: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSelectedRole: (state, action: PayloadAction<string | null>) => {
            state.selectedRole = action.payload;
        },
        setSignupAccountType: (state, action: PayloadAction<string | null>) => {
            state.signupAccountType = action.payload;
        }
    }
});

export const { setSelectedRole, setSignupAccountType } = authSlice.actions;
export default authSlice.reducer;
