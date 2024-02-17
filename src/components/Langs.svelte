<script>
	const langs = {
		en: 'Auto',
		fr: 'Français',
		sk: 'Slovenský',
		sv: 'Svenska',
		pl: 'Polski',
		pt: 'Português',
		nl: 'Nederlandse',
		ru: 'Русский',
		de: 'Deutsch',
		it: 'Italiano',
		es: 'Español',
		tr: 'Türkçe',
		uk: 'Українська',
		id: 'Indonesia',
		da: 'Dansk',
		fi: 'Suomi',
		hu: 'Magyar',
		gr: 'Ελληνικά',
	}

	const { ...attr } = $props()
</script>

<select name="lang" {...attr} bind:value={attr.lang}>
	{#each Object.entries(langs) as [val, text]}
		<option value={val}>
			{text}
		</option>
	{/each}
</select>
