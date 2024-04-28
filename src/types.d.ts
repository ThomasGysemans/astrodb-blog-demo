declare global {
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

