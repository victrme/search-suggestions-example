import { useEffect, useState } from "preact/hooks";
import Input from "../components/Input.tsx";
import Providers from "../components/Providers.tsx";
import ResultItem from "../components/ResultItem.tsx";
import LangSelect from "../components/Langs.tsx";

type Suggestions = {
  text: string;
  desc?: string;
  image?: string;
}[];

type APIProps = { lang: string; query: string; provider: string; auth: string };
type APIReturn = Promise<[Suggestions, number]>;

async function callAPI({ lang, query, provider, auth }: APIProps): APIReturn {
  const url = "https://searchsuggestions.netlify.app/";
  const perfstart = performance.now();

  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ provider, lang, query }),
    headers: { "authorization": auth },
  });

  if (resp.status === 404) {
    return [[], -1];
  }

  const json: Suggestions = await resp.json();
  const ms = Math.round(performance.now() - perfstart);

  return [json, ms];
}

export default function Search({ auth }: { auth: string }) {
  const [list, setList] = useState([] as Suggestions);
  const [provider, setProvider] = useState("google");
  const [selected, setSelected] = useState(-1);
  const [latency, setLatency] = useState(-1);
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState("en");

  function handleInput(q: string) {
    setQuery(q);
    handleList(q);
  }

  function handleProvider(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    setProvider(val);
  }

  function handleLang(e: Event) {
    const val = (e.target as HTMLSelectElement).value;
    setLang(val);
  }

  async function handleList(q: string) {
    const [json, ms] = await callAPI({ query: q, provider, lang, auth });
    setList(json);
    setLatency(ms);
    setSelected(-1);
  }

  function handleResultsKeys(e: KeyboardEvent) {
    const isArrowDown = e.code === "ArrowDown";
    const isArrowUp = e.code === "ArrowUp";
    const isEnter = e.code === "Enter";
    const isReturn = e.code === "Escape";

    if (isArrowDown || isArrowUp) {
      const count = selected + (isArrowDown ? 1 : -1);
      setSelected(Math.max(-1, count % list.length));
      e.preventDefault();
    }

    if (isEnter) {
      handleInput(list[selected].text);
      e.preventDefault();
    }

    if (isReturn) {
      setSelected(-1);
      setList([]);
    }
  }

  useEffect(() => {
    if (provider && lang) {
      localStorage.setItem("lastchoice", JSON.stringify({ provider, lang }));
    }
  }, [provider, lang]);

  useEffect(() => {
    if (localStorage.lastchoice) {
      const { provider, lang } = JSON.parse(localStorage.lastchoice);
      setProvider(provider ?? "google");
      setLang(lang ?? "en");
    }
  }, []);

  return (
    <form
      role="search"
      onKeyDown={handleResultsKeys}
      onSubmit={(e) => e.preventDefault()}
    >
      <div class="flex flex-col gap-2 sm:flex-row-reverse">
        <div class="flex w-full gap-2">
          <Providers
            name="providers"
            value={provider}
            onChange={handleProvider}
            class="bg-transparent border(gray-500 2) w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
          />

          <LangSelect
            name="lang"
            value={lang}
            onChange={handleLang}
            class="bg-transparent border(gray-500 2) w-full rounded-md px-3 py-2 focus:border-red-400 focus:outline-none"
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
          class="w-full rounded-md outline-none focus:border-red-400"
          onInput={(e) => handleInput((e.target as HTMLInputElement).value)}
        />
      </div>

      {list.length > 0 && (
        <>
          <ul
            tabIndex={0}
            role="listbox"
            id="search-results"
            aria-label="search-results"
            class="my-4 p-1 w-full border-2 rounded-md outline-none"
          >
            {list.map((item, i) => (
              <ResultItem
                item={item}
                query={query}
                key={item.text + i}
                role="option"
                aria-atomic="true"
                aria-label={item.text}
                aria-selected={selected === i ? "true" : "false"}
                onClick={() => handleInput(item.text)}
                onMouseEnter={() => setSelected(i)}
                class={"flex items-center gap-3 p-2 m-1 rounded leading-4 outline-none cursor-pointer" +
                  (selected === i ? " bg-blue-50" : "")}
              />
            ))}
          </ul>

          {
            <p class="w-full text-center leading-3 text-gray-400 mb-4">
              <small>{latency}ms</small>
            </p>
          }
        </>
      )}
    </form>
  );
}
