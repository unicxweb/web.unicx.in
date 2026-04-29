import Image from "next/image";

type MediaFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  aspectClassName?: string;
  className?: string;
};

export function MediaFrame({
  src,
  alt,
  label,
  aspectClassName = "aspect-[4/3]",
  className = "",
}: MediaFrameProps) {
  return (
    <div
      className={`soft-border relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] ${aspectClassName} ${className}`}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.04))]">
          <div className="absolute left-6 top-6 h-16 w-16 rounded-full border border-white/10 bg-white/[0.04]" />
          <div className="absolute right-8 top-10 h-24 w-24 rounded-full bg-white/8 blur-2xl" />
          <div className="absolute inset-x-[12%] bottom-[18%] h-20 rounded-[999px] border border-white/10 bg-white/[0.04]" />
          <div className="absolute inset-x-[18%] bottom-[26%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-x-[22%] top-[56%] h-px bg-white/10" />
          <div className="absolute inset-x-[30%] top-[64%] h-px bg-white/10" />
          <div className="absolute inset-x-[38%] top-[72%] h-px bg-white/10" />
          <div className="absolute bottom-6 left-6 text-[10px] font-medium uppercase tracking-[0.34em] text-slate-500">
            Image Placeholder
          </div>
        </div>
      )}

      {label ? (
        <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-white/85 backdrop-blur-md">
          {label}
        </div>
      ) : null}
    </div>
  );
}
