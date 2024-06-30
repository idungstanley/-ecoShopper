/**
 * An array of routes that are accessible to the public
 *
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/'];

/**
 * An array of routes that are used for authentication.
 *
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/signup'];

/**
 * The prefix for api authentication routes
 *
 * Routes that starts with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
