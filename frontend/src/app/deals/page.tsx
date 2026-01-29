/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://backend-startup-benefit-platform.onrender.com/api/deals")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data.deals || data);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Deals</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {deals.map((d) => (
          <Link
            key={d._id}
            href={`/deals/${d._id}`}
            className="border p-4 rounded hover:shadow"
          >
            <h2 className="font-semibold">{d.title}</h2>
            <p>{d.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
