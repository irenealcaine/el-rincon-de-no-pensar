import React, { useState, useEffect } from "react";
import Toast from "./Toast";
import Switch from "./Switch";
import useToast from "../Hooks/useToast";
import {
  FiBookmark,
  FiCopy,
  FiRefreshCw,
  FiTrash2,
} from "react-icons/fi";

const STORAGE_KEY = "colorPalettes";

const randomHex = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const readableColor = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 150 ? "#1e293b" : "#ffffff";
};

const loadSaved = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const ColorPalette = () => {
  const [colorCount, setColorCount] = useState(5);
  const [colors, setColors] = useState(() =>
    Array.from({ length: 5 }, randomHex)
  );
  const [savedPalettes, setSavedPalettes] = useState(loadSaved);
  const [showRgb, setShowRgb] = useState(false);
  const { toasts, showToast, dismiss } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes));
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [savedPalettes]);

  const generatePalette = () => {
    setColors(Array.from({ length: colorCount }, randomHex));
    showToast("Paleta generada", "success");
  };

  const regenerateColor = (index) => {
    setColors((prev) => prev.map((c, i) => (i === index ? randomHex() : c)));
  };

  const handleCountChange = (count) => {
    setColorCount(count);
    setColors((prev) =>
      Array.from({ length: count }, (_, i) => prev[i] ?? randomHex())
    );
  };

  const savePalette = () => {
    setSavedPalettes((prev) => [{ id: Date.now(), colors: [...colors] }, ...prev]);
    showToast("Paleta guardada", "success");
  };

  const deletePalette = (id) => {
    setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
    showToast("Paleta eliminada", "info");
  };

  const copyText = (text, label) => {
    const onCopied = () => showToast(`${label} copiado`, "success");
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        onCopied,
        () => showToast("No se pudo copiar", "error")
      );
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        onCopied();
      } catch {
        showToast("No se pudo copiar", "error");
      }
      document.body.removeChild(textarea);
    }
  };

  const copyButton =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold font-mono transition hover:bg-white/20 active:scale-95";

  return (
    <div className="pb-16 space-y-8">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-black text-blue-900">
              ¿Cuántos colores?
            </h2>
            <p className="text-sm text-blue-900/80">
              Elige de 1 a 5 y genera tu paleta.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => handleCountChange(n)}
                aria-pressed={colorCount === n}
                className={`h-10 w-10 rounded-full font-bold transition-all duration-200 ${
                  colorCount === n
                    ? "bg-blue-800 text-white shadow-md scale-105"
                    : "bg-white/70 text-blue-900/80 border border-blue-900/10 hover:bg-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={generatePalette}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 text-white font-bold px-6 py-3 hover:bg-blue-900 transition active:scale-95"
          >
            <FiRefreshCw className="transition-transform duration-500 hover:rotate-180" />
            Generar paleta
          </button>
          <button
            onClick={savePalette}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-900/10 bg-white/70 text-blue-900 font-bold px-6 py-3 hover:bg-white transition active:scale-95"
          >
            <FiBookmark />
            Guardar paleta
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-2xl border border-blue-900/10 bg-blue-50/40 px-4 py-3">
          <Switch
            checked={showRgb}
            onChange={setShowRgb}
            label={showRgb ? "Códigos en RGB" : "Códigos en HEX"}
            className="w-full justify-between"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {colors.map((color, index) => {
            const textColor = readableColor(color);
            const rgb = hexToRgb(color);
            return (
              <div
                key={index}
                className="flex h-44 md:h-52 min-w-[9rem] flex-1 flex-col justify-between rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-1"
                style={{ backgroundColor: color, color: textColor }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                    {index + 1}
                  </span>
                  <button
                    onClick={() => regenerateColor(index)}
                    aria-label={`Regenerar color ${index + 1}`}
                    className="rounded-full p-2 transition hover:bg-white/20 active:scale-90"
                  >
                    <FiRefreshCw />
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() =>
                      copyText(
                        showRgb
                          ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                          : color,
                        showRgb ? "Código RGB" : "Código HEX"
                      )
                    }
                    className={`${copyButton} bg-black/10 backdrop-blur-sm`}
                  >
                    <FiCopy />
                    {showRgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8">
        <h2 className="text-xl font-black text-blue-900 mb-4">
          Paletas guardadas
        </h2>
        {savedPalettes.length === 0 ? (
          <p className="text-blue-900/80 text-center py-10">
            Aún no has guardado ninguna paleta. Genera una y pulsa "Guardar
            paleta".
          </p>
        ) : (
          <ul className="space-y-3">
            {savedPalettes.map((palette) => (
              <li
                key={palette.id}
                className="flex items-center gap-3 rounded-2xl border border-blue-900/10 bg-blue-50/40 p-3"
              >
                <div className="flex flex-1 min-w-0 flex-wrap gap-1.5">
                  {palette.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => copyText(c, "Código HEX")}
                      title={c}
                      aria-label={`Copiar ${c}`}
                      className="h-10 w-10 shrink-0 rounded-lg border border-black/10 transition hover:scale-110"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => deletePalette(palette.id)}
                  aria-label="Eliminar paleta"
                  className="shrink-0 rounded-full p-2 text-red-700 hover:bg-red-50 transition active:scale-90"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};

export default ColorPalette;