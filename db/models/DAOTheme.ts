import { db, Theme } from "astro:db";

export interface ITheme {
    theme: string;
}

export class DAOTheme {
    public static async findAll(): Promise<ITheme[]> {
        return db
            .select()
            .from(Theme);
    }
}