import Link from "next/link";

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return (
    <div className="mx-auto my-12 w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
      <h1 className="my-6">Comming soon...</h1>
      <Link href="/suche">Zur Suche</Link>
      <div className="my-12">
      </div>
    </div>
  );
}