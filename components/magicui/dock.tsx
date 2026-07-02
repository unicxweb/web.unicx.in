"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"

interface DockProps {
  children: React.ReactNode
  className?: string
  iconMagnification?: number
  iconDistance?: number
  iconSize?: number
  direction?: "horizontal" | "vertical" | "middle"
}

interface DockIconProps {
  children: React.ReactNode
  className?: string
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
  mouseX?: MotionValue<number>
  mouseY?: MotionValue<number>
}

const DockContext = React.createContext<{
  iconMagnification: number
  iconDistance: number
  iconSize: number
  direction: "horizontal" | "vertical" | "middle"
}>({
  iconMagnification: 60,
  iconDistance: 100,
  iconSize: 40,
  direction: "horizontal"
})

export function Dock({
  children,
  className,
  iconMagnification = 60,
  iconDistance = 100,
  iconSize = 40,
  direction = "horizontal"
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const mouseY = useMotionValue(Infinity)

  return (
    <DockContext.Provider value={{ iconMagnification, iconDistance, iconSize, direction }}>
      <motion.div
        onMouseMove={(e) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity)
          mouseY.set(Infinity)
        }}
        className={cn(
          "flex items-center gap-2",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === DockIcon) {
            return React.cloneElement(child as React.ReactElement<DockIconProps>, { mouseX, mouseY })
          }
          return child
        })}
      </motion.div>
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
  mouseX,
  mouseY
}: DockIconProps) {
  const { iconMagnification, iconDistance, iconSize, direction } = React.useContext(DockContext)
  const ref = React.useRef<HTMLDivElement>(null)
  const fallbackMouseX = useMotionValue(Infinity)
  const fallbackMouseY = useMotionValue(Infinity)

  const distance = useTransform(mouseX ?? fallbackMouseX, (latestX) => {
    if (!ref.current || !Number.isFinite(latestX)) return Infinity

    const rect = ref.current.getBoundingClientRect()
    const center = rect.left + rect.width / 2

    return Math.abs(center - latestX)
  })

  const verticalDistance = useTransform(mouseY ?? fallbackMouseY, (latestY) => {
    if (!ref.current || !Number.isFinite(latestY)) return Infinity

    const rect = ref.current.getBoundingClientRect()
    const center = rect.top + rect.height / 2

    return Math.abs(center - latestY)
  })

  const activeDistance = direction === "vertical" ? verticalDistance : distance

  const widthSync = useTransform(activeDistance, (latestDistance) => {
    if (!Number.isFinite(latestDistance) || latestDistance >= iconDistance) {
      return iconSize
    }

    const influence = 1 - latestDistance / iconDistance
    return iconSize + (iconMagnification - iconSize) * influence
  })

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className={cn(
        "flex items-center justify-center rounded-lg bg-black/10 dark:bg-white/10",
        className
      )}
    >
      {children}
    </motion.div>
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
