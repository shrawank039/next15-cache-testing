"use client";
import { getTimestamp, refreshTimestamp } from '@/action/timestamp';
import { useState, useEffect } from 'react';

export default function CachePage() {
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    const fetchTimestamp = async () => {
      const data = await getTimestamp();
      setTimestamp(data.timestamp);
    };
    fetchTimestamp();
  }, []);

  const handleRefresh = async () => {
    await refreshTimestamp();
    const data = await getTimestamp();
    setTimestamp(data.timestamp);
  };
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cache Testing Page</h1>
      <div className="border p-4 rounded-md">
        <p>Current Timestamp:</p>
        <input
          type="text"
          value={timestamp}
          readOnly
          className="border p-2 mt-2 w-full rounded-md"
        />
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleRefresh}
      >
        Refresh Timestamp
      </button>
    </div>
  );
}