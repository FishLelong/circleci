<script>
    import { _ } from "svelte-i18n";

    import { locale, locales } from 'svelte-i18n'
    // console.log(locale, $locales, 'aa')
</script>
<div>
    <select bind:value={$locale}>
        {#each $locales as locale}
            <option value={locale}>{locale}</option>
        {/each}
    </select>
</div>