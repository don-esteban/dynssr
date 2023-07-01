export default async function search(query: string) {

  console.log("/models/search.ts: search() called with query: " + query);

  const api: string = "https://customsearch.googleapis.com/customsearch/v1";
  const key: string = "AIzaSyC_zgjsBHZb9cEhVdOrq1MUzyE1Y5m8wQk";
  const cx: string = "80eaf46c1fa214c08";
  const q:string = query && query.trim();

  if (!q) {
    const searchResult: SearchResult = { query: q, items: [], error: false };
    return searchResult;
  }


  // Ask Google
  let res: Response;
  try {
    res = await fetch(`${api}?key=${key}&cx=${cx}&q=${q} -filetype:pdf`, { next: { revalidate: 60*60*24*3 } });
  } catch (error) { // Network related error
    const searchResult: SearchResult = { query: "", items: [], error: true };
    return searchResult;
  }
 
  // If the response is not ok, return an empty search result
  if (!res.ok) {
    const searchResult: SearchResult = { query: q, items: [], error: true };
    return searchResult;
  }

  // Await JSON object
  const googleSearchResult: GoogleSearchResult = await res.json();

  if (!googleSearchResult.items) {
    const searchResult: SearchResult = { items: [], query: q, error: false };
    return searchResult;
  }

  const searchResultItems: SearchResultItem[] = googleSearchResult.items.map(
    (item) => ({
      title: item.title.split(" |", 1)[0].trim(),
      link: item.link,
      snippet: item.snippet,
    })
  );

  const searchResult: SearchResult = {
    query: q,
    error: false,
    items: searchResultItems,
  };

  return searchResult;
}

// Subset of a Google Custom Search JSON API response
interface GoogleSearchResult {
  items: SearchResultItem[];
}

// Add convenient fields to the Google Custom Search JSON API response
export interface SearchResult extends GoogleSearchResult {
  query: string;
  error: boolean;
}

// Search Results have items
interface SearchResultItem {
  title: string;
  link: string;
  snippet: string;
}
