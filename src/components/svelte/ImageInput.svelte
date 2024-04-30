<script lang="ts">
    let input: HTMLInputElement;
    let pictureUrl: string | undefined = undefined;

    const allowedMimeTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];

    function handleInput() {
        const file = input?.files?.[0];
        if (file && file.size > 0 && allowedMimeTypes.includes(file.type)) {
            pictureUrl = URL.createObjectURL(file);
        }
    }
</script>

<label for="input-image">Image de présentation</label>
<input
    bind:this={input}
    id="input-image"
    name="picture"
    type="file"
    class="sr-only"
    accept={allowedMimeTypes.join(", ")}
    on:change={handleInput}
    required
/>
<button
    type="button"
    class="bg-gray-950 hover:bg-black py-2 px-4 text-white flex items-center space-x-2 mt-2"
    on:click={() => input.click()}
>
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24">
        <path fill="currentColor" d="m14 12l-4-4v3H2v2h8v3m10 2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3h2V6h12v12H6v-3H4v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
    </svg>
    <span>Charger une image</span>
</button>

{#if pictureUrl !== undefined}
    <img src={pictureUrl} alt="Description de l'article de blog" class="mt-4" />
{/if}