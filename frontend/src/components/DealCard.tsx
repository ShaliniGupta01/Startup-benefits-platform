import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DealCard({ deal }: any) {
  return (
    <Link
      href={`/deals/${deal._id}`}
      className="border rounded p-4 hover:shadow"
    >
      <h3 className="text-lg font-semibold">{deal.title}</h3>
      <p className="text-sm text-gray-500">{deal.partner}</p>

      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
          deal.isLocked
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {deal.isLocked ? "Locked" : "Unlocked"}
      </span>
    </Link>
  );
}

