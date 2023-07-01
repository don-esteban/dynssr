import Link from "next/link";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";

import search, { SearchResult } from "../../models/search";

/*

TODO:

*/

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const searchResult = await search(searchParams.q)
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
        <Results searchResult={searchResult} />
      </div>
    </div>
  );
}


function Results({ searchResult }: ResultsProps) {
  // HTTP Error
  if (searchResult.error) {
    return (
      <p className="my-3 text-sm text-red-500">
        Etwas lief schief. Vermutlich ein Netzwerk-Problem. Bitte versuchen Sie
        es erneut.
      </p>
    );
  }

  // Search not done yet
  if (!searchResult.query) {
    return null;
  }

  // Search done, but no results
  if (searchResult.items.length === 0) {
    return (
      <p className="my-3 text-sm text-gray-400">
        Ihre Suchbegriffe liefern keine Ergebnisse. Bitte versuchen Sie es
        erneut.
      </p>
    );
  }
  // Search done, results found
  return (
    <ol>
      {searchResult.items.map((item) => (
        <li key={item.link} className="my-9">
          <Link className="text-gray-800 font-semibold visited:text-gray-800" href={item.link}>{item.title}</Link><br />
          <span className="text-gray-400 text-sm">{item.snippet}</span>
        </li>
      ))}
    </ol>
  );
}

interface ResultsProps {
  searchResult: SearchResult;
}
