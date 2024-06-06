// components/LoadingSpinner.js
"use client";
import { useEffect, useState } from "react";
import "../../../../servers/style.css";
const LoadingSpinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulating a 3-second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
