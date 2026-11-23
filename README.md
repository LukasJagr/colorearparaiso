# Colorear Paraíso

Statický španělský web s obrázky k vybarvení pro produkční doménu
`https://colorearparaiso.com`.

## Obsah projektu

- `dist/` – hotový web určený k publikování na Cloudflare Pages.
- `scripts/generate-coloring-pages.mjs` – generátor kategorií, detailů, metadat,
  strukturovaných dat a sitemapy.
- `scripts/inline-assets.mjs` – vloží CSS a JavaScript přímo do HTML.
- `data/generated-catalog.json` – vygenerovaný katalog 88 kategorií a 738 obrázků.
- `data/supplemental-categories.json` – španělská SEO metadata pro nově generované kategorie.
- `source-assets/` – zdrojové logo a obrázek homepage.
- `source-assets/generated-colorings/` – originální omalovánky pro 12 doplňkových kategorií včetně mandal, kawaii, víl, mořských zvířat, Día de Muertos a alebrijes.

## Nasazení na Cloudflare Pages

Projekt je připravený pro nasazení přímo z GitHubu:

- Framework preset: `None`
- Build command: ponechat prázdné
- Build output directory: `dist`
- Production branch: `main`

Po prvním úspěšném nasazení se připojí vlastní doména
`colorearparaiso.com` a varianta `www.colorearparaiso.com` se nastaví jako
přesměrování na hlavní doménu.

## Bezpečná migrace stávajícího webu

Soubor `dist/_redirects` zachovává nebo přesměrovává dosavadní indexované
stránky. Před změnou DNS je vhodné:

1. vytvořit zálohu současného WordPressu včetně složky `wp-content/uploads`,
2. ponechat staré obrázkové adresy dostupné nebo připravit jejich individuální
   přesměrování,
3. nasazení nejprve ověřit na dočasné doméně Cloudflare Pages,
4. po přepnutí zkontrolovat `robots.txt`, `sitemap.xml`, přesměrování a několik
   důležitých stránek,
5. v Google Search Console znovu odeslat
   `https://colorearparaiso.com/sitemap.xml`.

## Regenerace obsahu

Generátor očekává cestu ke složce se zdrojovými kategoriemi a obrázky jako
první argument. Po vygenerování je potřeba znovu spustit vložení CSS a
JavaScriptu do HTML. Použijte stejnou verzi Node.js jako u původního projektu.

