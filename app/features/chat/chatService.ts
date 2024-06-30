import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import requestNew from "@/app/utils/requestNew";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetChatProps, GetMessagesInChatProps } from "./chat.interface";
import { getChats, getMessagesInChat } from "./chatSlice";

export const useGetChats = () => {
    const dispatch = useAppDispatch();
    return useQuery<GetChatProps>({
        queryKey: ['get-chats'],
        queryFn: async () => {
            const data = await requestNew<GetChatProps>({
                url: '/chat',
                method: 'GET',
            });
            if (data) {
                dispatch(getChats(data.data));
            }
            console.log(data)
            return data;
        }
    });
};

export const useGetMessagesInChat = (chatId: string) => {
    const dispatch = useAppDispatch();
    return useQuery<GetMessagesInChatProps>({
        queryKey: ['get-messages', { chatId }],
        enabled: !!chatId,
        queryFn: async () => {
            const data = await requestNew<GetMessagesInChatProps>({
                url: `/chat/${chatId}/messages`,
                method: 'GET',
            });
            if (data) {
                dispatch(getMessagesInChat(data.data));
            }
            return data;
        }
    });
};

const createChat = ({ name, members }: { name: string, members: string[]; }) => {
    const response = requestNew({
        url: '/chat',
        method: 'POST',
        data: { name, members }
    });
    return response;
};

const addUserToChat = ({ chatId, userToBeAddedId }: { chatId: string, userToBeAddedId: string[]; }) => {
    const response = requestNew({
        url: '/chat',
        method: 'PATCH',
        data: { chatId, userToBeAddedId }
    });
    return response;
};

export const useCreateChat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-chats"] });
        }
    }
    );
};

export const useAddUserToChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addUserToChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-chats"] });
        }
    });
};
