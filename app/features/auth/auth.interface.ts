export interface SignupProps {
    email: string;
    password: string;
    fullName: string;
}

export interface UserProps {
    role: string;
    fullName: string;
    email: string;
    id: string;
}
export interface SelfReq {
    user: UserProps;
    token: {
        token: string;
        expires: string;
    };
    message: string;
}

export interface GetUserProps {
    message: string;
    data: UserProps[];
}