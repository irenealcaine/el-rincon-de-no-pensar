import React, { useState, useId } from "react";

const Tabs = ({ tabs, initialTab = 0, className = "" }) => {
  const baseId = useId();
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="Pestañas"
        className="flex flex-wrap gap-2 mb-6 border-b border-blue-900/10 pb-2"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <button
              key={index}
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(index)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                isActive
                  ? "bg-blue-800 text-white shadow-md"
                  : "text-blue-900/80 hover:bg-white hover:text-blue-800 border border-blue-900/10 bg-white/70"
              }`}
            >
              {tab.icon && <span className="text-base">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => {
        if (index !== activeTab) return null;
        return (
          <div
            key={index}
            role="tabpanel"
            id={`${baseId}-panel-${index}`}
            aria-labelledby={`${baseId}-tab-${index}`}
          >
            {tab.content}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;