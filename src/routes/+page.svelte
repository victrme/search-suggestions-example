<script>
	import Search from '../islands/Search.svelte'
	import Ads from '../islands/Ads.svelte'
	import '../app.css'
</script>

<div class="flex p-4 md:p-8 md:py-16 gap-20 mx-auto max-w-screen-xl">
	<div class="px-5 max-w-screen-sm mx-auto">
		<header class="w-full my-8 sm:my-16 sm:mt-20 text-left">
			<h1 class="text-2xl sm:text-3xl font-black leading-7 text-red-400 bg-red-50 rounded">
				Wow, free suggestions from multiple search engines !?
			</h1>

			<div class="flex my-2">
				<a
					class="flex align-center p-2 gap-2 opacity-50 text-gray-600 text-sm hover:underline hover:opacity-100"
					href="https://github.com/victrme/search-suggestions"
				>
					<img src="/github.svg" width="16" height="16" alt="" />
					<span>api used</span>
				</a>

				<a
					class="flex align-center p-2 gap-2 opacity-50 text-gray-600 text-sm hover:underline hover:opacity-100"
					href="https://github.com/victrme/search-suggest-example"
				>
					<img src="/github.svg" width="16" height="16" alt="" />
					<span>this page</span>
				</a>
			</div>
		</header>

		<Search />
	</div>

	<Ads />
</div>
