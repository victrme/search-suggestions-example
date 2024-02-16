<script>
	const { ...attr } = $props();
</script>

<input
	{...attr}
	disabled={attr.disabled}
	class={`w-full outline-none focus:border-red-400 px-3 py-2 bg-white rounded-md border-2 border-gray-500 ${attr.class ?? ''}`}
/>
