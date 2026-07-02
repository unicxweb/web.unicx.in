"use client";

import { CategoryHero } from "@/components/CategoryHero";
import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export function GraphicDesignShowcasePage({
  onServiceClick,
}: {
  onServiceClick?: (service: CategoryHeroService, rect: DOMRect) => void;
}) {
  return <CategoryHero useBallpit={true} onServiceClick={onServiceClick} />;
}
