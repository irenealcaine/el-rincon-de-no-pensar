import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4 md:p-8">
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? "border-blue-200 bg-blue-50/60 shadow-sm"
                  : "border-blue-900/10 bg-white hover:border-blue-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-bold text-blue-900">{faq.question}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-800/10 text-blue-800 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <FiChevronDown className="h-5 w-5" />
                </span>
              </button>
              <div
                id={`faq-panel-${index}`}
                role="region"
                className={`grid transition-all duration-300 ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-blue-900/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQ;