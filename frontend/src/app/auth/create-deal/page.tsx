"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { AuthContext } from "@/context/AuthContext";

export default function CreateDealPage() {
  const { token, isAdmin } = useContext(AuthContext);
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    partner: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  // 🚫 BLOCK NON-ADMIN
  if (!token || !isAdmin) {
    return (
      <p className="p-10 text-center text-red-600">
        Access denied. Admin only.
      </p>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/deals", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Deal created successfully");
      router.push("/deals");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create deal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Create New Deal</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Deal Title"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Deal Description"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="partner"
          placeholder="Partner Name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="Category"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        >
          {loading ? "Creating..." : "Create Deal"}
        </button>
      </form>
    </div>
  );
}
