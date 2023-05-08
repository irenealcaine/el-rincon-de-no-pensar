import React, { useState, useEffect } from "react";

const Watch = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = hours * 30 + minutes * 0.5 + 180;
  const minuteDegrees = minutes * 6 + seconds * 0.1 + 180;
  const secondDegrees = seconds * 6 + 180;

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative w-72 h-72 rounded-full border-4 border-blue-700 bg-white">
        <div
          className="absolute top-1/2 left-1/2 w-1 h-20 bg-green-700 rounded transform -translate-x-1/2 translate-y-full"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: "top",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-1 h-28 bg-green-700 rounded "
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: "top",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-0.5 h-32 bg-red-700 rounded transform -translate-x-1/2 translate-y-full"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: "top",
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-blue-700 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};

export default Watch;
