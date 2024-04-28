import { db, User, Article, Theme, ArticleThemes } from 'astro:db';

const THEMES: { theme: string }[] = [
    { theme: "svelte" },
    { theme: "tailwind" }
];

async function seedUsers() {
    await db.insert(User).values([
        { id: 1, username: "Thomas", email: "gysemansthomas@gmail.com", password: "azerty" }
    ]);
}

async function seedBlogArticles() {
    await db.insert(Article).values([
        {
            id: 1,
            author: 1,
            date: new Date(),
            text: "This is a very interesting blog post",
            title: "An interesting blog post",
            description: "Very interesting indeed",
        }
    ]);
}

async function seedThemes() {
    await db.insert(Theme).values(THEMES);
}

async function seedBlogArticleThemes() {
    await db.insert(ArticleThemes).values([
        {
            articleId: 1,
            theme: THEMES[0]!.theme,
        },
        {
            articleId: 1,
            theme: THEMES[1]!.theme,
        },
    ])
}

// https://astro.build/db/seed
export default async function seed() {
    await seedUsers();
    await seedThemes();
    await seedBlogArticles();
    await seedBlogArticleThemes();
}