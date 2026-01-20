"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.data?.token) {
          localStorage.setItem("token", data.data.token);
        }
        router.push("/dashboard");
      } else {
        setErrors({ submit: data.error || "Invalid credentials" });
      }
    } catch {
      setErrors({ submit: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] flex flex-col">
      {/* Header */}
      <header className="py-4 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Sparkle
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[400px]">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-[40px] font-semibold text-[#1d1d1f] tracking-tight leading-tight">
              Sign in
            </h1>
            <p className="text-[17px] text-[#86868b] mt-3">
              Access your Sparkle account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-[52px] px-4 bg-white border border-[#d2d2d7] rounded-xl text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-[12px] font-medium text-[#86868b] uppercase tracking-wide mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full h-[52px] px-4 bg-white border border-[#d2d2d7] rounded-xl text-[17px] text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            {errors.submit && (
              <div className="text-[14px] text-[#ff3b30] bg-[#ff3b30]/10 rounded-xl px-4 py-3">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-[#0071e3] hover:bg-[#0077ed] text-white text-[17px] font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 h-px bg-[#d2d2d7]" />
            <span className="px-4 text-[14px] text-[#86868b]">or</span>
            <div className="flex-1 h-px bg-[#d2d2d7]" />
          </div>

          {/* Create Account */}
          <div className="text-center">
            <p className="text-[14px] text-[#86868b] mb-3">
              Don&apos;t have an account?
            </p>
            <button
              onClick={() => router.push("/onboarding")}
              className="w-full h-[52px] bg-white border border-[#d2d2d7] hover:bg-[#f5f5f7] text-[#1d1d1f] text-[17px] font-medium rounded-xl transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-[#d2d2d7]">
        <div className="max-w-6xl mx-auto text-center text-[12px] text-[#86868b]">
          © 2024 Sparkle ERP. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
