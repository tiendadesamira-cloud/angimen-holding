# Angimen Holding — Web

Property Management · Construction · Renovation · Maintenance · Marbella.

## Estado
Versión final elegida por el cliente (12-may-2026). Pendiente de datos para deploy producción público.

## Estructura
- `index.html` — versión ES
- `en/index.html` — versión EN
- `style.css` — estilos compartidos
- `assets/img/` — imágenes (fotos portfolio + hero)
- `assets/js/main.js` — JS (nav, scroll, filtros, lightbox)
- `404.html` — página de error

## Stack
HTML5 estático + CSS3 + JS vanilla. Cormorant Garamond + Inter. Mobile first.

## Pendiente para deploy producción público
- Email del centro (real)
- Dominio definitivo (angimenholding.com u otro)
- Fotos reales propias del cliente (cuando las mande)
- Páginas legales (aviso, privacidad, cookies) con datos reales
- Más páginas (landings por servicio, blog, sobre nosotros, contacto)
- SEO técnico avanzado (schema.org, sitemap, hreflang)
- Quitar `noindex,nofollow` de meta robots
- Quitar `Disallow: /` de robots.txt
- Gate verify_web.py + Lighthouse + axe + Mozilla Observatory
