export default function Ads() {
  return (
    <aside class="text-sm">
      <div class="bg-blue-100 h-36 w-full my-4 rounded-md overflow-hidden">
        <span class=" text-5xl text-blue-300 font-black tracking-tighter break-all">
          paid content start for free
        </span>
      </div>

      <div class="bg-indigo-100 h-48 w-full my-4 rounded-md overflow-hidden">
        <span class=" text-5xl text-indigo-300 font-bold tracking-tighter break-all">
          learn more get started now
        </span>
      </div>

      <div class="p-3 rounded bg-gray-50">
        <p>
          We use cookies for non ethical purposes. You can always opt-out of
          those cookies if you want.
        </p>
        <div class="flex gap-2 mt-3">
          <button class="px-3 py-px  rounded bg-gray-200">
            Ask later
          </button>
          <button class="px-2 rounded bg-green-500 text-white">
            Accept all
          </button>
        </div>
      </div>

      <div class="p-3 my-3 rounded bg-blue-50">
        <p>
          New podcast just dropped ! All about things you definitely care about
          🎉 😊
        </p>
        <p>
          Be sure to check it out on{" "}
          <span class="underline text-blue-400 cursor-pointer">
            every single platform possible
          </span>{" "}
          🤯
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <p>Share this page on:</p>
        <div class="flex gap-2">
          <button class="px-2 rounded bg-gray-100">
            Social website
          </button>
          <button class="px-2 rounded bg-gray-100">
            Text message
          </button>
          <button class="px-2 rounded bg-gray-100">Fax</button>
        </div>
      </div>
    </aside>
  );
}
