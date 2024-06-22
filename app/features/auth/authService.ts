import requestNew from "@/app/utils/requestNew";
import { SignupProps } from "./auth.interface";
import { useMutation } from "@tanstack/react-query";

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