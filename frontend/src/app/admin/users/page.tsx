/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext, useEffect, useState } from "react";
import api from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

export default function AdminUsersPage() {
  const { token, isAdmin } = useContext(AuthContext);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !isAdmin) return;

    api
      .get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading users", err);
        setLoading(false);
      });
  }, [token, isAdmin]);

  if (!isAdmin) {
    return <p className="p-10 text-red-600">Access denied</p>;
  }

  if (loading) {
    return <p className="p-10">Loading users...</p>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Verified</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">
                {u.isVerified ? "✅ Yes" : "❌ No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
