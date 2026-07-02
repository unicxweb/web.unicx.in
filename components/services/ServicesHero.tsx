"use client"

import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/ui/animated-gallery"
import { Button } from "@/components/ui/button"
import { VideoIcon } from "lucide-react"
import { ContactPopup } from "@/components/ContactPopup"
import Link from "next/link"

import { useState, useEffect } from "react"

const IMAGES_1 = [
  "/images/optimized/1.webp",
  "/images/optimized/2.webp",
  "/images/optimized/3.webp",
  "/images/optimized/4.webp",
  "/images/optimized/9.webp",
  "/images/optimized/10.webp",
  "/images/optimized/5.webp",
]
const IMAGES_2 = [
  "/images/optimized/5.webp",
  "/images/optimized/6.webp",
  "/images/optimized/7.webp",
  "/images/optimized/8.webp",
  "/images/optimized/2.webp",
  "/images/optimized/3.webp",
]
const IMAGES_3 = [
  "/images/optimized/8.webp",
  "/images/optimized/9.webp",
  "/images/optimized/10.webp",
]

export function ServicesHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const yRange1 = isMobile ? ["0%", "-30%"] : ["-10%", "2%"];
  const yRange2 = isMobile ? ["0%", "-15%"] : ["15%", "5%"];
  const yRange3 = ["-10%", "2%"];

  return (
    <div className="relative bg-white min-h-screen text-zinc-950 font-sans">
      <ContainerStagger className="relative z-[9999] mb-6 md:-mb-12 place-self-center px-6 pt-16 md:pt-12 text-center">
        <ContainerAnimated>
          <h1 className="font-sans text-[clamp(2.25rem,5.2vw,3.8rem)] font-medium leading-[1.05] tracking-tight text-zinc-950">
            Complete{" "}
            <span className="font-sans font-medium text-[#fd5200]">
              digital solutions
            </span>
          </h1>
        </ContainerAnimated>
        <ContainerAnimated>
          <h1 className="font-sans text-[clamp(2.25rem,5.2vw,3.8rem)] font-medium leading-[1.05] tracking-tight text-zinc-950">
            for your brand
          </h1>
        </ContainerAnimated>

        <ContainerAnimated className="my-8">
          <p className="font-sans text-[14px] sm:text-[15px] font-normal leading-relaxed text-zinc-600 max-w-2xl mx-auto">
            Transform your vision into reality. We provide professional
            <br /> web design, development, and digital solutions to elevate your next project.
          </p>
        </ContainerAnimated>

        <ContainerAnimated className="flex items-center justify-center gap-2 mt-6">
          <ContactPopup asChild>
            <Button
              variant="ghost"
              className="gap-1 !bg-black hover:!bg-zinc-900 !text-white rounded-none px-4 py-2 text-sm font-medium"
            >
              Book free call <VideoIcon className="size-4" />
            </Button>
          </ContactPopup>
          <Button variant="link" className="text-zinc-600 hover:text-black hover:underline" asChild>
            <Link href="/studio">About Studio</Link>
          </Button>
        </ContainerAnimated>
      </ContainerStagger>
      <div className="pointer-events-none absolute z-10 h-[70vh] w-full opacity-10"
        style={{
          background: "linear-gradient(to right, gray, rebeccapurple, blue)",
          filter: "blur(84px)",
          mixBlendMode: "multiply",
        }}
      />

      <ContainerScroll className="relative h-[250vh] md:h-[350vh]">
        <ContainerSticky className="h-screen">
          <GalleryContainer className="px-4 pt-36 md:pt-0">
            <GalleryCol yRange={yRange1} className="-mt-1 md:-mt-2">
              {IMAGES_1.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-none object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-10%] md:mt-[-50%]" yRange={yRange2}>
              {IMAGES_2.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-none object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={yRange3} className="-mt-2 hidden md:flex">
              {IMAGES_3.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-none object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
