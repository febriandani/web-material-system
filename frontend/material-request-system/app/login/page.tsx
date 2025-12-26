"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { setAccessToken, setRefreshToken } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const { user, token } = res.data.data;

        // SIMPAN SEMUANYA
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", token.access_token);
        localStorage.setItem("refresh_token", token.refresh_token);

        // BARU redirect
        router.replace("/dashboard");
    } catch (_err: unknown) {
      setError("Username atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1220]">
      <div className="w-[360px] bg-[#0F172A] p-6 rounded-xl shadow-lg">
        <h1 className="text-xl font-semibold text-white mb-6 text-center">
          Material Request Login
        </h1>

        {error && (
          <div className="bg-red-500/10 text-red-400 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 p-2 rounded bg-[#020617] text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 p-2 rounded bg-[#020617] text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
