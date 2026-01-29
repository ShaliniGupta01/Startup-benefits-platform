/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import api from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

type ClaimStatus = "none" | "pending" | "approved";

export default function DealDetails() {
  const { id } = useParams();
  const { token, isLoggedIn, isAdmin } = useContext(AuthContext);

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>("none");
  const [claimId, setClaimId] = useState<string | null>(null);

  // Load deal and user's claim
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const d = await api.get(`/deals/${id}`);
        setDeal(d.data.deal || d.data);

        if (token) {
          const res = await api.get("/claims", {
            headers: { Authorization: `Bearer ${token}` },
          });

          const claims = res.data.claims || [];
          const claim = isAdmin
            ? claims.find((c: any) => c.deal._id === id && c.status === "pending")
            : claims.find((c: any) => c.deal._id === id);

          if (claim) {
            setClaimStatus(claim.status);
            setClaimId(claim._id);
          } else {
            setClaimStatus("none");
            setClaimId(null);
          }
        }
      } catch (err) {
        console.error("Error loading deal/claims:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id, token, isAdmin]);

  // User claims the deal
  const claimDeal = async () => {
    if (!token) return alert("Login to claim the deal!");

    try {
      const res = await api.post(`/claims/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaimStatus("pending");
      setClaimId(res.data.claim._id);

      const d = await api.get(`/deals/${id}`);
      setDeal(d.data.deal || d.data);
    } catch (err) {
      console.error("Claim failed:", err);
      alert("Failed to claim deal. Please try again.");
    }
  };

  // Admin actions
  const approveClaim = async () => {
    if (!token || !claimId) return;

    try {
      await api.patch(`/claims/approve/${claimId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaimStatus("approved");

      const d = await api.get(`/deals/${id}`);
      setDeal(d.data.deal || d.data);
    } catch (err) {
      console.error("Approve failed:", err);
    }
  };

  const rejectClaim = async () => {
    if (!token || !claimId) return;

    try {
      await api.patch(`/claims/reject/${claimId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClaimStatus("none");
    } catch (err) {
      console.error("Reject failed:", err);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (!deal) return <p className="mt-10 text-center">Deal not found</p>;

  const isDealLocked = claimStatus === "pending" || deal.isLocked;

  return (
    <div className="p-10 max-w-xl mx-auto border rounded shadow">
      <h1 className="text-2xl font-bold">{deal.title}</h1>
      <p className="my-4">{deal.description}</p>

      {deal.isLocked && <p className="text-red-600">🔒 Deal is locked</p>}

      {/* Normal user claim section */}
      {!isAdmin && (
        <div className="mt-6">
          {!isLoggedIn && (
            <button className="bg-gray-400 text-white px-4 py-2 rounded">
              Login to claim
            </button>
          )}

          {isLoggedIn && claimStatus === "none" && !isDealLocked && (
            <button
              onClick={claimDeal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Claim Deal
            </button>
          )}

          {claimStatus === "pending" && (
            <p className="text-orange-600 mt-2">
              🔒 Pending Admin Approval
            </p>
          )}

          {claimStatus === "approved" && (
            <p className="text-green-600 mt-2">✅ Approved</p>
          )}
        </div>
      )}

      {/* Admin buttons for pending claim */}
      {isAdmin && claimStatus === "pending" && claimId && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={approveClaim}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={rejectClaim}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
