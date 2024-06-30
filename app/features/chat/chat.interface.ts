import { UserProps } from "../auth/auth.interface";

export interface ChatProps {
    _id: string;
    name: string;
    members: {
        fullName: string;
        id: string
    }[]
    createdBy: string
    createdAt: string
}
export interface MessagesInChatProps {
    _id: string;
    content: string;
    sender: string;
    chat: string;
    createdAt: string
}

export interface GetChatProps {
    message: string;
    data: ChatProps[];
}
export interface GetMessagesInChatProps {
    message: string;
    data: MessagesInChatProps[];
}