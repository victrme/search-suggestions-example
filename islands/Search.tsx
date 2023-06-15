import { useState } from "preact/hooks";
import Input from "../components/Input.tsx";

type Suggestions = {
  text: string;
  desc?: string;
  image?: string;
}[];

async function callAPI(query: string): Promise<Suggestions> {
  const url = `https://searchsuggestions.netlify.app/google/en/${query}`;
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

  async function handleInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    setQuery(val);

    const json = await callAPI(val);
    setList(json);
  }

  return (
    <>
      <Input
        type="text"
        name="searchbar"
        value={query}
        onInput={handleInput}
        placeholder="Search with Google"
        class="w-full rounded-md focus:border-red-400 focus:outline-none"
      />

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
