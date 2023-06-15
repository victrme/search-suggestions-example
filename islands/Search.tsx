import { useEffect, useState } from "preact/hooks";
import Input from "../components/Input.tsx";

type Suggestions = {
  text: string;
  desc?: string;
  image?: string;
}[];

async function callAPI(
  query: string,
  provider: string,
): Promise<[Suggestions, number]> {
  const url = `https://searchsuggestions.netlify.app/${provider}/en/${query}`;
  const perfstart = performance.now();
  const resp = await fetch(url);

  if (resp.status === 404) {
    return [[], -1];
  }

  const json: Suggestions = await resp.json();
  return [json, performance.now() - perfstart];
}

export default function Search() {
  const [list, setList] = useState([] as Suggestions);
  const [latency, setLatency] = useState(-1);
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("google");
  const providers = [
    "google",
    "bing",
    "yahoo",
    "qwant",
    "duckduckgo",
    "startpage",
  ];

  function handleInput(q: string) {
    setQuery(q);
    handleList(q);
  }

  function handleProvider(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    setProvider(val);
  }

  async function handleList(q: string) {
    const [json, ms] = await callAPI(q, provider);
    setList(json);
    setLatency(ms);
  }

  return (
    <>
      <div class="flex flex-col gap-2 sm:flex-row-reverse">
        <select
          name="providers"
          value={provider}
          onChange={handleProvider}
          class="bg-transparent border(gray-500 2) rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
        >
          {providers.map((item) => (
            <option value={item}>
              {item}
            </option>
          ))}
        </select>

        <Input
          onInput={(e) => handleInput((e.target as HTMLInputElement).value)}
          value={query}
          type="search"
          role="combobox"
          name="searchbar"
          placeholder="Search something "
          class="w-full rounded-md outline-none focus:border-red-400"
        />
      </div>

      {list.length > 0 && (
        <>
          <ul
            role="listbox"
            class="my-4 p-1 w-full border-2 rounded-md"
          >
            {list.map((item) => (
              <li
                tabIndex={0}
                role="option"
                aria-label="search suggestions"
                onClick={() => handleInput(item.text)}
                class="flex items-center gap-3 p-2 m-1 rounded leading-4 outline-none cursor-pointer hover:bg-blue-50 focus-visible:bg-blue-50"
              >
                <img
                  class="object-contain"
                  src={item.image ?? "search.svg"}
                  width="24"
                  height="24"
                  alt=""
                />

                <div>
                  <p>{item.text}</p>
                  {item.desc && (
                    <p class="text-sm text-gray-500">
                      <small>{item.desc}</small>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {
            <p class="w-full text-center leading-3 text-gray-400 mb-4">
              <small>{latency}ms</small>
            </p>
          }
        </>
      )}
    </>
  );
}
