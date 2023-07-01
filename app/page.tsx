import Link from "next/link";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return (
    <div className="mx-auto my-12 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
      <h1 className="my-6">Wer sucht, der findet</h1>
      <form action="/suche" method="get" className="my-12">
        <div className="flex gap-x-1">
          <input type="search" id="query" name="q" defaultValue={searchParams.q} placeholder="Suchbegriff eingeben" className="w-full rounded-md border bg-gray-100 py-2 pl-2 text-sm focus:bg-yellow-100 focus:text-gray-900 focus:outline-none" />
          <button type="submit" className="p-2 rounded bg-blue-500 text-white hover:bg-blue-700"><SearchIcon className="h-6 w-6 text-white" /></button>
        </div>
      </form>
      <div className="my-12">
      </div>
    </div>
  );
}