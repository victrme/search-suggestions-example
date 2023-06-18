import { JSX } from "preact/jsx-runtime";

const providers = [
  "google",
  "bing",
  "yahoo",
  "qwant",
  "duckduckgo",
  "startpage",
];

export default function ProviderSelect(
  props: JSX.HTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select {...props}>
      {providers.map((item) => (
        <option value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
