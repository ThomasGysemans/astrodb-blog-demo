import type { LANGUAGES } from "./constants.ts";

declare global {
    type BlogArticle = {
        id: number;
        title: string;
        description: string;
        date: Date;
        themes: (keyof typeof LANGUAGES)[];
        text: string;
    };

    type FormResult = {
        user?: UserResult,
        error?: FormError;
    }

    type FormError = true | string;

    type AstroLike = {
        site: { origin: string },
        url: { origin: string },
    }
}

