import Search from "../islands/Search.tsx";

export default function Home() {
  return (
    <div class="container h-screen pb-16 flex flex-col  ">
      <header class="mx-auto w-1/2 my-16 text-left">
        <h1 class="text-3xl font-black leading-7">
          Wow, free suggestions from multiple providers ??
        </h1>
      </header>
      <Search />
    </div>
  );
}
