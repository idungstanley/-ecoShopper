import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatProps, MessagesInChatProps } from './chat.interface';

interface InitialState {
    backtoChatList: boolean;
    selectedChatId: string | null;
    chats: ChatProps[];
    messagesInChat: MessagesInChatProps[] | null;
}

const initialState: InitialState = {
    backtoChatList: false,
    selectedChatId: null,
    chats: [],
    messagesInChat: []
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
        },
        getChats: (state, action: PayloadAction<ChatProps[]>)=>{
            state.chats = action.payload;
        },
        getMessagesInChat: (state, action: PayloadAction<MessagesInChatProps[] | null>)=>{
            state.messagesInChat = action.payload;
        }
    }
});

export const { setBacktoChatList, getMessagesInChat, setSelectedChatId, getChats } = chatSlice.actions;
export default chatSlice.reducer;
