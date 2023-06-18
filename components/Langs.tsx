import { JSX } from "preact/jsx-runtime";

const langs = {
  en: "Auto",
  fr: "Français",
  sk: "Slovenský",
  sv: "Svenska",
  pl: "Polski",
  pt: "Português",
  nl: "Nederlandse",
  ru: "Русский",
  de: "Deutsch",
  it: "Italiano",
  es: "Español",
  tr: "Türkçe",
  uk: "Українська",
  id: "Indonesia",
  da: "Dansk",
  fi: "Suomi",
  hu: "Magyar",
  gr: "Ελληνικά",
};

export default function LangSelect(
  props: JSX.HTMLAttributes<HTMLSelectElement>,
) {
  return (
    <select {...props}>
      {Object.entries(langs).map(([val, text]) => (
        <option value={val}>
          {text}
        </option>
      ))}
    </select>
  );
}
