import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    const isProtected = context.url.pathname.startsWith('/dashboard');

    if (isProtected) {
        const sessionToken = context.cookies.get('better-auth.session_token');

        if (!sessionToken || !sessionToken.value) {
            return context.redirect('/sign-in');
        }
    }

    return next();
});
