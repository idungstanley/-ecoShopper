
export type ErrorResponse = {
    data: {
        error: string;
    };
    status: number;
    statusText: string;
};

export interface ISuccessRequest {
    message: string;
}

export type SignupValidationProps = {
    email: string;
    password: string;
    fullName: string;
    confirmPassword: string;
};
export type SigninValidationProps = {
    email: string;
    password: string;
};

export interface InputDataTypes {
    label?: string;
    required?: boolean;
    placeholder?: string;
    hint?: string;
    name: string;
    cornerHint?: string;
    type?: string;
    autoComplete?: string;
    value?: string | number;
    leadingIcon?: string | JSX.Element;
    trailingIcon?: string | JSX.Element;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
    trailingClick?: () => void;
    bgColor?: string;
    borderRadius?: string;
    height?: string;
    isBorder?: boolean;
    classes?: string;
    styles?: {
        color: string;
        fontSize?: string;
        fontWeight?: string;
        lineHeight?: string;
    };
    labelClasses?: string;
    width?: string;
    valueAsNumber?: boolean;
    isError?: boolean;
    errorMessage?: string;
    handleSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectValue?: string;
}