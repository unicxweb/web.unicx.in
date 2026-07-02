"use client";

import React, { useState, useEffect } from "react";
import { codeToHtml } from "shiki";
import { transformerNotationDiff, transformerNotationHighlight } from "@shikijs/transformers";
import { cn } from "@/lib/utils";

export interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language: string;
  filename?: string;
  lightTheme?: string;
  darkTheme?: string;
  highlightColor?: string;
}

export function CodeComparison({
  beforeCode,
  afterCode,
  language,
  filename = "code",
  lightTheme = "github-light",
  darkTheme = "github-dark",
  highlightColor = "rgba(101, 117, 133, 0.16)",
}: CodeComparisonProps) {
  const [beforeCodeVal, setBeforeCodeVal] = useState<string>(beforeCode);
  const [afterCodeVal, setAfterCodeVal] = useState<string>(afterCode);
  const [beforeHtml, setBeforeHtml] = useState<string>("");
  const [afterHtml, setAfterHtml] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [sandboxMode, setSandboxMode] = useState<boolean>(false);

  // Sync with incoming props when the sub-service changes
  useEffect(() => {
    setBeforeCodeVal(beforeCode);
    setAfterCodeVal(afterCode);
  }, [beforeCode, afterCode]);

  // Debounced Syntax Highlighting using Shiki
  useEffect(() => {
    let isMounted = true;
    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const before = await codeToHtml(beforeCodeVal, {
          lang: language,
          theme: darkTheme,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
          ],
        });
        const after = await codeToHtml(afterCodeVal, {
          lang: language,
          theme: darkTheme,
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
          ],
        });
        if (isMounted) {
          setBeforeHtml(before);
          setAfterHtml(after);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounce);
    };
  }, [beforeCodeVal, afterCodeVal, language, darkTheme]);

  const handleReset = () => {
    setBeforeCodeVal(beforeCode);
    setAfterCodeVal(afterCode);
  };

  const isDirty = beforeCodeVal !== beforeCode || afterCodeVal !== afterCode;
  const beforeLines = beforeCodeVal.split("\n");
  const afterLines = afterCodeVal.split("\n");

  return (
    <div className="w-full border border-white/10 rounded-xl bg-[#0d1117] overflow-hidden text-sm font-mono shadow-2xl relative">
      {/* Styles for Shiki diffs and line highlights */}
      <style jsx global>{`
        .shiki-code-block pre {
          margin: 0 !important;
          padding: 0 !important;
          background-color: transparent !important;
          overflow-x: auto;
        }
        .shiki-code-block code {
          display: grid;
          min-width: 100%;
        }
        .shiki-code-block .line {
          display: inline-block;
          width: 100%;
          padding: 0 4px;
        }
        .shiki-code-block .line.diff.remove {
          background-color: rgba(239, 68, 68, 0.15) !important;
          text-decoration: line-through;
          text-decoration-color: rgba(239, 68, 68, 0.4);
          opacity: 0.7;
        }
        .shiki-code-block .line.diff.add {
          background-color: rgba(16, 185, 129, 0.15) !important;
          border-left: 2px solid #10b981;
        }
        .shiki-code-block .line.highlighted {
          background-color: ${highlightColor} !important;
        }
      `}</style>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 gap-3 border-b border-white/10 bg-[#161b22] text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </span>
          <span className="ml-2 text-slate-300 font-medium font-sans flex items-center gap-2">
            {filename}
            {isDirty && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 font-sans w-full sm:w-auto justify-between sm:justify-end">
          {isDirty && (
            <button
              onClick={handleReset}
              className="text-[10px] uppercase font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Reset Snippet
            </button>
          )}
          <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/10">
            <button
              onClick={() => setSandboxMode(true)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all duration-200",
                sandboxMode ? "bg-indigo-600/85 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Sandbox
            </button>
            <button
              onClick={() => setSandboxMode(false)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all duration-200",
                !sandboxMode ? "bg-indigo-600/85 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Preview
            </button>
          </div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold bg-white/5 px-2 py-0.5 rounded">
            {language}
          </div>
        </div>
      </div>

      {/* Split view panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10 relative min-h-[400px]">
        {loading && !sandboxMode && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0d1117]/90 backdrop-blur-sm z-10 transition-opacity duration-300">
            <div className="flex items-center gap-3 text-indigo-400 text-xs tracking-wider uppercase font-semibold font-sans">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Parsing code edits...
            </div>
          </div>
        )}

        {/* Before Block */}
        <div className="p-5 overflow-y-auto bg-[#0d1117] flex flex-col h-[480px]">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="text-[10px] uppercase font-sans tracking-widest text-red-400 font-bold bg-red-500/10 w-fit px-2 py-1 rounded border border-red-500/20">
              Legacy Solution
            </div>
            {sandboxMode && (
              <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider font-sans">
                Editable Code
              </span>
            )}
          </div>
          <div className="flex-1 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto">
            {sandboxMode ? (
              <div className="flex min-h-full">
                <div className="flex flex-col text-right text-slate-600 select-none pr-3 border-r border-white/5 mr-3 w-8 pt-0.5">
                  {beforeLines.map((_, i) => (
                    <span key={i} className="leading-normal h-6 block">{i + 1}</span>
                  ))}
                </div>
                <textarea
                  value={beforeCodeVal}
                  onChange={(e) => setBeforeCodeVal(e.target.value)}
                  className="flex-1 bg-transparent border-0 p-0 m-0 outline-none resize-none text-slate-300 font-mono text-xs sm:text-sm leading-normal focus:ring-0 focus:outline-none min-h-full overflow-y-hidden"
                  style={{ height: `${Math.max(beforeLines.length * 24, 300)}px` }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            ) : (
              <div className="shiki-code-block w-full">
                {beforeHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />
                ) : (
                  <pre className="text-slate-500"><code>{beforeCodeVal}</code></pre>
                )}
              </div>
            )}
          </div>
        </div>

        {/* After Block */}
        <div className="p-5 overflow-y-auto bg-[#0d1117] flex flex-col h-[480px]">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="text-[10px] uppercase font-sans tracking-widest text-emerald-400 font-bold bg-emerald-500/10 w-fit px-2 py-1 rounded border border-emerald-500/20">
              UNICX Standard
            </div>
            {sandboxMode && (
              <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider font-sans">
                Editable Code
              </span>
            )}
          </div>
          <div className="flex-1 font-mono text-xs sm:text-sm leading-relaxed overflow-y-auto">
            {sandboxMode ? (
              <div className="flex min-h-full">
                <div className="flex flex-col text-right text-slate-600 select-none pr-3 border-r border-white/5 mr-3 w-8 pt-0.5">
                  {afterLines.map((_, i) => (
                    <span key={i} className="leading-normal h-6 block">{i + 1}</span>
                  ))}
                </div>
                <textarea
                  value={afterCodeVal}
                  onChange={(e) => setAfterCodeVal(e.target.value)}
                  className="flex-1 bg-transparent border-0 p-0 m-0 outline-none resize-none text-slate-300 font-mono text-xs sm:text-sm leading-normal focus:ring-0 focus:outline-none min-h-full overflow-y-hidden"
                  style={{ height: `${Math.max(afterLines.length * 24, 300)}px` }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
              </div>
            ) : (
              <div className="shiki-code-block w-full">
                {afterHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
                ) : (
                  <pre className="text-slate-500"><code>{afterCodeVal}</code></pre>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Info Tip */}
      {sandboxMode && (
        <div className="px-4 py-2 bg-[#161b22] border-t border-white/10 text-[10px] text-slate-500 text-center font-sans tracking-wide">
          You are inside the live Interactive Sandbox. Edit any code block and toggle <strong className="text-slate-300">Preview</strong> to see production-ready syntax highlighting.
        </div>
      )}
    </div>
  );
}
