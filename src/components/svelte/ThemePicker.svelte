<script lang="ts">
    import type { ITheme } from "../../../db/models/DAOTheme.ts";
    import { LANGUAGES } from "../../constants";
    import Icon from "@iconify/svelte";

    export let themes: ITheme[];
    export let initialThemes: string[];

    let selection = [...initialThemes];

    function getLanguageInfo(res: ITheme) {
        return LANGUAGES[res.theme as keyof typeof LANGUAGES];
    }

    function toggleTheme(theme: string) {
        if (selection.includes(theme)) {
            selection = selection.filter(t => t !== theme);
        } else {
            selection = [...selection, theme];
        }
    }
</script>

<input type="hidden" name="themes" value="{selection.join(',')}" />

<div class="flex flex-wrap">
    {#each themes as res (res.theme)}
        {@const language = getLanguageInfo(res)}
        <button type="button" on:click={() => toggleTheme(res.theme)} class="{language.bg_color}" class:selected={selection.includes(res.theme)}>
            {#if language.logo.startsWith("mdi:")}
                <Icon icon={language.logo} />
            {:else}
                <img src="/icons/{res.theme}.svg" alt="Icon of {res.theme}" width="16" />
            {/if}
            <span class="ml-2">{res.theme}</span>
        </button>
    {/each}
</div>

<style lang="scss">
    button {
        @apply flex items-center py-2 px-3 mb-2 mr-2 rounded-sm;
        @apply opacity-40;

        &.selected,
        &:hover {
            @apply opacity-100;
        }
    }
</style>