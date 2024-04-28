import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        email: column.text({ unique: true }),
        username: column.text(),
        password: column.text(),
    },
    indexes: [
        { on: ["id", "email"], unique: true }
    ]
});

const Article = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        author: column.number({ references: () => User.columns.id }),
        title: column.text(),
        date: column.date(),
        description: column.text(),
        text: column.text(),
    },
    indexes: [
        { on: ["id", "author"], unique: true }
    ]
});

const Theme = defineTable({
    columns: {
        theme: column.text({ primaryKey: true }),
    }
});

const ArticleThemes = defineTable({
    columns: {
        articleId: column.number({ references: () => Article.columns.id }),
        theme: column.text({ references: () => Theme.columns.theme }),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: {
        User,
        Article,
        ArticleThemes,
        Theme,
    }
});