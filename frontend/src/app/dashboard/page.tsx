/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useContext, useEffect, useState } from "react";
import api from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DealCard from "@/components/DealCard";

export default function Dashboard() {
  const { token, isAdmin } = useContext(AuthContext);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = async () => {
    try {
      const res = await api.get("/claims", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaims(res.data.claims);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchClaims();
  }, [token]);

  // Admin actions
  const handleApprove = async (claimId: string) => {
    try {
      await api.patch(`/claims/approve/${claimId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClaims();
    } catch (err) {
      console.error(err);
      alert("Error approving claim");
    }
  };

  const handleReject = async (claimId: string) => {
    try {
      await api.patch(`/claims/reject/${claimId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchClaims();
    } catch (err) {
      console.error(err);
      alert("Error rejecting claim");
    }
  };

  if (!token) return <p className="mt-10 text-center text-gray-600">Login to see dashboard</p>;
  if (loading) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {claims.length === 0 && <p>No claimed deals yet</p>}
       

        {claims.map((c) => (
  <div key={c._id} className="border p-4 rounded space-y-2">
    <h2 className="font-bold">{c.deal.title}</h2>

    {isAdmin && (
      <p className="text-sm text-gray-500">
        Claimed by: {c.user?.name} ({c.user?.email})
      </p>
    )}

    <p>Status: {c.status}</p>
    <p>Locked: {c.deal.isLocked ? "Yes" : "No"}</p>

    {isAdmin && c.status === "locked" && (
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => handleApprove(c._id)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => handleReject(c._id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>
    )}
  </div>
))}

      </div>
    </div>
  );
}

