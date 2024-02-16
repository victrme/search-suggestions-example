<script>
	import ResultItem from '../components/ResultItem.svelte';
	import Providers from '../components/Providers.svelte';
	import Langs from '../components/Langs.svelte';
	import Input from '../components/Input.svelte';

	/**
	 * @typedef {Object} Suggestion
	 * @property {string} text - The text of the suggestion.
	 * @property {string} [desc] - The description of the suggestion (optional).
	 * @property {string} [image] - The URL of the image associated with the suggestion (optional).
	 */

	/**
	 * @typedef {Array<Suggestion>} Suggestions
	 * An array of suggestion objects.
	 */

	/**
	 * @typedef {Object} APIProps
	 * @property {string} lang - The language for the query.
	 * @property {string} query - The query string.
	 * @property {string} provider - The provider for the query.
	 */

	/**
	 * @typedef {[Suggestions, number]} APIReturn
	 * A Promise that resolves to an array containing Suggestions and a number.
	 */

	let list = $state([]);
	let provider = $state('google');
	let selected = $state(-1);
	let latency = $state(-1);
	let query = $state('');
	let lang = $state('en');

	$inspect(provider);
	$inspect(lang);

	$effect(() => {
		if (provider && lang) {
			localStorage.setItem('lastchoice', JSON.stringify({ provider, lang }));
		}
	});

	$effect(() => {
		if (localStorage.lastchoice) {
			const lastchoice = JSON.parse(localStorage.lastchoice);
			provider = lastchoice.provider ?? 'google';
			lang = lastchoice.lang ?? 'en';
		}
	});

	async function handleList(q) {
		const [json, ms] = await callAPI({ query: q, provider, lang });
		list = json;
		latency = ms;
		selected = -1;
	}

	function handleInput(value) {
		query = value;
		handleList(value);
	}

	function handleProvider(event) {
		provider = event.target.value;
	}

	function handleLang(event) {
		lang = event.target.value;
	}

	/**
	 * Calls the API with the provided parameters.
	 * @param {APIProps} params - The parameters for the API call.
	 * @returns {Promise<APIReturn>} A Promise that resolves to the API return value.
	 */
	async function callAPI({ lang, query, provider }) {
		const base = 'https://suggestions.victr.me/';
		const url = base + `?q=${query}&l=${lang}&with=${provider}`;
		const perfstart = performance.now();

		const resp = await fetch(url);

		if (resp.status === 404) {
			return [[], -1];
		}

		const json = await resp.json();
		const ms = Math.round(performance.now() - perfstart);

		return [json, ms];
	}

	/**
	 *
	 * @param {KeyboardEvent} event
	 */
	function handleResultsKeys(event) {
		const isArrowDown = event.code === 'ArrowDown';
		const isArrowUp = event.code === 'ArrowUp';
		const isEnter = event.code === 'Enter';
		const isReturn = event.code === 'Escape';

		if (isArrowDown || isArrowUp) {
			const count = selected + (isArrowDown ? 1 : -1);
			selected = Math.max(-1, count % list.length);
			event.preventDefault();
		}

		if (isEnter) {
			handleInput(list[selected].text);
			event.preventDefault();
		}

		if (isReturn) {
			selected = -1;
			list = [];
		}
	}
</script>

<!-- on:keydown={handleResultsKeys} -->

<form role="search" onsubmit={(e) => e.preventDefault()}>
	<div class="flex flex-col gap-2 sm:flex-row-reverse">
		<div class="flex w-full gap-2">
			<Providers
				onchange={handleProvider}
				class="bg-transparent border(gray-500 2) w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
			/>

			<Langs
				onchange={handleLang}
				class="bg-transparent border(gray-500 2) w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
			/>
		</div>

		<Input
			value={query}
			type="search"
			role="combobox"
			name="searchbar"
			autoComplete="off"
			aria-controls="search-results"
			placeholder="Search something"
			class="w-full rounded-md outline-none focus:border-red-400"
			oninput={(event) => handleInput(event.target.value)}
		/>
	</div>

	{#if list.length > 0}
		<ul
			tabIndex={0}
			role="listbox"
			id="search-results"
			aria-label="search-results"
			class="my-4 p-1 w-full border-2 rounded-md outline-none"
		>
			{#each list as item, index}
				<ResultItem
					{item}
					{query}
					{index}
					{selected}
					onclick={() => handleInput(item.text)}
					onmouseenter={() => (selected = index)}
				/>

				<p class="w-full text-center leading-3 text-gray-400 mb-4">
					<small>{latency}ms</small>
				</p>
			{/each}
		</ul>
	{/if}
</form>
