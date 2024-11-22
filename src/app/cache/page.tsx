"use client";

import { useState, useEffect } from "react";

export default function CachePage() {
  const [timestamp, setTimestamp] = useState<string>("");

  const fetchTimestamp = async () => {
    try {
      const response = await fetch("/api/timestamp", {
        cache: "force-cache",
        next: {
          revalidate: 3,
        },
      });
      const data = await response.json();
      setTimestamp(data.timestamp);
    } catch (error) {
      console.error("Error fetching timestamp:", error);
    }
  };

  useEffect(() => {
    fetchTimestamp();
  }, []);

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
        onClick={fetchTimestamp}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Refresh Timestamp
      </button>
    </div>
  );
}