<script>
	const providers = ['google', 'bing', 'yahoo', 'qwant', 'duckduckgo', 'startpage'];
	const { ...attr } = $props();
</script>

<select name="provider" {...attr}>
	{#each providers as item}
		<option value={item}>
			{item}
		</option>
	{/each}
</select>
