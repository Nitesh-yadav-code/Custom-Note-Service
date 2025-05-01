import React from "react";
import supabase from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PostNotes from "../Components/postNotes";
import fetchNotes from "../Components/fetchNotes";

function Dashboard() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  const data = fetchNotes();
  const userEmail = localStorage.getItem("email");
  
  return (
    <>
    
      <div className="flex items-center justify-between p-6 bg-white/70 backdrop-blur-sm border-b border-gray-200 shadow-md">
        <h1>Welcome, {userEmail}</h1>
        <button
          className="bg-white max-w-lg  text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300 flex items-center space-x-1 shadow-sm"
          onClick={signOut}
        >
          <span>Sign out</span>
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-full md:w-1/3 p-6 bg-white/70 backdrop-blur-sm border-r border-gray-200 shadow-md overflow-y-auto">
          <div className="sticky top-0">
            <h2 className="text-lg font-medium mb-4 text-gray-700 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Create a New Note
            </h2>
            <PostNotes />
          </div>
        </div>
        <div className="w-full md:w-2/3 p-6 overflow-y-auto bg-gray-50/50">
          <h2 className="text-lg font-medium mb-4 text-gray-700 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-2 flex items-center z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Your Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <div
                  className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-300 border border-gray-100 group relative overflow-hidden"
                  key={item.id}
                >
                  <div className="absolute -right-10 -top-10 w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 relative">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 relative">{item.description}</p>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 relative">
                    <span className="text-xs text-gray-500">Created today</span>
                      
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm border border-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-500">
                  No notes found. Create your first note!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
