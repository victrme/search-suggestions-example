import { Head } from "$fresh/runtime.ts";
import Search from "../islands/Search.tsx";
import Ads from "../islands/Ads.tsx";

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

      <div class="flex p-4 md:p-8 md:py-16 gap-20 mx-auto max-w-screen-xl">
        <div class="px-5 max-w-screen-sm mx-auto ">
          <header class="w-full my-8 sm:my-16 sm:mt-20 text-left">
            <h1 class="text-2xl sm:text-3xl font-black leading-7 text-red-400 bg-red-50 rounded">
              Wow, free suggestions from multiple search engines !?
            </h1>

            <HeaderLinks />
          </header>

          <Search />
        </div>

        <Ads class="hidden xl:flex flex-col gap-6 max-w-sm text-sm" />
      </div>
    </>
  );
}

function HeaderLinks() {
  const links = [
    { text: "api used", href: "https://github.com/victrme/search-suggestions" },
    {
      text: "this page",
      href: "https://github.com/victrme/search-suggest-example",
    },
  ];

  return (
    <div class="flex my-2">
      {links.map((a) => (
        <a
          class="flex align-center p-2 gap-2 opacity-50 text-gray-600 text-sm hover:underline hover:opacity-100"
          href={a.href}
        >
          <img src="/github.svg" width="16" height="16" alt="" />
          <span>{a.text}</span>
        </a>
      ))}
    </div>
  );
}
