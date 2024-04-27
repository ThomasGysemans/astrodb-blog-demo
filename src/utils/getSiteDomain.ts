import { isProduction } from "./getEnvironmentMode.ts";

/**
 * Gets the URL origin depending on the environment mode.
 */
export default function(Astro: AstroLike): string {
    if (isProduction()) {
        return Astro.site.origin;
    } else {
        return Astro.url.origin;
    }
}