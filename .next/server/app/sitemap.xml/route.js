(()=>{var e={};e.id=475,e.ids=[475],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},78335:()=>{},79400:(e,t,r)=>{"use strict";r.d(t,{Md:()=>i,ZC:()=>o});let i=[{name:"Graphic Design",description:"Premium visual systems, product interfaces, and brand assets built for clarity and trust.",imageLabel:"Graphic Design Preview",imageSrc:"",items:["UI/UX Design","Logo & Branding","Social Media Creatives","Company Profiles & Presentations","Motion Graphics & Video","Infographics"]},{name:"Website Development",description:"Business websites and custom builds focused on presentation, performance, and measurable outcomes.",imageLabel:"Website Preview",imageSrc:"",items:["Static Websites","Dynamic Websites","Custom Web Solutions","Ecommerce Websites","Landing Pages"]},{name:"App Development",description:"Mobile-first product development across native and hybrid experiences with strong usability foundations.",imageLabel:"App Preview",imageSrc:"",items:["Android Apps","iOS Apps","Hybrid Apps","Progressive Web Apps (PWA)"]},{name:"Software Development",description:"Custom software solutions and enterprise applications built for scalability, performance, and business growth.",imageLabel:"Software Development Preview",imageSrc:"",items:["CRM & ERP Solutions","Custom Software Development","Desktop Applications","Enterprise Solutions","SaaS Applications"]},{name:"Marketing",description:"Organic and paid growth execution designed to increase visibility, demand, and conversion quality.",imageLabel:"Marketing Preview",imageSrc:"",items:["On-Page SEO","Off-Page SEO","Technical SEO","Social Media Marketing","Paid Advertising (Google, Facebook, Instagram)"]}],o=["Clarity over clutter","Premium execution at every layer","Graphic design and growth should work together","Systems must support long-term scale"]},82276:(e,t,r)=>{"use strict";r.r(t),r.d(t,{patchFetch:()=>g,routeModule:()=>p,serverHooks:()=>d,workAsyncStorage:()=>m,workUnitAsyncStorage:()=>u});var i={};r.r(i),r.d(i,{GET:()=>c,dynamic:()=>l});var o=r(96559),a=r(48088),s=r(37719),n=r(79400);let l="force-static";function c(){let e="https://studio.unicx.in",t=function(){let e="https://studio.unicx.in",t=[];return n.Md.forEach(r=>{let i=r.name.toLowerCase().replace(/\s+/g,"-");t.push(`
  <url>
    <loc>${e}/services/${i}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`),r.items.forEach(r=>{let o=r.toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]/g,"");t.push(`
  <url>
    <loc>${e}/services/${i}/${o}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`)})}),t.join("")}();return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${e}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${e}/services</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>${t}
  <url>
    <loc>${e}/work</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${e}/about</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${e}/contact</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${e}/privacy</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${e}/terms</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=3600, s-maxage=86400"}})}let p=new o.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"route",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"C:\\Users\\UniCX\\digital-unicx\\app\\sitemap.xml\\route.ts",nextConfigOutput:"export",userland:i}),{workAsyncStorage:m,workUnitAsyncStorage:u,serverHooks:d}=p;function g(){return(0,s.patchFetch)({workAsyncStorage:m,workUnitAsyncStorage:u})}},96487:()=>{},96559:(e,t,r)=>{"use strict";e.exports=r(44870)}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[719],()=>r(82276));module.exports=i})();