import { Head } from "$fresh/runtime.ts";
import Search from "../islands/Search.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <title>Search Suggestions API | Example page</title>
        <meta
          name="description"
          content="You guys get free suggestions from multiple search engine providers ?"
        />
      </Head>

      <div class="container columns-3 h-screen pb-16 flex">
        <div class="mx-auto max-w-lg w-full px-5">
          <header class="w-full my-8 sm:my-16 text-left">
            <div class="flex my-2">
              <a
                class="flex align-center p-2 gap-2 text-gray-600 text-sm hover:underline"
                href="https://github.com/victrme/search-suggestions"
              >
                <img src="/github.svg" width="16" height="16" alt="" />
                api used
              </a>

              <a
                class="flex align-center p-2 gap-2 text-gray-600 text-sm hover:underline"
                href="https://github.com/victrme/search-suggest-example"
              >
                <img src="/github.svg" width="16" height="16" alt="" />
                this page
              </a>
            </div>

            <h1 class="text-2xl sm:text-3xl font-black leading-7 text-red-400 bg-red-50 rounded">
              Wow, free suggestions from multiple search engines !?
            </h1>
          </header>

          <Search />
        </div>
      </div>
    </>
  );
}
