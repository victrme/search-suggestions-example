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
          <header class="w-full my-8 sm:my-16 text-left bg-red-50 rounded">
            <h1 class="text-2xl sm:text-3xl font-black leading-7 text-red-400">
              Wow, free suggestions from multiple search engines !?
            </h1>
          </header>

          <Search />
        </div>
      </div>
    </>
  );
}
