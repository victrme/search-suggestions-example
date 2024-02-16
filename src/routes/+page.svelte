<script>
	import Search from '../islands/Search.svelte';
	import Header from '../islands/Header.svelte';
	import Ads from '../islands/Ads.svelte';
	import '../app.css';
</script>

<!-- <head>
	<meta charSet="UTF-8" />
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />
	<title>Search Suggestions API | Example page</title>
	<meta
		name="description"
		content="You guys get free suggestions from multiple search engine providers ?"
	/>
</head> -->

<div class="flex p-4 md:p-8 md:py-16 gap-20 mx-auto max-w-screen-xl">
	<div class="px-5 max-w-screen-sm mx-auto">
		<Header />
		<Search />
	</div>

	<Ads />
</div>
