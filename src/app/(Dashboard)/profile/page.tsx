"use client";

import { useState, useRef } from "react";
import {
  UserRound,
  Mail,
  MapPin,
  CalendarDays,
  Pencil,
  Save,
  X,
  ShieldCheck,
  LockKeyhole,
  ArrowUpRight,
  Camera,
} from "lucide-react";
import BackToBack from "@/src/Components/BackToBack";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: "Mehedi Hasan",
    email: "mehedi@example.com",
    bio: "Focused on getting things done, one task at a time.",
    location: "Bangladesh",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  }

  return (
    <main className="min-h-screen">
      <div className=" bg-slate-50/70 px-4 py-8 sm:px-6 lg:px-8">
              <BackToBack />

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-600">Account</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage your personal information and account security.
          </p>
        </header>

        {/* Profile Header */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              {/* Avatar + Image Upload */}
              <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-blue-50 text-2xl font-bold text-blue-700 ring-1 ring-blue-100">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={profile.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    {profile.name
                      .trim()
                      .split(/\s+/)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "U"}
                  </div>
                )}

                {/* Upload Overlay Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-slate-900/40 text-white opacity-0 transition-opacity group-hover:opacity-100"
                  aria-label="Upload profile image"
                >
                  <Camera size={22} />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-slate-900">
                  {profile.name || "Your Name"}
                </h2>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {profile.email}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active account
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {isEditing ? <X size={16} /> : <Pencil size={16} />}
              {isEditing ? "Cancel" : "Edit profile"}
            </button>
          </div>
        </section>

        {/* Main Content */}
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-3">
          {/* Personal Information */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
              <h3 className="font-semibold text-slate-900">
                Personal information
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Your basic profile details.
              </p>
            </div>

            <form
              className="space-y-5 p-5 sm:p-6"
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditing(false);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Full name
                  </span>
                  <div className="relative">
                    <UserRound
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                      placeholder="Enter your name"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </span>
                  <div className="relative">
                    <Mail
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    Location
                  </span>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-3 top-3 text-slate-400"
                    />
                    <input
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                      placeholder="Your location"
                    />
                  </div>
                </label>

                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-medium text-slate-700">
                    About
                  </span>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    maxLength={250}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
                    placeholder="Write a short introduction..."
                  />
                </label>
              </div>

              {isEditing && (
                <div className="flex justify-end border-t border-slate-100 pt-5">
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Save size={16} />
                    Save changes
                  </button>
                </div>
              )}
            </form>
          </section>

          {/* Account Details */}
          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">
                Account details
              </h3>

              <div className="mt-5 flex items-start gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Member since
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    October 2026
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-slate-100" />

              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Account status
                  </p>
                  <p className="mt-1 text-sm text-emerald-600">Active</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900">Security</h3>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Keep your account secure by updating your password regularly.
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/forgot-password";
                }}
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-3 text-left transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex items-center gap-3">
                  <LockKeyhole size={18} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Change password
                  </span>
                </span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </button>
            </section>
          </aside>
        </div>
      </div>
      </div>
    </main>
  );
}