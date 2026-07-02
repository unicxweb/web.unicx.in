"use client";

import React, { useEffect, useRef, useState } from "react";

interface IconCloudProps {
  images: string[];
}

interface IconNode {
  x: number;
  y: number;
  z: number;
  img: HTMLImageElement;
}

export function IconCloud({ images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Preload images
  useEffect(() => {
    let active = true;
    const loaded: HTMLImageElement[] = [];
    let count = 0;

    images.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (!active) return;
        loaded.push(img);
        count++;
        if (count === images.length) {
          setLoadedImages(loaded);
        }
      };
      img.onerror = () => {
        count++;
        if (count === images.length) {
          setLoadedImages(loaded);
        }
      };
    });

    return () => {
      active = false;
    };
  }, [images]);

  useEffect(() => {
    if (loadedImages.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const radius = 120; // sphere radius
    const speed = 0.005;

    // Distribute nodes evenly on a sphere using Fibonacci distribution
    const numNodes = loadedImages.length;
    const nodes: IconNode[] = loadedImages.map((img, i) => {
      const phi = Math.acos(-1 + (2 * i) / numNodes);
      const theta = Math.sqrt(numNodes * Math.PI) * phi;
      return {
        x: Math.sin(phi) * Math.cos(theta) * radius,
        y: Math.sin(phi) * Math.sin(theta) * radius,
        z: Math.cos(phi) * radius,
        img,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      
      // Calculate rotation targets: max speed capped at 0.002 for ultra-gentle control
      mouseRef.current = {
        x: (dx / rect.width) * 0.002,
        y: (dy / rect.height) * 0.002,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Initial slow constant rotation speeds (very subtle drift)
    let currentRotationX = 0.0001;
    let currentRotationY = 0.0002;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Decays toward mouse direction when hovering, or falls back to an ultra-slow auto-drift when idle
      const targetX = mouseRef.current.y || 0.00005;
      const targetY = mouseRef.current.x || 0.0002;

      currentRotationX += (targetX - currentRotationX) * 0.02; // slower interpolation
      currentRotationY += (targetY - currentRotationY) * 0.02;

      const cosX = Math.cos(currentRotationX);
      const sinX = Math.sin(currentRotationX);
      const cosY = Math.cos(currentRotationY);
      const sinY = Math.sin(currentRotationY);

      nodes.sort((a, b) => a.z - b.z);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      nodes.forEach((node) => {
        let y1 = node.y * cosX - node.z * sinX;
        let z1 = node.z * cosX + node.y * sinX;

        let x2 = node.x * cosY - z1 * sinY;
        let z2 = z1 * cosY + node.x * sinY;

        node.x = x2;
        node.y = y1;
        node.z = z2;

        const depth = 200;
        const scale = depth / (depth - z2);
        const size = 32 * scale;

        const screenX = cx + x2 * scale;
        const screenY = cy + y1 * scale;

        const opacity = Math.min(Math.max((z2 + radius) / (2 * radius) + 0.2, 0.1), 1);
        ctx.globalAlpha = opacity;

        // Draw a subtle glassmorphic circle background for each icon
        ctx.beginPath();
        ctx.arc(screenX, screenY, size * 0.8, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        ctx.drawImage(
          node.img,
          screenX - size / 2,
          screenY - size / 2,
          size,
          size
        );
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loadedImages]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="max-w-full aspect-square"
    />
  );
}
