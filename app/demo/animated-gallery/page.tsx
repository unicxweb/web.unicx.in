import { DemoVariant1 } from "@/components/ui/animated-gallery-demo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Animated Gallery Demo | UNICX",
  description: "A high-fidelity animated gallery demonstration built with Framer Motion.",
};

export default function DemoPage() {
  return (
    <main className="w-full bg-white">
      <DemoVariant1 />
    </main>
  );
}
