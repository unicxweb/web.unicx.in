import type { CategoryHeroService } from "@/components/CategoryHero/CategoryHero";

export type SelectedService = Pick<
  CategoryHeroService,
  "id" | "label" | "descriptor" | "tags" | "mockupSrc"
>;
