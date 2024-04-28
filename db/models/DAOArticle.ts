import { db, eq, Article, User, ArticleThemes } from "astro:db";

interface IArticle {
    id: number;
    author: number;
    title: string;
    date: Date;
    description: string;
    text: string;
}

type ArticlePresentation = Omit<Omit<IArticle, "text">, "author"> & {
    authorName: string;
    themes: string[];
};

export class DAOArticle {
    /**
     * Lists the article presentations (on the main blog page).
     */
    public static async findPresentations(): Promise<ArticlePresentation[]> {
        const articles = await db
            .select({
                id: Article.id,
                authorName: User.username,
                title: Article.title,
                date: Article.date,
                description: Article.description,
                themes: ArticleThemes.theme, // which is actually just one string
            })
            .from(Article)
            .innerJoin(User, eq(Article.author, User.id))
            .innerJoin(ArticleThemes, eq(ArticleThemes.articleId, Article.id))
            .execute();
        // Aggregate the individual "themes" properties into an array for each article.
        const map: Map<number, ArticlePresentation> = new Map();
        for (const article of articles) {
            if (map.has(article.id)) {
                map.get(article.id)!.themes.push(article.themes);
            } else {
                map.set(article.id, {
                    ...article,
                    themes: [article.themes],
                });
            }
        }
        return Array.from(map.values());
    }
}