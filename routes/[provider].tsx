import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return <p>Hello {props.params.provider}</p>;
}
