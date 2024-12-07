'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../constants/routes';

export async function SignIn(
    formData: { email: string; password: string; },
    redirectLink = DEFAULT_LOGIN_REDIRECT as string
) {
    const { email, password } = formData;
    await signIn('credentials', {
        email,
        password,
        redirectTo: redirectLink
    });
}
