"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
  const { token, isAdmin, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Startup Benefits</h1>

      <nav className="flex gap-6 items-center">
        <Link href="/">Home</Link>
        <Link href="/deals">Deals</Link>

        {/* Dashboard link for all logged in users */}
        {token && <Link href="/dashboard">Dashboard</Link>}

        {/* ADMIN CREATE DEAL */}
        {token && isAdmin && (
          <Link
            href="/auth/create-deal"
            className="bg-white text-blue-600 px-3 py-1 rounded font-semibold"
          >
            + Create Deal
          </Link>
        )}

        {/* AUTH LINKS */}
        {!token ? (
          <>
            <Link href="/auth/login">Login</Link>
            <Link
              href="/auth/register"
              className="border border-white px-3 py-1 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
