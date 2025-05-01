import React, { useState } from "react";
import supabase from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User account created!");
      navigate("/login");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-70"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-70"></div>
    </div>

    <div className="w-full max-w-md relative">
     

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-500 mt-1">Join NotesApp and start organizing your thoughts</p>
        </div>

        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-sm ${
              message.includes("successfully")
                ? "bg-green-50 text-green-500 border border-green-100"
                : "bg-red-50 text-red-500 border border-red-100"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
              />
            </div>
          </div>

         
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50"
              />
            </div>

           

          
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
              
                Create Account
             
          </button>
        </form>

        <div className="mt-8 text-center">
          <span className="text-gray-600 text-sm">Already have an account? </span>
          <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-500 transition-all duration-200">
            Sign in
          </Link> 
        </div>

        
      </div>

      
    </div>
  </div>
  );
}

export default Register;