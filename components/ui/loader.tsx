import React from "react";

export function LoaderOne() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center gap-2">
        <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-white" />
      </div>
    </div>
  );
}
