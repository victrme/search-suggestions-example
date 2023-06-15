import Search from "../islands/Search.tsx";

export default function Home() {
  return (
    <div class="container h-screen pb-16 flex flex-col">
      <div class="mx-auto max-w-lg w-full px-5">
        <header class="w-full my-16 text-left">
          <h1 class="text-3xl font-black leading-7 text-red-400">
            Wow, free suggestions from multiple providers ??
          </h1>
        </header>

        <Search />
      </div>
    </div>
  );
}
