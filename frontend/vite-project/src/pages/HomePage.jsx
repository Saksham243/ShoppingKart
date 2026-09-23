import React from 'react';
import axiosInstance from '../axiosCalls/axios';

function HomePage() {
  const handleLogout = async () => {
    await axiosInstance('/logout')
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-gray-900">ShopSphere</span>
              <span className="ml-2 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                Home
              </span>
            </div>
          </div>

          {/* Header Right Actions */}
          <div className="flex items-center gap-3">
            {/* Live Status Pill */}
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Authenticated</span>
            </div>

            {/* Header Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 shadow-xs transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Home Page Body */}
      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Welcome Home
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            This is your authenticated account overview page.
          </p>
        </div>

        {/* Featured Authentication Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 via-white to-blue-50/40 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Large Shield Check Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-100/60 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  Verified Session
                </div>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  I am Authenticated
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-gray-600">
                  You are currently logged in with a valid authorized session. Everything is verified and ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;