// app/page.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome to Perago Information System!</h1>
      <a href="/positions">
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Manage Positions</button>
      </a>
    </div>
  );
};

export default Home; // Ensure this is the default export