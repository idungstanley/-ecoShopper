'use server';

import { signOut } from '@/auth';

const redirectLink = '/auth/login';
export async function SignOut() {
    await signOut({ redirectTo: redirectLink });
}
