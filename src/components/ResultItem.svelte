<script>
	const { index, selected, query, text, image, desc, attr } = $props();
	const ariaSelected = $derived(selected === index ? 'true' : 'false');
	const bgSelected = $derived(selected === index ? ' bg-blue-50' : '');
</script>

<li
	{...attr}
	role="option"
	aria-atomic="true"
	aria-label={text}
	aria-selected={ariaSelected}
	class={`flex items-center gap-3 p-2 m-1 rounded leading-4 outline-none cursor-pointer ${bgSelected}`}
>
	<img class="object-contain" src={image ?? 'search.svg'} width="24" height="24" alt="" />

	<div>
		<p>
			{#each text.split(query) as val, i}
				{#if i > 0}<b>{query}</b>{/if}<span>{val}</span>
			{/each}
		</p>
		{#if desc}
			<p class="text-sm text-gray-500">
				<small>{desc}</small>
			</p>
		{/if}
	</div>
</li>
