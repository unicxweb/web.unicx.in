'use client'

import React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variant === "outline" ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground" :
      variant === "ghost" ? "hover:bg-accent hover:text-accent-foreground" :
      variant === "link" ? "text-primary underline-offset-4 hover:underline" :
      variant === "secondary" ? "bg-zinc-800 text-white hover:bg-zinc-700" :
      "bg-primary text-primary-foreground hover:bg-primary/90",
      size === "sm" ? "h-9 px-3" : size === "lg" ? "h-11 px-8" : size === "icon" ? "h-10 w-10" : "h-10 px-4 py-2",
      className
    )} {...props} />
  )
);
Button.displayName = "Button";

export interface ArticleItem {
  title: string
  subTitle: string
  img: string
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

interface StackedArticleCardsProps {
  items: ArticleItem[]
  className?: string
}

export default function StackedArticleCards({
  items,
  className,
}: StackedArticleCardsProps) {
  const [isActive, setIsActive] = useState(false)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleExpand = () => {
    setIsActive(true)
  }

  const handleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsActive(false)
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  // Calculate dynamic container height based on the number of items when expanded
  // and keep a stable 350px height when collapsed to prevent layout shifts.
  const containerHeight = isActive
    ? `calc(1.5rem + ${items.length} * 128px + 48px)`
    : "350px";

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full max-w-md mx-auto transition-all duration-700 ease-[cubic-bezier(0.075,0.82,0.165,1)]', className)}
      style={{ height: containerHeight }}
      onClick={handleExpand}
    >
      {items.map((item, index) => {
        const topOffset = isActive
          ? `calc(1.5rem + ${index} * 128px)`
          : `calc(1.5rem + ${index} * 40px)`;

        const styleIndex = index % 3;
        const cardStyle = styleIndex === 0
          ? {
              bg: 'bg-gradient-to-br from-[#fd5200] to-[#d64100] border-orange-400/20 shadow-orange-500/10 hover:from-[#ff621a] hover:to-[#e64700] hover:border-orange-300/30',
              text: 'text-orange-100/90'
            }
          : styleIndex === 1
          ? {
              bg: 'bg-gradient-to-br from-[#1A3DE8] to-[#122bb3] border-blue-400/20 shadow-blue-500/10 hover:from-[#2e4ef2] hover:to-[#1532cc] hover:border-blue-300/30',
              text: 'text-blue-100/90'
            }
          : {
              bg: 'bg-gradient-to-br from-[#0a0a0a] to-[#000000] border-zinc-800/50 shadow-black/80 hover:from-[#141414] hover:to-[#050505] hover:border-zinc-700/50',
              text: 'text-zinc-400'
            };

        return (
          <div
            key={index}
            className={cn(
              'absolute left-0 right-0 flex h-28 cursor-pointer items-center gap-4 rounded-none border p-5 shadow-2xl backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.075,0.82,0.165,1)]',
              cardStyle.bg,
              isActive ? 'pointer-events-auto' : 'pointer-events-none'
            )}
            style={{ 
              top: topOffset,
              zIndex: 10 + index
            }}
            onClick={(e) => {
              if (isActive && item.onClick) {
                item.onClick(e);
              }
            }}
          >
            <div className='size-16 shrink-0 overflow-hidden rounded-none ring-2 ring-white/10'>
              <img
                src={item.img}
                alt={item.title}
                className='h-full w-full object-cover transition-transform duration-500 hover:scale-110'
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className='min-w-0 flex-1'>
              <p className='text-white mb-1 truncate text-base font-semibold'>
                {item.title}
              </p>
              <p className={cn('line-clamp-2 text-xs leading-relaxed', cardStyle.text)}>
                {item.subTitle}
              </p>
            </div>
          </div>
        )
      })}

      {/* Show less toggle */}
      <div
        className={cn(
          'absolute right-0 transition-all duration-300 ease-in-out z-50',
          isActive
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        )}
        style={{
          top: `calc(1.5rem + ${items.length} * 128px)`
        }}
        onClick={handleCollapse}
      >
        <Button variant='secondary' size='sm' className="gap-1.5 inline-flex items-center">
          <span>Collapse Deck</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </Button>
      </div>
    </div>
  )
}
