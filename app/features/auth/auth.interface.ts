export interface SignupProps {
    email: string;
    password: string;
    fullName: string;
}

export interface SelfReq {
    user: {
        role: string;
        fullName: string;
        email: string;
        id: string;
    };
    token: {
        token: string;
        expires: string;
    };
    message: string;
}