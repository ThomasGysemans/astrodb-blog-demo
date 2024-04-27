import type {APIRoute} from "astro";
import {db, User} from "astro:db";

export const GET: APIRoute = async () => {
    return new Response(
        JSON.stringify({
            users: await db.select().from(User)
        })
    );
}