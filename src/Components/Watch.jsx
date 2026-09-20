import React, { useState, useEffect } from "react";

const timezones = [
  { label: "Madrid", value: "Europe/Madrid" },
  { label: "Londres", value: "Europe/London" },
  { label: "Nueva York", value: "America/New_York" },
  { label: "Tokio", value: "Asia/Tokyo" },
];

const pad = (n) => String(n).padStart(2, "0");

const getParts = (timezone) => {
  const parts = new Intl.DateTimeFormat("es-ES", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) =>
    parseInt(parts.find((part) => part.type === type).value, 10);

  return { hours: get("hour"), minutes: get("minute"), seconds: get("second") };
};

const Watch = () => {
  const [timezone, setTimezone] = useState("Europe/Madrid");
  const [now, setNow] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    setNow(getParts(timezone));
    setDateStr(
      new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: timezone,
      })
        .format(new Date())
        .replace(/^./, (c) => c.toUpperCase())
    );

    const interval = setInterval(() => setNow(getParts(timezone)), 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const hours = now.hours % 12;
  const hourDegrees = hours * 30 + now.minutes * 0.5;
  const minuteDegrees = now.minutes * 6 + now.seconds * 0.1;
  const secondDegrees = now.seconds * 6;

  const tickHours = [1, 2, 4, 5, 7, 8, 10, 11];

  return (
    <section className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-6 md:p-10">
      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64 md:w-72 md:h-72">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-blue-100 border-8 border-blue-900 shadow-inner" />

          {tickHours.map((hour) => (
            <div
              key={hour}
              className="absolute inset-0"
              style={{ transform: `rotate(${hour * 30}deg)` }}
            >
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blue-400 rounded-full" />
            </div>
          ))}

          <span className="absolute top-7 left-1/2 -translate-x-1/2 font-black text-blue-900">
            12
          </span>
          <span className="absolute right-7 top-1/2 -translate-y-1/2 font-black text-blue-900">
            3
          </span>
          <span className="absolute bottom-7 left-1/2 -translate-x-1/2 font-black text-blue-900">
            6
          </span>
          <span className="absolute left-7 top-1/2 -translate-y-1/2 font-black text-blue-900">
            9
          </span>

          <div
            className="absolute left-1/2 top-1/2 w-2 h-16 bg-blue-900 rounded-full"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
              transformOrigin: "50% 100%",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-1.5 h-24 bg-blue-700 rounded-full"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
              transformOrigin: "50% 100%",
            }}
          />
          <div
            className="absolute left-1/2 top-1/2 w-0.5 h-28 bg-red-500 rounded-full"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
              transformOrigin: "50% 100%",
              transition: "transform 0.95s linear",
            }}
          />
          <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900 ring-2 ring-white" />
        </div>

        <p className="mt-8 font-oswald text-4xl md:text-5xl font-bold text-blue-900 tabular-nums tracking-wider">
          {pad(now.hours)}:{pad(now.minutes)}:{pad(now.seconds)}
        </p>
        <p className="mt-1 text-blue-900/80 font-bold">{dateStr}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {timezones.map((tz) => (
            <button
              key={tz.value}
              onClick={() => setTimezone(tz.value)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border ${
                timezone === tz.value
                  ? "bg-blue-800 text-white border-blue-800 shadow-md"
                  : "bg-white text-blue-900/80 border-blue-900/10 hover:bg-blue-50 hover:border-blue-800/40"
              }`}
            >
              {tz.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Watch;