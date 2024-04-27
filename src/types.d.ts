import type { LANGUAGES } from "./constants.ts";

export type BlogArticle = {
    id: number;
    title: string;
    description: string;
    date: Date;
    themes: (keyof typeof LANGUAGES)[];
    text: string;
};
