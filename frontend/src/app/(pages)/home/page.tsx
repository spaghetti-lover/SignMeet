import Link from "next/link";
import React from "react";

const ZoomHome = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex items-center p-8">
        {/* Quick actions grid */}
        <div className="grid grid-cols-2 gap-8 max-w-lg mx-auto">
          {/* New meeting */}
          <div className="flex flex-col items-center">
            <button className="w-24 h-24 bg-orange-500 rounded-2xl flex items-center justify-center hover:bg-orange-600 transition-colors shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <div className="mt-2 flex items-center text-gray-700">
              <span>New meeting</span>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Join */}
          <Link href={"/meeting"}>
            <div className="flex flex-col items-center">
              <button className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
              <span className="mt-2 text-gray-700">Join</span>
            </div>
          </Link>

          {/* Schedule */}
          <div className="flex flex-col items-center">
            <button className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
            <span className="mt-2 text-gray-700">Schedule</span>
          </div>

          {/* Share screen */}
          <div className="flex flex-col items-center">
            <button className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
            </button>
            <span className="mt-2 text-gray-700">Share screen</span>
          </div>
        </div>
      </div>

      {/* Calendar sidebar */}
      <div className="w-96 border-l border-gray-200 bg-white shadow-lg flex flex-col justify-between">
        <div>
          <div className="p-4 bg-slate-800 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">6:08 AM</h2>
                <p className="text-gray-300">Sunday, November 17</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-slate-700 rounded">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button className="p-2 hover:bg-slate-700 rounded">···</button>
              </div>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-gray-600">
              Respond to events, see other's availability and more by{" "}
              <a href="#" className="text-blue-500 hover:underline">
                connecting your calendar
              </a>
            </p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md flex items-center">
                  Today
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </button>
                <button className="p-1 text-gray-700 hover:bg-gray-100 rounded-md">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center text-gray-500">
              <img
                src="/api/placeholder/200/150"
                alt="No meetings"
                className="mb-4"
              />
              <p className="text-center">
                No meetings scheduled.
                <br />
                Enjoy your day!
              </p>
              <button className="mt-4 text-blue-500 hover:underline flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Schedule a Meeting
              </button>
            </div>
          </div>
        </div>

        {/* Open Recordings button */}
        <div className="p-4">
          <button className="text-gray-700 hover:text-gray-900 flex items-center">
            <span>Open Recordings</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZoomHome;
