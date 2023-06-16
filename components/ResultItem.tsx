import { JSX } from "preact/jsx-runtime";

type Item = {
  text: string;
  desc?: string;
  image?: string;
};

type Props = {
  item: Item;
  query: string;
  [key: string]: unknown;
} & JSX.HTMLAttributes<HTMLLIElement>;

export default function ResultItem({ item, query, ...attr }: Props) {
  const { text, desc, image } = item;

  return (
    <li {...attr}>
      <img
        class="object-contain"
        src={image ?? "search.svg"}
        width="24"
        height="24"
        alt=""
      />

      <div>
        <p>
          {text.split(query).map((val, i) => (
            <>
              {i > 0 && <b>{query}</b>}
              <span>{val}</span>
            </>
          ))}
        </p>
        {desc && (
          <p class="text-sm text-gray-500">
            <small>{desc}</small>
          </p>
        )}
      </div>
    </li>
  );
}
