"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SearchResult } from "@/lib/search-service";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SearchResultsProps {
  results: SearchResult[];
  isVisible: boolean;
  onSelect?: (result: SearchResult) => void;
  className?: string;
}

export function SearchResults({ 
  results, 
  isVisible, 
  onSelect, 
  className 
}: SearchResultsProps) {
  if (!isVisible || results.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "absolute top-full left-0 right-0 z-50 mt-3 w-full rounded-xl border border-black/8 bg-white/95 backdrop-blur-sm shadow-2xl",
            className
          )}
        >
          <div className="max-h-72 overflow-y-auto px-1 py-2">
            {results.map((result, index) => (
              <SearchResultItem
                key={result.id}
                result={result}
                index={index}
                onSelect={onSelect}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SearchResultItemProps {
  result: SearchResult;
  index: number;
  onSelect?: (result: SearchResult) => void;
}

function SearchResultItem({ result, index, onSelect }: SearchResultItemProps) {
  const handleClick = () => {
    onSelect?.(result);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.04, 
        duration: 0.25, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group"
    >
      <Link
        href={result.url}
        onClick={handleClick}
        className="flex items-center gap-4 px-4 py-3.5 text-sm text-black hover:bg-gradient-to-r hover:from-black/5 hover:to-black/3 transition-all duration-200 group-hover:px-5"
      >
        <div className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200",
          result.type === 'category' 
            ? "bg-gradient-to-br from-black to-black/80 text-white shadow-md" 
            : "bg-gradient-to-br from-black/8 to-black/5 text-black shadow-sm border border-black/10"
        )}>
          {result.type === 'category' ? (
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v7z"/>
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-black truncate leading-tight">{result.title}</div>
          <div className="text-xs text-black/40 truncate mt-0.5">{result.category}</div>
        </div>

        <div className="flex-shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <svg className="h-4 w-4 text-black/30 transition-colors group-hover:text-black/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
