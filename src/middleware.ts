import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
    const loggedIn = context.cookies.has("userid");
    const pathname = context.url.pathname;

    if (loggedIn && pathname === "/login") {
        return context.redirect("/");
    }
    if (pathname === "/logout") {
        if (loggedIn) {
            context.cookies.delete("userid");
        }
        return context.redirect("/");
    }

    return next();
});