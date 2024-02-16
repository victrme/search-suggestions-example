<script>
	import ResultItem from '../components/ResultItem.svelte';
	import Providers from '../components/Providers.svelte';
	import Langs from '../components/Langs.svelte';
	import Input from '../components/Input.svelte';

	let list = $state([]);
	let provider = $state('google');
	let selected = $state(-1);
	let latency = $state(-1);
	let query = $state('');
	let lang = $state('en');

	// $inspect(provider);
	// $inspect(lang);
	// $inspect(list);

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

	function handleInput(value) {
		query = value;
		callAPI({ query, provider, lang });
	}

	function handleProvider(event) {
		provider = event.target.value;
	}

	function handleLang(event) {
		lang = event.target.value;
	}

	async function callAPI({ lang, query, provider }) {
		const base = 'https://api.suggestions.victr.me/';
		const url = base + `?q=${query}&l=${lang}&with=${provider}`;
		const perfstart = performance.now();

		const resp = await fetch(url);

		if (resp.status === 404) {
			return [[], -1];
		}

		const json = await resp.json();
		const ms = Math.round(performance.now() - perfstart);

		list = json;
		latency = ms;
		selected = -1;
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

<svelte:document onkeydown={handleResultsKeys} />

<form role="search" onsubmit={(e) => e.preventDefault()}>
	<div class="flex flex-col gap-2 sm:flex-row-reverse">
		<div class="flex w-full gap-2">
			<Providers
				onchange={handleProvider}
				class="bg-transparent border-2 border-gray-500 w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
			/>

			<Langs
				onchange={handleLang}
				class="bg-transparent border-2 border-gray-500 w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
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
					{query}
					{index}
					{selected}
					text={item.text}
					desc={item.desc}
					image={item.image}
					onclick={() => handleInput(item.text)}
					onmouseenter={() => (selected = index)}
				/>
			{/each}
			<p class="w-full text-center leading-3 text-gray-400 mb-4">
				<small>{latency}ms</small>
			</p>
		</ul>
	{/if}
</form>
