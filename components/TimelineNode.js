"use client";

import { CATEGORY_COLORS, COUNTRY_FLAGS } from "@/lib/constants";

function EventCard({ event, isActive, onClick, colors }) {
  return (
    <button
      onClick={() => onClick(event)}
      className={`group box-border w-full min-w-0 max-w-full cursor-pointer rounded-lg border p-3 text-left transition-all sm:p-4 ${
        isActive
          ? `${colors.border} ${colors.bg} shadow-lg shadow-black/30`
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
      }`}
    >
      <div className="mb-2 flex min-w-0 items-center gap-2">
        <span className="shrink-0 font-mono text-xs text-white/40">
          {event.year}
        </span>
        <span className="shrink-0 text-sm">{COUNTRY_FLAGS[event.country]}</span>
        <span
          className={`ml-auto shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${colors.bg} ${colors.text}`}
        >
          {colors.label}
        </span>
      </div>
      <h3
        className={`font-serif text-sm leading-snug transition-colors sm:text-base ${
          isActive ? "text-white" : "text-white/90 group-hover:text-white"
        }`}
      >
        {event.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40 sm:line-clamp-3">
        {event.shortDescription}
      </p>
    </button>
  );
}

export default function TimelineNode({ event, isActive, onClick, index }) {
  const colors = CATEGORY_COLORS[event.category];
  const isTop = index % 2 === 0;

  return (
    <div className="relative flex w-[min(15rem,calc(100vw-2.5rem))] shrink-0 flex-col items-center px-1 sm:w-72 sm:px-2">
      <div className="flex h-28 w-full items-end justify-center pb-3 sm:h-44 sm:pb-4">
        {isTop && (
          <EventCard
            event={event}
            isActive={isActive}
            onClick={onClick}
            colors={colors}
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          className={`h-4 w-px sm:h-6 ${isTop ? "bg-white/25" : "bg-transparent"}`}
        />
        <button
          onClick={() => onClick(event)}
          className={`h-3.5 w-3.5 rounded-full border-2 transition-all sm:h-4 sm:w-4 ${
            isActive
              ? `${colors.dot} ${colors.border} scale-125 ring-4 ring-white/10`
              : `${colors.dot} ${colors.border} hover:scale-110`
          }`}
          aria-label={`${event.year}: ${event.title}`}
        />
        <span className="mt-1 font-mono text-[10px] text-white/30 sm:mt-1.5 sm:text-xs">
          {event.year}
        </span>
        <div
          className={`mt-1 h-4 w-px sm:mt-1.5 sm:h-6 ${!isTop ? "bg-white/25" : "bg-transparent"}`}
        />
      </div>

      <div className="flex h-28 w-full items-start justify-center pt-3 sm:h-44 sm:pt-4">
        {!isTop && (
          <EventCard
            event={event}
            isActive={isActive}
            onClick={onClick}
            colors={colors}
          />
        )}
      </div>
    </div>
  );
}
