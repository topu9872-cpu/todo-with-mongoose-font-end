"use client";

import Link from "next/link";
import { useRef, useState, useLayoutEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";
import gsap from "gsap";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animation for state changes
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (step === "success") {
        // Animate Success Icon Pop & Bounce
        gsap.fromTo(
          "[data-gsap='success-icon']",
          { scale: 0, rotate: -45, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.75,
            ease: "back.out(1.7)",
          }
        );

        // Animate Ring Ripple
        gsap.fromTo(
          "[data-gsap='success-ripple']",
          { scale: 0.8, opacity: 0 },
          {
            scale: 1.25,
            opacity: 0.3,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );

        // Content Fade-Up
        gsap.from("[data-gsap='success-content']", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.2,
          ease: "power2.out",
        });
      } else {
        // Step transition fade-in
        gsap.from("[data-gsap='card-content']", {
          opacity: 0,
          y: 15,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [step]);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // TODO: Send OTP to backend
    setStep("otp");
    setTimeout(() => inputRefs.current[0]?.focus(), 0);
  };

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);
    setError("");

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedDigits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (!pastedDigits.length) return;

    const updatedOtp = ["", "", "", "", "", ""];

    pastedDigits.forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    setError("");

    inputRefs.current[Math.min(pastedDigits.length, 5)]?.focus();
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const code = otp.join("");

    if (code.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    // TODO: Verify OTP API call
    console.log("Verified:", { email, code });

    // Transition to Success UI
    setStep("success");
  };

  return (
    <main
      ref={containerRef}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 selection:bg-blue-500 selection:text-white"
    >
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 block text-center text-2xl font-bold tracking-tight text-blue-600"
        >
          TaskFlow<span className="text-blue-300">.</span>
        </Link>

        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          {/* SUCCESS UI */}
          {step === "success" ? (
            <div className="text-center">
              {/* Icon Container */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div
                  data-gsap="success-ripple"
                  className="absolute inset-0 rounded-full bg-emerald-100/80"
                />
                <div
                  data-gsap="success-icon"
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 ring-4 ring-white"
                >
                  <CheckCircle2 size={36} strokeWidth={2.5} />
                </div>
              </div>

              {/* Text Content */}
              <div data-gsap="success-content" className="mt-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Verification Complete!
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  Your email{" "}
                  <span className="font-semibold text-slate-700">
                    {email}
                  </span>{" "}
                  has been successfully verified. You can now reset your password.
                </p>

                {/* Primary Action Button */}
                <div className="mt-8 space-y-3">
                  <Link
                    href="/reset-password"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99]"
                  >
                    <Lock size={18} />
                    Set New Password
                  </Link>

                  <Link
                    href="/login"
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* EMAIL & OTP STEPS */
            <div data-gsap="card-content">
              {/* Icon Container */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                {step === "email" ? (
                  <Mail size={26} />
                ) : (
                  <ShieldCheck size={28} />
                )}
              </div>

              {step === "email" ? (
                <>
                  <div className="mt-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      Forgot your password?
                    </h1>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                      Enter your email address and we'll send you a 6-digit
                      verification code.
                    </p>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="mt-8 space-y-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-700"
                      >
                        Email address
                      </label>

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        required
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <button
                      type="submit"
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]"
                    >
                      Send Verification Code
                      <ArrowRight size={17} />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="mt-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      Verify your email
                    </h1>

                    <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
                      Enter the 6-digit code sent to{" "}
                      <span className="font-semibold text-slate-800">
                        {email}
                      </span>
                    </p>
                  </div>

                  <form onSubmit={handleVerify} className="mt-8">
                    <div className="flex justify-center gap-2 sm:gap-2.5">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(element) => {
                            inputRefs.current[index] = element;
                          }}
                          type="text"
                          inputMode="numeric"
                          autoComplete={index === 0 ? "one-time-code" : "off"}
                          maxLength={1}
                          value={digit}
                          aria-label={`Verification digit ${index + 1}`}
                          onChange={(e) =>
                            handleOtpChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          onPaste={handleOtpPaste}
                          className="h-12 w-10 rounded-xl border border-slate-200 bg-slate-50/50 text-center text-lg font-bold text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:h-14 sm:w-12"
                        />
                      ))}
                    </div>

                    {error && (
                      <p className="mt-3 text-center text-xs font-medium text-red-600">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-[0.99]"
                    >
                      Verify Code
                      <ArrowRight size={17} />
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={() => {
                      setStep("email");
                      setOtp(["", "", "", "", "", ""]);
                      setError("");
                    }}
                    className="mt-4 w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
                  >
                    Change email address
                  </button>
                </>
              )}

              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
                >
                  <ArrowLeft size={16} />
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Simple tools. Better focus.
        </p>
      </div>
    </main>
  );
}