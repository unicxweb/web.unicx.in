"use client";

import React, { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate";
import { IndexLabel } from "./IndexLabel";

export type ExecutionStep = {
  name: string;
  description: string;
};

export type ExecutionImage = {
  url: string;
  link?: string;
  title?: string;
  author?: string;
};

interface ExecutionModelProps {
  title: string;
  steps?: ExecutionStep[];
  indexLabel?: string;
  images?: (string | ExecutionImage)[];
}

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Mossholder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
  {
    url: "https://images.unsplash.com/photo-1562016600-ece13e8ba570?q=80&w=2838&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
    author: "Wesley Tingey",
    title: "Rippling Crystal Blue Water",
  },
  {
    url: "https://images.unsplash.com/photo-1624344965199-ed40391d20f2?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
    author: "Serhii Tyaglovsky",
    title: "Mann im schwarzen Hemd unter blauem Himmel",
  },
  {
    url: "https://images.unsplash.com/photo-1689553079282-45df1b35741b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
    author: "Vladimir Yelizarov",
    title: "A women with a flower crown on her head",
  },
  {
    url: "https://images.unsplash.com/photo-1721968317938-cf8c60fccd1a?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A blurry photo of white flowers in a field",
    author: "Eugene Golovesov",
    link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
  },
  {
    url: "https://images.unsplash.com/photo-1677338354108-223e807fb1bd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Mathilde Langevin",
    link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
    title: "A table topped with two wine glasses and plates",
  },
];

function Item({
  index,
  image,
  link,
  onInView,
}: {
  index: number;
  image: string;
  link?: string;
  onInView: (inView: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px",
  });

  useEffect(() => {
    onInView(isInView);
  }, [isInView, onInView]);

  return (
    <section
      ref={ref}
      key={index}
      className="h-screen w-full flex justify-center items-center"
    >
      <div className="w-48 h-48 sm:w-80 sm:h-80 md:w-[24rem] md:h-[24rem] lg:w-[32rem] lg:h-[32rem] border border-white/10">
        {link ? (
          <a href={link} target="_blank" rel="noreferrer">
            <img
              src={image}
              alt={`Example ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </a>
        ) : (
          <img
            src={image}
            alt={`Example ${index + 1}`}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </section>
  );
}

export function ExecutionModel({
  title,
  steps,
  indexLabel = "06 / Execution",
  images,
}: ExecutionModelProps) {
  const textRotateRef = useRef<TextRotateRef>(null);

  // Dynamically size the list of images to match the exact number of steps
  const slicedImages = React.useMemo(() => {
    if (images && images.length > 0) {
      return images.map((img) => {
        if (typeof img === "string") {
          return { url: img, link: "", title: "", author: "" };
        }
        return {
          url: img.url,
          link: img.link || "",
          title: img.title || "",
          author: img.author || "",
        };
      });
    }
    const stepsCount = steps && steps.length > 0 ? steps.length : 4;
    return exampleImages.slice(1, 1 + stepsCount);
  }, [images, steps]);

  const handleInView = (index: number, inView: boolean) => {
    if (inView && textRotateRef.current) {
      textRotateRef.current.jumpTo(index);
    }
  };

  // Map step name to each index with step number prefix (retaining original casing)
  const rotatingTexts = slicedImages.map((image, index) => {
    if (steps && steps[index]) {
      return `0${index + 1} / ${steps[index].name}`;
    }
    return `0${index + 1} / ${image.author || ""}`;
  });

  return (
    <div className="w-full flex flex-col-reverse md:flex-row relative bg-black border-t border-white/5">
      {/* Left Column: Natural Vertical Page Scrolling of Images */}
      <div className="w-full md:w-1/2 flex flex-col relative z-10">
        {slicedImages.map((image, index) => (
          <Item
            key={index}
            index={index}
            image={image.url}
            link={image.link}
            onInView={(inView) => handleInView(index, inView)}
          />
        ))}
      </div>

      {/* Right Column: Sticky viewport container for Title and Rotator */}
      <div className="w-full md:w-1/2 sticky top-0 h-[40vh] md:h-screen flex items-center justify-center bg-black text-white z-20 border-b border-white/5 md:border-b-0">
        
        {/* Category Header inside the sticky block */}
        <div className="absolute left-[5vw] top-28 md:top-[15vh] flex flex-col pointer-events-none">
          <div className="text-[clamp(10px,0.9vw,12px)] font-mono tracking-[0.2em] text-white/50 uppercase mb-3 md:mb-8 flex items-center gap-2">
            <IndexLabel label={indexLabel} />
          </div>
          <h2 className="text-[clamp(1.8rem,5.7vw,6.4rem)] font-bold uppercase leading-[0.85] tracking-[-0.02em] text-white max-w-xl">
            {title}
          </h2>
        </div>

        {/* Text Rotator */}
        <div className="w-2/3 pr-[5vw] pt-36 md:pt-0">
          <TextRotate
            ref={textRotateRef}
            texts={rotatingTexts}
            mainClassName="text-sm sm:text-3xl md:text-4xl w-full justify-center flex pt-2 text-white"
            splitLevelClassName="overflow-hidden pb-2"
            staggerFrom={"first"}
            animatePresenceMode="wait"
            loop={false}
            auto={false}
            staggerDuration={0.005}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
