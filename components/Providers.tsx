import { JSX } from "preact/jsx-runtime";

export default function ProviderSelect(
  props: JSX.HTMLAttributes<HTMLSelectElement>,
) {
  const providers = [
    "google",
    "bing",
    "yahoo",
    "qwant",
    "duckduckgo",
    "startpage",
  ];

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
