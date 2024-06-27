import requestNew from "@/app/utils/requestNew";
import { SelfReq, SignupProps } from "./auth.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/app/redux/store";
import { getSelf } from "./authSlice";

const createUser = (data: SignupProps) => {
    const response = requestNew({
        url: '/auth/register',
        method: 'POST',
        data: data
    });
    return response;
};

export const useCreateUser = () => {
    return useMutation({
        mutationFn: createUser
    });
};

export const useGetSelf = () => {
    const dispatch = useAppDispatch();
    return useQuery<SelfReq>({
        queryKey: [''],
        queryFn: async () => {
            const data = await requestNew<SelfReq>({
                url: '/auth/self',
                method: 'GET',
            });
            if (data) {
                dispatch(getSelf(data));
            }
            return data;
        }
    });
};