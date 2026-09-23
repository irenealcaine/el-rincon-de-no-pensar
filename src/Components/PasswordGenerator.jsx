import React, { useState, useEffect } from "react";
import Toast from "./Toast";
import useToast from "../Hooks/useToast";
import {
  FiCopy,
  FiEye,
  FiEyeOff,
  FiLock,
  FiRefreshCw,
  FiShield,
} from "react-icons/fi";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?";

const randomInt = (max) => {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  return arr[0] % max;
};

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { toasts, showToast, dismiss } = useToast();

  const pools = [
    {
      key: "upper",
      label: "Mayúsculas (A-Z)",
      checked: includeUpper,
      setter: setIncludeUpper,
      chars: UPPER,
    },
    {
      key: "lower",
      label: "Minúsculas (a-z)",
      checked: includeLower,
      setter: setIncludeLower,
      chars: LOWER,
    },
    {
      key: "numbers",
      label: "Números (0-9)",
      checked: includeNumbers,
      setter: setIncludeNumbers,
      chars: NUMBERS,
    },
    {
      key: "symbols",
      label: "Símbolos (!@#...)",
      checked: includeSymbols,
      setter: setIncludeSymbols,
      chars: SYMBOLS,
    },
  ];

  const poolSize = pools.reduce(
    (sum, p) => sum + (p.checked ? p.chars.length : 0),
    0
  );

  const generate = () => {
    const activePools = pools.filter((p) => p.checked);
    if (activePools.length === 0) {
      showToast("Selecciona al menos un tipo de carácter", "error");
      return;
    }

    const allChars = activePools.map((p) => p.chars).join("");
    const chars = Array.from({ length }, () => allChars[randomInt(allChars.length)]);

    activePools.forEach((p, i) => {
      chars[i] = p.chars[randomInt(p.chars.length)];
    });

    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    setPassword(chars.join(""));
  };

  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  const entropy = length * Math.log2(poolSize || 1);

  const strength =
    entropy >= 85
      ? { label: "Muy fuerte", color: "bg-emerald-500", text: "text-emerald-700", level: 4 }
      : entropy >= 65
      ? { label: "Fuerte", color: "bg-green-500", text: "text-green-700", level: 3 }
      : entropy >= 45
      ? { label: "Media", color: "bg-amber-500", text: "text-amber-700", level: 2 }
      : { label: "Débil", color: "bg-red-500", text: "text-red-700", level: 1 };

  const copyText = (text, label) => {
    const onCopied = () => showToast(`${label} copiada`, "success");
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

  const iconButton =
    "shrink-0 rounded-full p-2.5 text-blue-900/80 transition hover:bg-blue-100 hover:text-blue-800 active:scale-90";

  return (
    <div className="pb-16">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-2xl">
        <div className="flex items-center gap-2 mb-5">
          <FiLock className="text-blue-800" size={20} />
          <h2 className="text-xl font-black text-blue-900">
            Generador de contraseñas
          </h2>
        </div>

        <div className="flex items-center gap-1.5 rounded-2xl border border-blue-900/10 bg-blue-50/50 px-3 py-2">
          <p className="flex-1 min-w-0 break-all py-1 font-mono text-lg md:text-xl font-bold text-blue-900">
            {showPassword ? password : "•".repeat(password.length)}
          </p>
          <button
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            className={iconButton}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          <button
            onClick={generate}
            aria-label="Generar nueva contraseña"
            className={iconButton}
          >
            <FiRefreshCw />
          </button>
          <button
            onClick={() => copyText(password, "Contraseña")}
            aria-label="Copiar contraseña"
            className={iconButton}
          >
            <FiCopy />
          </button>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-900/80">
              <FiShield />
              Nivel de seguridad
            </span>
            <span className={`text-sm font-black ${strength.text}`}>
              {strength.label}
            </span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  level <= strength.level ? strength.color : "bg-blue-900/10"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password-length"
              className="text-sm font-bold text-blue-900/80"
            >
              Longitud
            </label>
            <span className="font-mono font-black text-blue-900">{length}</span>
          </div>
          <input
            id="password-length"
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-800"
          />
          <div className="flex justify-between text-xs font-bold text-blue-900/60">
            <span>4</span>
            <span>32</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {pools.map((p) => (
            <label
              key={p.key}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                p.checked
                  ? "border-blue-200 bg-blue-50/60"
                  : "border-blue-900/10 bg-white hover:bg-blue-50/40"
              }`}
            >
              <input
                type="checkbox"
                checked={p.checked}
                onChange={() => p.setter(!p.checked)}
                className="h-4 w-4 accent-blue-800"
              />
              <span className="text-sm font-bold text-blue-900">{p.label}</span>
            </label>
          ))}
        </div>
      </section>

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};

export default PasswordGenerator;