"use client";

import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { handleLogin, handleSocialLogin } from "@/src/Components/auth/Auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
const router=useRouter()


  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          {/* Left Side */}
     
        <section className="relative hidden overflow-hidden bg-blue-600 lg:block">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-20 h-125 w-125 rounded-full bg-blue-400/20 blur-3xl" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              TaskFlow<span className="text-blue-200">.</span>
            </Link>

            {/* Hero */}
            <div className="max-w-lg">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-50 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                Your productivity workspace
              </div>

              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
                Turn your
                <br />
                plans into
                <br />
                <span className="text-blue-200">progress.</span>
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-blue-100">
                Organize your tasks, stay focused, and keep track of
                everything that matters — all in one simple workspace.
              </p>

              {/* Mini Dashboard */}
              <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
                <div className="rounded-xl bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Today's progress
                      </p>

                      <p className="mt-1 text-2xl font-bold text-slate-900">
                        68%
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <CheckCircle2 size={20} />
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-[68%] rounded-full bg-blue-600" />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={15}
                        className="text-blue-600"
                      />
                      <span className="text-xs text-slate-500">
                        Finish project documentation
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={15}
                        className="text-blue-600"
                      />
                      <span className="text-xs text-slate-500">
                        Review today's tasks
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-blue-100">
              Simple tools. Better focus.
            </p>
          </div>
        </section>

          {/* Right Side */}
          <div className="p-6 sm:p-10">
            {/* Mobile Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 lg:hidden"
            >
              TaskFlow
            </Link>

            <div className="mx-auto mt-8 max-w-md lg:mt-0">
              {/* Heading */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Sign in to continue to your account.
                </p>
              </div>

               {/* Social Signup */}
                          <div className="mt-8 grid grid-cols-3 gap-3">
                            {/* Google */}
                            <button
                              type="button"
                              onClick={() => handleSocialLogin("Google")}
                              className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:bg-slate-50"
                              aria-label="Sign up with Google"
                            >
                            <FcGoogle/>
                            </button>
              
                            {/* GitHub */}
                            <button
                              type="button"
                              onClick={() => handleSocialLogin("GitHub")}
                              className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                              aria-label="Sign up with GitHub"
                            >
                              <FaGithub size={19} />
                            </button>
              
                            {/* Facebook */}
                            <button
                              type="button"
                              onClick={() => handleSocialLogin("Facebook")}
                              className="flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:bg-slate-50"
                              aria-label="Sign up with Facebook"
                            >
                             <FaFacebook className="text-blue-500"/>
                            </button>
                          </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs text-slate-400">OR</span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Login Form */}
              <form onSubmit={(e)=>handleLogin(e, router)} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input name='email'
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-slate-700"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input name='password'
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Login */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  Sign In
                </button>
              </form>

              {/* Register */}
              <p className="mt-7 text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
