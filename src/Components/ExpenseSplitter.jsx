import React, { useState, useEffect, useMemo } from "react";
import Toast from "./Toast";
import Switch from "./Switch";
import Dropdown from "./Dropdown";
import useToast from "../Hooks/useToast";
import {
  FiArrowRight,
  FiDivide,
  FiPlus,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

const STORAGE_KEY = "expenseSplitter";

const money = (n) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(
    n
  );

const loadState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const ExpenseSplitter = () => {
  const initial = loadState();
  const [participants, setParticipants] = useState(initial?.participants ?? []);
  const [expenses, setExpenses] = useState(initial?.expenses ?? []);
  const [newName, setNewName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [payer, setPayer] = useState("");
  const [splitAll, setSplitAll] = useState(true);
  const [splitAmong, setSplitAmong] = useState([]);
  const { toasts, showToast, dismiss } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ participants, expenses })
      );
    } catch {
      // localStorage no disponible (modo privado, etc.)
    }
  }, [participants, expenses]);

  const addParticipant = () => {
    const name = newName.trim();
    if (!name) return;
    if (participants.includes(name)) {
      showToast("Ese nombre ya está en el grupo", "error");
      return;
    }
    setParticipants((prev) => [...prev, name]);
    setNewName("");
    showToast(`${name} se unió al grupo`, "success");
  };

  const removeParticipant = (name) => {
    const used = expenses.some(
      (e) => e.payer === name || e.splitBetween.includes(name)
    );
    if (used) {
      showToast("No se puede eliminar: aparece en algún gasto", "error");
      return;
    }
    setParticipants((prev) => prev.filter((p) => p !== name));
    setSplitAmong((prev) => prev.filter((p) => p !== name));
  };

  const toggleSplitAmong = (name) => {
    setSplitAmong((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const addExpense = () => {
    const amountNum = parseFloat(amount);
    if (!desc.trim() || !amountNum || amountNum <= 0) {
      showToast("Rellena la descripción y un importe válido", "error");
      return;
    }
    if (!payer) {
      showToast("Elige quién ha pagado", "error");
      return;
    }
    const split = splitAll ? participants : splitAmong;
    if (split.length === 0) {
      showToast("Selecciona con quién repartir el gasto", "error");
      return;
    }
    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        description: desc.trim(),
        amount: amountNum,
        payer,
        splitBetween: split,
      },
    ]);
    setDesc("");
    setAmount("");
    setSplitAll(true);
    setSplitAmong([]);
    showToast("Gasto añadido", "success");
  };

  const removeExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const reset = () => {
    setParticipants([]);
    setExpenses([]);
    setNewName("");
    setDesc("");
    setAmount("");
    setPayer("");
    setSplitAll(true);
    setSplitAmong([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage no disponible
    }
    showToast("Grupo reiniciado", "info");
  };

  const balances = useMemo(() => {
    const bal = {};
    participants.forEach((p) => (bal[p] = 0));
    expenses.forEach((exp) => {
      bal[exp.payer] += exp.amount;
      const per = exp.amount / exp.splitBetween.length;
      exp.splitBetween.forEach((p) => {
        bal[p] -= per;
      });
    });
    return bal;
  }, [participants, expenses]);

  const transfers = useMemo(() => {
    const debtors = participants
      .filter((p) => balances[p] < -0.005)
      .map((p) => ({ name: p, amount: -balances[p] }))
      .sort((a, b) => b.amount - a.amount);
    const creditors = participants
      .filter((p) => balances[p] > 0.005)
      .map((p) => ({ name: p, amount: balances[p] }))
      .sort((a, b) => b.amount - a.amount);

    const result = [];
    let i = 0;
    let j = 0;
    while (i < debtors.length && j < creditors.length) {
      const amount = Math.min(debtors[i].amount, creditors[j].amount);
      if (amount > 0.005) {
        result.push({
          from: debtors[i].name,
          to: creditors[j].name,
          amount: Math.round(amount * 100) / 100,
        });
      }
      debtors[i].amount -= amount;
      creditors[j].amount -= amount;
      if (debtors[i].amount <= 0.005) i++;
      if (creditors[j].amount <= 0.005) j++;
    }
    return result;
  }, [participants, balances]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const inputClass =
    "w-full rounded-xl border border-blue-900/10 bg-blue-50/50 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/40 text-blue-900";

  return (
    <div className="pb-16 space-y-8">
      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between gap-3 mb-5">
          <h2 className="inline-flex items-center gap-2 text-xl font-black text-blue-900">
            <FiUsers />
            Participantes
          </h2>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-white/70 px-4 py-2 text-sm font-bold text-blue-900 transition hover:bg-white"
          >
            <FiTrash2 />
            Reiniciar
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addParticipant()}
            placeholder="Nombre..."
            className={inputClass}
          />
          <button
            onClick={addParticipant}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-800 px-5 py-2.5 font-bold text-white transition hover:bg-blue-900 active:scale-95"
          >
            <FiPlus />
            Añadir
          </button>
        </div>

        {participants.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {participants.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-1.5 rounded-full border border-blue-900/10 bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-900"
              >
                {name}
                <button
                  onClick={() => removeParticipant(name)}
                  aria-label={`Quitar a ${name}`}
                  className="rounded-full p-0.5 text-blue-900/60 transition hover:bg-red-100 hover:text-red-700"
                >
                  <FiTrash2 className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </section>

      {participants.length > 0 && (
        <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
          <h2 className="inline-flex items-center gap-2 text-xl font-black text-blue-900 mb-5">
            <FiDivide />
            Añadir gasto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label
                htmlFor="expense-desc"
                className="mb-1 block text-sm font-bold text-blue-900/80"
              >
                Descripción
              </label>
              <input
                id="expense-desc"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Cena, taxi, entrada..."
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="expense-amount"
                className="mb-1 block text-sm font-bold text-blue-900/80"
              >
                Importe (€)
              </label>
              <input
                id="expense-amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className={inputClass}
              />
            </div>
            <div>
              <Dropdown
                label="Pagó"
                value={payer}
                options={participants.map((p) => ({ label: p, value: p }))}
                onChange={setPayer}
                placeholder="Elige quién pagó..."
              />
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-blue-900/10 bg-blue-50/40 p-4">
            <Switch
              checked={splitAll}
              onChange={setSplitAll}
              label="Repartir entre todos"
            />

            {!splitAll && (
              <div className="mt-3 flex flex-wrap gap-2">
                {participants.map((name) => {
                  const checked = splitAmong.includes(name);
                  return (
                    <button
                      key={name}
                      onClick={() => toggleSplitAmong(name)}
                      aria-pressed={checked}
                      className={`rounded-full px-3 py-1.5 text-sm font-bold transition ${
                        checked
                          ? "bg-blue-800 text-white"
                          : "border border-blue-900/10 bg-white text-blue-900/80 hover:bg-white"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            onClick={addExpense}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-blue-800 px-6 py-3 font-bold text-white transition hover:bg-blue-900 active:scale-95"
          >
            <FiPlus />
            Añadir gasto
          </button>
        </section>
      )}

      <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-black text-blue-900 mb-4">
          Gastos ({expenses.length})
        </h2>
        {expenses.length === 0 ? (
          <p className="text-center py-10 text-blue-900/80">
            {participants.length > 0
              ? "Aún no hay gastos. Añade el primero arriba."
              : "Añade participantes para empezar a repartir gastos."}
          </p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="flex items-center gap-3 rounded-2xl border border-blue-900/10 bg-blue-50/40 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-blue-900 break-words">
                    {expense.description}
                  </p>
                  <p className="text-sm font-bold text-blue-900/70">
                    Pagó {expense.payer} · se divide entre{" "}
                    {expense.splitBetween.join(", ")}
                  </p>
                </div>
                <span className="shrink-0 font-mono font-black text-blue-900">
                  {money(expense.amount)}
                </span>
                <button
                  onClick={() => removeExpense(expense.id)}
                  aria-label="Eliminar gasto"
                  className="shrink-0 rounded-full p-2 text-red-700 transition hover:bg-red-50 active:scale-90"
                >
                  <FiTrash2 />
                </button>
              </li>
            ))}
            <li className="flex items-center justify-between rounded-2xl bg-blue-900 px-4 py-3 text-white">
              <span className="font-bold">Total</span>
              <span className="font-mono font-black">{money(total)}</span>
            </li>
          </ul>
        )}
      </section>

      {participants.length > 1 && expenses.length > 0 && (
        <section className="bg-white rounded-3xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
          <h2 className="text-xl font-black text-blue-900 mb-4">Resultados</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {participants.map((name) => {
              const balance = balances[name];
              const isPositive = balance > 0.005;
              const isNegative = balance < -0.005;
              return (
                <div
                  key={name}
                  className="rounded-2xl border border-blue-900/10 bg-blue-50/40 px-4 py-3"
                >
                  <p className="font-bold text-blue-900">{name}</p>
                  <p
                    className={`font-mono font-black ${
                      isPositive
                        ? "text-emerald-700"
                        : isNegative
                        ? "text-red-700"
                        : "text-blue-900/70"
                    }`}
                  >
                    {isPositive
                      ? `Le deben ${money(balance)}`
                      : isNegative
                      ? `Debe ${money(-balance)}`
                      : "A cuentas"}
                  </p>
                </div>
              );
            })}
          </div>

          <h3 className="mb-3 text-lg font-black text-blue-900">
            Cómo saldar cuentas
          </h3>
          {transfers.length === 0 ? (
            <p className="text-blue-900/80 text-center py-6">
              Todo el mundo está a cuentas. ¡Bien por el grupo!
            </p>
          ) : (
            <ul className="space-y-2">
              {transfers.map((transfer, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 rounded-2xl border border-blue-900/10 bg-emerald-50/60 px-4 py-3"
                >
                  <span className="font-bold text-blue-900">
                    {transfer.from}
                  </span>
                  <FiArrowRight className="shrink-0 text-blue-900/60" />
                  <span className="font-bold text-blue-900">
                    {transfer.to}
                  </span>
                  <span className="ml-auto font-mono font-black text-emerald-700">
                    {money(transfer.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  );
};

export default ExpenseSplitter;