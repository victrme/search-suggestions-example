import { useEffect, useState } from "preact/hooks";
import Input from "../components/Input.tsx";

type Suggestions = {
  text: string;
  desc?: string;
  image?: string;
}[];

async function callAPI(query: string, provider: string): Promise<Suggestions> {
  const url = `https://searchsuggestions.netlify.app/${provider}/en/${query}`;
  const resp = await fetch(url);

  if (resp.status === 404) {
    return [];
  }

  const json: Suggestions = await resp.json();
  return json;
}

export default function Search() {
  const [list, setList] = useState([] as Suggestions);
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

  function handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    setQuery(val);
  }

  function handleProvider(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    setProvider(val);
  }

  async function handleList(q: string) {
    const json = await callAPI(q, provider);
    setList(json);
  }

  useEffect(() => {
    handleList(query);
  }, [query]);

  return (
    <>
      <div class="flex flex-col-reverse gap-2 sm:flex-row">
        <Input
          type="text"
          name="searchbar"
          value={query}
          onInput={handleInput}
          placeholder="Search something "
          class="w-full rounded-md focus:border-red-400 focus:outline-none"
        />

        <select
          name="providers"
          value={provider}
          onChange={handleProvider}
          class="bg-transparent border(gray-500 2) rounded-md px-3 py-2"
        >
          {providers.map((item) => (
            <option value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {list.length > 0 && (
        <ul class="my-4 w-full border-2 rounded-md">
          {list.map((item) => (
            <li class="flex items-center gap-3 px-3 my-4 leading-4">
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
      )}
    </>
  );
}
