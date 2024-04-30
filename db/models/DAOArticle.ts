import { db, eq, Article, User, ArticleThemes, desc } from "astro:db";

interface IArticle {
    id: number;
    author: number;
    title: string;
    date: Date;
    description: string;
    text: string;
    picture: string;
}

type ArticleInput = {
    title: string;
    description: string;
    themes: string[];
    content: string;
    picture: string;
};

type ArticlePresentation = Omit<IArticle, "text" | "picture" | "author"> & {
    authorName: string;
    themes: string[];
};

type ArticleFull = Omit<IArticle, "author"> & {
    author: string;
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
        return this.aggregateThemes(articles);
    }

    // Aggregate the individual "themes" properties into an array for each article.
    private static aggregateThemes<T extends { id: number; themes: string }>(articles: T[]): (Omit<T, "themes"> & { themes: string[] })[] {
        const map: Map<number, (Omit<T, "themes"> & { themes: string[] })> = new Map();
        for (const article of articles) {
            if (map.has(article.id)) {
                map.get(article.id)!.themes.push(article.themes);
            } else {
                map.set(article.id, {
                    ...article,
                    themes: [article.themes],
                } as any);
            }
        }
        return Array.from(map.values());
    }

    public static async findById(id: number): Promise<ArticleFull|undefined> {
        const res = await db
            .select({
                id: Article.id,
                author: User.username,
                title: Article.title,
                date: Article.date,
                description: Article.description,
                themes: ArticleThemes.theme,
                text: Article.text,
                picture: Article.picture,
            })
            .from(Article)
            .innerJoin(User, eq(Article.author, User.id))
            .innerJoin(ArticleThemes, eq(ArticleThemes.articleId, Article.id))
            .where(eq(Article.id, id))
            .execute();
        if (res.length === 0) {
            return;
        } else {
            return (this.aggregateThemes(res) as any as ArticleFull[])[0];
        }
    }

    public static async getLastArticleId(): Promise<number> {
        return (await db
            .select({ id: Article.id })
            .from(Article)
            .orderBy(desc(Article.id))
            .limit(1))[0]!.id;
    }

    public static async saveArticle(input: ArticleInput, authorId: number): Promise<void> {
        const newArticleId = await this.getLastArticleId() + 1;
        await db.batch([
            db.insert(Article).values([
                {
                    title: input.title,
                    description: input.description,
                    date: new Date(),
                    author: authorId,
                    text: input.content,
                    picture: input.picture,
                }
            ]),
            ...input.themes.map(theme => (
                db.insert(ArticleThemes).values([
                    {
                        articleId: newArticleId,
                        theme: theme,
                    }
                ])
            )),
        ]);
    }
}