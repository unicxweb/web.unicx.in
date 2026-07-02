import HeroGeometric from "@/components/ui/modern-hero-section";
import type { SelectedService } from "@/components/services/service-types";

type HeroImmersiveProps = {
  title: string;
  description: string;
  label: string;
  activeMockupSrc?: string;
  hideMockupUntilReady?: boolean;
  selectedService?: SelectedService;
};

function splitHeroTitle(title: string) {
  const words = title.split(" ");

  if (words.length <= 2) {
    return {
      title1: words[0] ?? title,
      title2: words.slice(1).join(" ") || "Solutions",
    };
  }

  const midpoint = Math.ceil(words.length / 2);

  return {
    title1: words.slice(0, midpoint).join(" "),
    title2: words.slice(midpoint).join(" "),
  };
}

export function HeroImmersive({
  title: _title,
  description,
  label,
  activeMockupSrc,
  hideMockupUntilReady,
  selectedService,
}: HeroImmersiveProps) {
  const serviceLabel = selectedService?.label ?? label;
  const { title1, title2 } = splitHeroTitle(serviceLabel);

  return (
    <HeroGeometric
      badge={label}
      title1={title1}
      title2={title2}
      description={selectedService?.descriptor ?? description}
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label, href: `/services/${label.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")}` },
        ...(selectedService ? [{ label: selectedService.label }] : []),
      ]}
      activeMockupSrc={activeMockupSrc}
      hideMockupUntilReady={hideMockupUntilReady}
    />
  );
}
