import React, { useEffect, useState } from 'react';

export default function UiTimer() {
  const [timeLeft, setTimeLeft] = useState(3600); // Set initial time in seconds (e.g., 1 hour)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0; // Stop the timer at 0
        }
        return prev - 1; // Decrease time
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Convert time left to hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-gray-800 text-white p-4 h-full w-full rounded-lg shadow-lg hidden sm:block">
      <div className='flex justify-center items-center w-full h-full'>
        <div className="mt-2">
          <h2 className="text-xl font-bold text-center">Our Promo Ends In:</h2>
          <div className="text-3xl font-semibold">{`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</div>
        </div>
      </div>
    </div>
  );
}