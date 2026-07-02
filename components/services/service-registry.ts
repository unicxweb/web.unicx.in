import { GRAPHIC_SERVICES, type CategoryHeroService } from "@/components/CategoryHero/CategoryHero";
import { APP_SERVICES } from "./pages/AppDevShowcasePage";
import { MARKETING_SERVICES } from "./pages/MarketingShowcasePage";
import { SOFTWARE_SERVICES } from "./pages/SoftwareDevShowcasePage";
import { WEBSITE_SERVICES } from "./pages/WebsiteDevShowcasePage";

export function serviceSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .replace(/-+/g, "-");
}

export const showcaseServicesByCategory: Record<string, CategoryHeroService[]> = {
  "graphic-design": GRAPHIC_SERVICES,
  "website-development": WEBSITE_SERVICES,
  "app-development": APP_SERVICES,
  "software-development": SOFTWARE_SERVICES,
  marketing: MARKETING_SERVICES,
};

export function findShowcaseService(categoryName: string, serviceId?: string) {
  if (!serviceId) return undefined;

  const services = showcaseServicesByCategory[serviceSlug(categoryName)] ?? [];
  const normalizedServiceId = serviceSlug(serviceId);

  return services.find(
    (service) =>
      service.id === serviceId ||
      service.id === normalizedServiceId ||
      serviceSlug(service.label) === normalizedServiceId
  );
}
