import React, { useState } from 'react';
import '../App.css'
const PostNotes = ({ onNoteAdded }) => {
  const uid = localStorage.getItem("uid");
  const accessToken = localStorage.getItem("accessToken");

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const postData = async (payload) => {
    try {
      const response = await fetch('https://pthwkwbyyxcazmigxpzv.supabase.co/rest/v1/notes', {
        method: 'POST',
        headers: {
          'Authorization': `${accessToken}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0aHdrd2J5eXhjYXptaWd4cHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMTUxOTEsImV4cCI6MjA2MTU5MTE5MX0.lm80N0lOUI8DzoT5imzkyum2fxeAVMXwYX-AstukqDA',
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        console.error('Error:', response.status, response.statusText);
        return;
      }
      const result = await response.json();
      return result[0];
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { title, description, user_id: uid };
    const newNote = await postData(updatedData);

    if (newNote) {
      onNoteAdded(newNote); 
      setTitle('');
      setDescription('');
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Title
      </label>
      <input
        type="text"
        id="title"
        onChange={(e) => setTitle(e.target.value)}
    value={title}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
        placeholder="Enter note title"
      />
    </div>
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        id="description"
        onChange={(e) => setDescription(e.target.value)}
    value={description}
        rows={4}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white/50 backdrop-blur-sm"
        placeholder="Enter note description"
      ></textarea>
    </div>
    <button
      type="submit"
      className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300 transform hover:-translate-y-1"
    >
      Post Note
    </button>
  </form>
  );
};

export default PostNotes;
