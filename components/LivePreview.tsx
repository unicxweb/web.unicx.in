import Image from "next/image";

type LivePreviewProps = {
  src: string;
  alt: string;
  label?: string;
  aspectClassName?: string;
  className?: string;
};

export function LivePreview({
  src,
  alt,
  label,
  aspectClassName = "aspect-[16/10]",
  className = "",
}: LivePreviewProps) {
  return (
    <div
      className={`soft-border relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] ${aspectClassName} ${className} group`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 transition-filter duration-500 ease-in-out group-hover:filter-none grayscale">
          <iframe
            src={src}
            className="h-full w-full border-0"
            title={alt}
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      </div>
      
      {label ? (
        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/85 backdrop-blur-md transition-all duration-500 group-hover:bg-black/50 pointer-events-none">
          {label}
        </div>
      ) : null}
      
      <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.34em] text-slate-500 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none">
        Live Preview
      </div>
    </div>
  );
}
