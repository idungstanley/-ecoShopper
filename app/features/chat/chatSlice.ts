import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    backtoChatList: boolean;
    selectedChatId: string | null;
}

const initialState: InitialState = {
    backtoChatList: false,
    selectedChatId: null
};

export const chatSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setBacktoChatList: (state, action: PayloadAction<boolean>) => {
            state.backtoChatList = action.payload;
        },
        setSelectedChatId: (state, action: PayloadAction<string | null>) => {
            state.selectedChatId = action.payload;
        }
    }
});

export const { setBacktoChatList, setSelectedChatId } = chatSlice.actions;
export default chatSlice.reducer;
