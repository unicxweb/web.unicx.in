import { serviceCategories } from '@/lib/site-data'

export const dynamic = 'force-static'

const baseUrl = 'https://studio.unicx.in'

const staticRoutes = [
  { path: '', changefreq: 'weekly', priority: '1.0' },
  { path: '/services', changefreq: 'monthly', priority: '0.8' },
  { path: '/studio', changefreq: 'monthly', priority: '0.6' },
  { path: '/careers', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.4' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
]

function urlEntry(path: string, lastmod: string, changefreq: string, priority: string): string {
  return `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

function generateServiceUrls(): string {
  const urls: string[] = []
  const lastmod = new Date().toISOString()
  
  // Add service category pages
  serviceCategories.forEach(category => {
    const categorySlug = category.name.toLowerCase().replace(/\s+/g, '-')
    urls.push(urlEntry(`/services/${categorySlug}`, lastmod, 'monthly', '0.8'))
    
    // Add individual service pages
    category.items.forEach(service => {
      const serviceSlug = service.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^\w\-]/g, '').replace(/-+/g, '-')
      urls.push(urlEntry(`/services/${categorySlug}/${serviceSlug}`, lastmod, 'monthly', '0.7'))
    })
  })
  
  return urls.join('')
}

export function GET() {
  const lastmod = new Date().toISOString()
  const staticUrls = staticRoutes
    .map((route) => urlEntry(route.path, lastmod, route.changefreq, route.priority))
    .join('')
  const serviceUrls = generateServiceUrls()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}${serviceUrls}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
