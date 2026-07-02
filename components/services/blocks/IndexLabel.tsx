import React from "react";

export function IndexLabel({ label }: { label?: string }) {
  if (!label) return null;
  
  const parts = label.split("/");
  const cleanLabel = parts.length === 2 ? parts[1].trim() : label;
  
  return (
    <span className="inline-flex items-center gap-2">
      <span className="section-dot" />
      <span>{cleanLabel}</span>
    </span>
  );
}
