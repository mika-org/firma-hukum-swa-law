"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/actions/auth";
import { Scale, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, null);

  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#B29A68_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative w-full max-w-md bg-white border border-border-subtle rounded-lg shadow-2xl p-8 sm:p-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded bg-navy-primary text-gold border border-gold/40 flex items-center justify-center mx-auto">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="font-editorial text-3xl font-bold text-navy-primary tracking-tight">
            Portal Admin CMS
          </h1>
          <p className="text-xs text-text-muted">
            Masuk untuk mengelola seluruh konten dan permohonan konsultasi hukum
          </p>
        </div>

        {/* Error message */}
        {state?.error && (
          <div className="p-3.5 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        {/* Login Form */}
        <form action={formAction} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                name="email"
                required
                placeholder="nama@email.com"
                className="w-full h-11 pl-10 pr-3.5 text-sm bg-white border border-border-subtle rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-dark uppercase tracking-wider mb-2">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-3.5 text-sm bg-white border border-border-subtle rounded-md text-text-dark placeholder:text-gray-400 focus:outline-none focus:border-navy-primary focus:ring-1 focus:ring-navy-primary transition-colors"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-11 inline-flex items-center justify-center px-6 text-xs uppercase tracking-wider font-semibold bg-navy-primary hover:bg-navy-light text-white rounded transition-colors shadow-sm disabled:opacity-60"
            >
              {isPending ? (
                <span>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
