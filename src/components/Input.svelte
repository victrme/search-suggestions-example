<script>
	const { ...attr } = $props();
</script>

<input
	{...attr}
	disabled={attr.disabled}
	class={`px-3 py-2 bg-white rounded border-gray-500 ${attr.class ?? ''}`}
/>
