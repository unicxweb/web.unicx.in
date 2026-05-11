"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DockProps {
  children: React.ReactNode
  className?: string
  iconMagnification?: number
  iconDistance?: number
  direction?: "horizontal" | "vertical"
}

interface DockIconProps {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
  mousePosition?: { x: number; y: number }
  index?: number
}

const DockContext = React.createContext<{
  iconMagnification: number
  iconDistance: number
  direction: "horizontal" | "vertical"
}>({
  iconMagnification: 60,
  iconDistance: 100,
  direction: "horizontal"
})

export function Dock({
  children,
  className,
  iconMagnification = 60,
  iconDistance = 100,
  direction = "horizontal"
}: DockProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const dockRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return
    
    const rect = dockRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setMousePosition({ x: 0, y: 0 })
  }, [])

  return (
    <DockContext.Provider value={{ iconMagnification, iconDistance, direction }}>
      <div
        ref={dockRef}
        className={cn(
          "flex items-center gap-2",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === DockIcon) {
            return React.cloneElement(child as React.ReactElement<DockIconProps>, {
              mousePosition,
              index
            })
          }
          return child
        })}
      </div>
    </DockContext.Provider>
  )
}

export function DockIcon({
  children,
  className,
  href,
  target,
  rel,
  ariaLabel,
  mousePosition,
  index = 0
}: DockIconProps) {
  const { iconMagnification, iconDistance, direction } = React.useContext(DockContext)
  const iconRef = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(1)

  React.useEffect(() => {
    if (!mousePosition || !iconRef.current) return

    const rect = iconRef.current.getBoundingClientRect()
    const parentRect = iconRef.current.parentElement?.getBoundingClientRect()
    
    if (!parentRect) return

    // Calculate the center of the icon relative to the dock container
    const iconCenterX = rect.left - parentRect.left + rect.width / 2
    const iconCenterY = rect.top - parentRect.top + rect.height / 2
    
    // Calculate distance from mouse position to icon center
    const distance = direction === "horizontal" 
      ? Math.abs(mousePosition.x - iconCenterX)
      : Math.abs(mousePosition.y - iconCenterY)

    const maxDistance = iconDistance
    const scaleFactor = iconMagnification / 100

    if (distance < maxDistance) {
      const scaleValue = 1 + (scaleFactor * (1 - distance / maxDistance))
      setScale(scaleValue)
    } else {
      setScale(1)
    }
  }, [mousePosition, iconMagnification, iconDistance, direction])

  const content = (
    <div
      ref={iconRef}
      className={cn(
        "flex items-center justify-center transition-all duration-200 ease-out",
        className
      )}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center'
      }}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className="block"
      >
        {content}
      </a>
    )
  }

  return content
}

export type IconProps = React.SVGAttributes<SVGElement>
