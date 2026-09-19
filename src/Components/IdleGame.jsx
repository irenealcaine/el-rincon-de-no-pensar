import React, { useState, useEffect } from "react";

const formatNumber = (n) => {
  if (n >= 1e21) return n.toExponential(4) + "G";
  if (n >= 1e9) return (n / 1e9).toFixed(1) + "G";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(4).replace(/\.?0+$/, "");
};

const PurchaseItem = ({ title, level, cost, onBuy, disabled, children }) => (
  <div className="rounded-2xl bg-blue-50/60 border border-blue-900/10 p-4">
    <div className="flex items-center justify-between gap-2 mb-1">
      <p className="font-black text-blue-900">{title}</p>
      <span className="px-2.5 py-1 rounded-full bg-white border border-blue-900/10 text-xs font-bold text-blue-900">
        Nv. {level}
      </span>
    </div>
    <div className="mb-3">{children}</div>
    <button
      onClick={onBuy}
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-2.5 font-bold transition active:scale-95 ${
        disabled
          ? "bg-blue-100 text-blue-900/40 cursor-not-allowed"
          : "bg-blue-800 text-white hover:bg-blue-900"
      }`}
    >
      {disabled
        ? `Necesitas ${formatNumber(cost)} puntos`
        : `Comprar · ${formatNumber(cost)} puntos`}
    </button>
  </div>
);

const IdleGame = () => {
  const [score, setScore] = useState(0);
  const [base, setBase] = useState({ level: 0, cost: 100 });
  const [bonus1, setBonus1] = useState({ level: 0, cost: 15, base: 15 });
  const [bonus2, setBonus2] = useState({ level: 0, cost: 100, base: 100 });
  const [bonus3, setBonus3] = useState({ level: 0, cost: 1000, base: 1000 });
  const [upgrade1, setUpgrade1] = useState({
    level: 0,
    cost: 1000,
    base: 1000,
  });
  const [upgrade2, setUpgrade2] = useState({
    level: 0,
    cost: 5000,
    base: 5000,
  });
  const [upgrade3, setUpgrade3] = useState({
    level: 0,
    cost: 10000,
    base: 10000,
  });
  const [floaties, setFloaties] = useState([]);

  const passivePerSecond = () =>
    2 ** upgrade1.level * bonus1.level * 0.1 +
    2 ** upgrade2.level * bonus2.level * 1 +
    2 ** upgrade3.level * bonus3.level * 8;

  const handleClick = () => {
    const gain = 2 ** base.level;
    setScore((prevScore) => prevScore + gain);

    const id = `${Date.now()}-${Math.random()}`;
    setFloaties((prev) => [...prev.slice(-5), { id, value: gain }]);
    setTimeout(() => {
      setFloaties((prev) => prev.filter((floaty) => floaty.id !== id));
    }, 700);
  };

  const handleReset = () => {
    setScore(0);
    setBonus1({ level: 0, cost: 15, base: 15 });
    setBonus2({ level: 0, cost: 100, base: 100 });
    setBonus3({ level: 0, cost: 1000, base: 1000 });
    setUpgrade1({ level: 0, cost: 1000, base: 1000 });
    setUpgrade2({ level: 0, cost: 5000, base: 5000 });
    setUpgrade3({ level: 0, cost: 10000, base: 10000 });
    setBase({ level: 0, cost: 100 });
    setFloaties([]);
  };

  useEffect(() => {
    const bonusInterval = setInterval(() => {
      setScore((prevScore) => prevScore + passivePerSecond() / 10);
    }, 100);

    return () => {
      clearInterval(bonusInterval);
    };
  }, [
    bonus1.level,
    bonus2.level,
    bonus3.level,
    upgrade1.level,
    upgrade2.level,
    upgrade3.level,
  ]);

  const handleBuy = (setItem, cost) => {
    if (score < cost) return;
    setScore((prevScore) => prevScore - cost);
    setItem((prev) => ({
      ...prev,
      level: prev.level + 1,
      cost: prev.base * Math.E ** ((prev.level + 1) * 0.14),
    }));
  };

  const handleBuyBase = () => {
    if (score < base.cost) return;
    setScore((prevScore) => prevScore - base.cost);
    setBase((prevBase) => ({
      ...prevBase,
      level: prevBase.level + 1,
      cost: prevBase.cost ** 1.2,
    }));
  };

  const isDisabled = (cost) => score < cost;

  const baseNext = 2 ** (base.level + 1);
  const upgrade1Next = 2 ** (upgrade1.level + 1) * bonus1.level * 0.1;
  const upgrade2Next = 2 ** (upgrade2.level + 1) * bonus2.level * 1;
  const upgrade3Next = 2 ** (upgrade3.level + 1) * bonus3.level * 8;

  return (
    <div className="pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8 flex flex-col items-center">
        <p className="text-sm font-bold text-blue-900/50 uppercase tracking-wider">
          Puntuación
        </p>
        <p className="font-mono text-5xl md:text-6xl font-bold text-blue-900 tabular-nums mt-1">
          {formatNumber(score)}
        </p>
        <p className="mt-1 text-sm font-bold text-emerald-600">
          +{formatNumber(passivePerSecond())} puntos/s
        </p>

        <div className="relative mt-8">
          <button
            onClick={handleClick}
            className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white font-black text-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition active:scale-90"
          >
            ¡CLIC!
          </button>
          {floaties.map((floaty) => (
            <span
              key={floaty.id}
              className="floaty absolute left-1/2 bottom-full mb-3 text-emerald-600 font-black text-xl pointer-events-none"
            >
              +{formatNumber(floaty.value)}
            </span>
          ))}
        </div>

        <p className="mt-6 text-sm font-bold text-blue-900/60">
          +{formatNumber(2 ** base.level)} puntos por clic
        </p>

        <div className="mt-4 w-full">
          <button
            onClick={handleBuyBase}
            disabled={isDisabled(base.cost)}
            className={`w-full rounded-xl px-4 py-2.5 font-bold transition active:scale-95 ${
              isDisabled(base.cost)
                ? "bg-blue-100 text-blue-900/40 cursor-not-allowed"
                : "bg-blue-800 text-white hover:bg-blue-900"
            }`}
          >
            {isDisabled(base.cost)
              ? `Mejorar clic (necesitas ${formatNumber(base.cost)})`
              : `Mejorar clic · ${formatNumber(base.cost)} → +${formatNumber(
                  baseNext
                )} por clic`}
          </button>
        </div>
      </section>

      <div className="flex flex-col gap-6">
        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="font-black text-blue-900 mb-4">Bonos (ganancia pasiva)</h2>
          <div className="grid gap-4">
            <PurchaseItem
              title="Bono 1"
              level={bonus1.level}
              cost={bonus1.cost}
              onBuy={() => handleBuy(setBonus1, bonus1.cost)}
              disabled={isDisabled(bonus1.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Ganas{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade1.level * bonus1.level * 0.1)}
                </span>{" "}
                puntos/s. Próximo nivel:{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(
                    2 ** upgrade1.level * (bonus1.level + 1) * 0.1
                  )}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>

            <PurchaseItem
              title="Bono 2"
              level={bonus2.level}
              cost={bonus2.cost}
              onBuy={() => handleBuy(setBonus2, bonus2.cost)}
              disabled={isDisabled(bonus2.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Ganas{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade2.level * bonus2.level * 1)}
                </span>{" "}
                puntos/s. Próximo nivel:{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(
                    2 ** upgrade2.level * (bonus2.level + 1) * 1
                  )}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>

            <PurchaseItem
              title="Bono 3"
              level={bonus3.level}
              cost={bonus3.cost}
              onBuy={() => handleBuy(setBonus3, bonus3.cost)}
              disabled={isDisabled(bonus3.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Ganas{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade3.level * bonus3.level * 8)}
                </span>{" "}
                puntos/s. Próximo nivel:{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(
                    2 ** upgrade3.level * (bonus3.level + 1) * 8
                  )}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="font-black text-blue-900 mb-4">
            Mejoras (duplican bonos)
          </h2>
          <div className="grid gap-4">
            <PurchaseItem
              title="Mejora Bono 1"
              level={upgrade1.level}
              cost={upgrade1.cost}
              onBuy={() => handleBuy(setUpgrade1, upgrade1.cost)}
              disabled={isDisabled(upgrade1.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Duplica el Bono 1:{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade1.level * bonus1.level * 0.1)}
                </span>{" "}
                →{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(upgrade1Next)}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>

            <PurchaseItem
              title="Mejora Bono 2"
              level={upgrade2.level}
              cost={upgrade2.cost}
              onBuy={() => handleBuy(setUpgrade2, upgrade2.cost)}
              disabled={isDisabled(upgrade2.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Duplica el Bono 2:{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade2.level * bonus2.level * 1)}
                </span>{" "}
                →{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(upgrade2Next)}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>

            <PurchaseItem
              title="Mejora Bono 3"
              level={upgrade3.level}
              cost={upgrade3.cost}
              onBuy={() => handleBuy(setUpgrade3, upgrade3.cost)}
              disabled={isDisabled(upgrade3.cost)}
            >
              <p className="text-sm text-blue-900/60">
                Duplica el Bono 3:{" "}
                <span className="font-bold text-emerald-600">
                  {formatNumber(2 ** upgrade3.level * bonus3.level * 8)}
                </span>{" "}
                →{" "}
                <span className="font-bold text-blue-900">
                  {formatNumber(upgrade3Next)}
                </span>{" "}
                puntos/s.
              </p>
            </PurchaseItem>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
          <h2 className="font-black text-blue-900 mb-4">Herramientas</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <button
              onClick={handleReset}
              className="rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2.5 transition active:scale-95"
            >
              Reiniciar
            </button>
            <button
              onClick={() => setScore((prevScore) => prevScore + 100000000)}
              className="rounded-xl bg-violet-500 hover:bg-violet-600 text-white font-bold px-4 py-2.5 transition active:scale-95"
            >
              +100M (truco)
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default IdleGame;