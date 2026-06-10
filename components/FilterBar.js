"use client";

import {
  CATEGORIES,
  COUNTRIES,
  CATEGORY_COLORS,
  COUNTRY_FLAGS,
  COUNTRY_LABELS,
} from "@/lib/constants";

const selectClass =
  "w-full appearance-none rounded-lg border border-white/10 bg-white/5 bg-[length:12px] bg-[position:right_12px_center] bg-no-repeat py-2.5 pl-3 pr-9 font-mono text-xs text-white outline-none transition-colors focus:border-white/30 focus:bg-white/10";

function FilterSelect({ label, value, onChange, children }) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
        {label}
      </span>
      <select
        value={value}
        onChange={onChange}
        className={selectClass}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23ffffff66' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        }}
      >
        {children}
      </select>
    </label>
  );
}

export default function FilterBar({
  activeCategory,
  activeCountry,
  onCategoryChange,
  onCountryChange,
}) {
  return (
    <div className="sticky top-0 z-30 overflow-x-hidden border-b border-white/10 bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl overflow-x-hidden px-4 py-3 sm:px-6">
        {/* Mobile: compact dropdowns */}
        <div className="flex gap-3 md:hidden">
          <FilterSelect
            label="Category"
            value={activeCategory ?? ""}
            onChange={(e) =>
              onCategoryChange(e.target.value === "" ? null : e.target.value)
            }
          >
            <option value="">All categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_COLORS[cat].label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Country"
            value={activeCountry ?? ""}
            onChange={(e) =>
              onCountryChange(e.target.value === "" ? null : e.target.value)
            }
          >
            <option value="">All countries</option>
            {COUNTRIES.map((code) => (
              <option key={code} value={code}>
                {COUNTRY_FLAGS[code]} {COUNTRY_LABELS[code]}
              </option>
            ))}
          </FilterSelect>
        </div>

        {/* Desktop: pill buttons */}
        <div className="hidden flex-col gap-3 md:flex md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-white/40">
              Category
            </span>
            <button
              onClick={() => onCategoryChange(null)}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                activeCategory === null
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => {
              const colors = CATEGORY_COLORS[cat];
              return (
                <button
                  key={cat}
                  onClick={() =>
                    onCategoryChange(activeCategory === cat ? null : cat)
                  }
                  className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                    activeCategory === cat
                      ? `${colors.bg} ${colors.border} ${colors.text}`
                      : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
                  }`}
                >
                  {colors.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-white/40">
              Country
            </span>
            <button
              onClick={() => onCountryChange(null)}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                activeCountry === null
                  ? "bg-white/15 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              All
            </button>
            {COUNTRIES.map((code) => (
              <button
                key={code}
                onClick={() =>
                  onCountryChange(activeCountry === code ? null : code)
                }
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                  activeCountry === code
                    ? "border-white/30 bg-white/10 text-white"
                    : "border-white/10 text-white/50 hover:border-white/25 hover:text-white/80"
                }`}
                title={code}
              >
                {COUNTRY_FLAGS[code]} {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
