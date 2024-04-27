import {and, db, eq, User} from "astro:db";

interface IUser {
    id: number;
    email: string;
    username: string;
    password: string;
}

type UserWithoutPassword = Omit<IUser, "password">;

/**
 * Finds a user that would match the given email and password.
 * Since the email is unique, it will only return a single element,
 * or undefined if it's not found.
 * @param input The form data.
 */
export async function findUser(input: { email: string, password: string }): Promise<UserWithoutPassword | undefined> {
    const result = (await db
        .select({
            id: User.id,
            email: User.email,
            username: User.username,
        })
        .from(User)
        .where(and(
            eq(User.email, input.email),
            eq(User.password, input.password)
        )).execute()) as UserWithoutPassword[];
    if (result.length > 0) {
        return result[0];
    } else {
        return undefined;
    }
}