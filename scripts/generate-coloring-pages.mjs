import fs from "node:fs";
import path from "node:path";
import sharp from "/Users/lukas.jagr/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const sourceRoot = process.argv[2];
const baseUrl = "https://colorearparaiso.com";
const generatedOn = "2026-10-12";
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

if (!sourceRoot || !fs.existsSync(sourceRoot)) {
  throw new Error("Zadajte existujúci zdrojový priečinok s omaľovánkami.");
}

function normalize(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("sk");
}

const categoryDefinitions = [
  ["Abeceda", "Alfabeto", "alfabeto", "para-colorear/alfabeto", "Dibujos del alfabeto para colorear"],
  ["Abstraktní", "Abstractos", "abstracto", "para-colorear/abstracto", "Dibujos abstractos para colorear"],
  ["Antistresové", "Antiestrés", "antiestres", "para-colorear/antiestres", "Dibujos antiestrés para colorear"],
  ["Auta", "Coches", "coches", "para-colorear/coches", "Dibujos de coches para colorear"],
  ["Autobusy", "Autobuses", "autobuses", "para-colorear/autobuses", "Dibujos de autobuses para colorear"],
  ["Balóny", "Globos", "globos", "para-colorear/globos", "Dibujos de globos para colorear"],
  ["Broucci", "Insectos", "insectos", "para-colorear/insectos", "Dibujos de insectos para colorear"],
  ["Cert Mikulas", "San Nicolás y el diablo", "san-nicolas-y-el-diablo", "para-colorear/san-nicolas-y-el-diablo", "Dibujos de San Nicolás y el diablo para colorear"],
  ["Cisla", "Números", "numeros", "para-colorear/numeros", "Dibujos de números para colorear"],
  ["Dinosauri", "Dinosaurios", "dinosaurios", "para-colorear/dinosaurios", "Dibujos de dinosaurios para colorear"],
  ["Dorty", "Tartas", "tartas", "para-colorear/tartas", "Dibujos de tartas para colorear"],
  ["Draci", "Dragones", "dragones", "para-colorear/dragones", "Dibujos de dragones para colorear"],
  ["Farma", "La granja", "la-granja", "para-colorear/la-granja", "Dibujos de la granja para colorear"],
  ["Formule", "Fórmula 1", "formula-1", "para-colorear/formula-1", "Dibujos de Fórmula 1 para colorear"],
  ["Halloween", "Halloween", "halloween", "para-colorear/halloween", "Dibujos de Halloween para colorear"],
  ["Hasici", "Bomberos", "bomberos", "para-colorear/bomberos", "Dibujos de bomberos para colorear"],
  ["Houby", "Setas", "setas", "para-colorear/setas", "Dibujos de setas para colorear"],
  ["Hrady", "Castillos", "castillos", "para-colorear/castillos", "Dibujos de castillos para colorear"],
  ["Hrosi", "Hipopótamos", "hipopotamos", "para-colorear/animales/hipopotamos", "Dibujos de hipopótamos para colorear"],
  ["Chaloupky", "Casas", "casas", "para-colorear/casas", "Dibujos de casas para colorear"],
  ["Chameleoni", "Camaleones", "camaleones", "para-colorear/animales/camaleones", "Dibujos de camaleones para colorear"],
  ["Jednorozci", "Unicornios", "unicornios", "para-colorear/unicornios", "Dibujos de unicornios para colorear"],
  ["Jeleni a srnci", "Ciervos y corzos", "ciervos-y-corzos", "para-colorear/animales/ciervos-y-corzos", "Dibujos de ciervos y corzos para colorear"],
  ["Jezci", "Erizos", "erizos", "para-colorear/animales/erizos", "Dibujos de erizos para colorear"],
  ["Kamiony", "Camiones", "camiones", "para-colorear/camiones", "Dibujos de camiones para colorear"],
  ["Klauni", "Payasos", "payasos", "para-colorear/payasos", "Dibujos de payasos para colorear"],
  ["Kocky", "Gatos", "gatos", "para-colorear/gatos", "Dibujos de gatos para colorear"],
  ["Kone", "Caballos", "caballos", "para-colorear/animales/caballos", "Dibujos de caballos para colorear"],
  ["Kralici", "Conejos", "conejos", "para-colorear/conejos", "Dibujos de conejos para colorear"],
  ["Krokodyli", "Cocodrilos", "cocodrilos", "para-colorear/animales/cocodrilos", "Dibujos de cocodrilos para colorear"],
  ["Kvetiny", "Flores", "flores", "para-colorear/flores", "Dibujos de flores para colorear"],
  ["Letadla", "Aviones", "aviones", "para-colorear/aviones", "Dibujos de aviones para colorear"],
  ["Lode", "Barcos", "barcos", "para-colorear/barcos", "Dibujos de barcos para colorear"],
  ["Lvi a tygri", "Leones y tigres", "leones-y-tigres", "para-colorear/leones-y-tigres", "Dibujos de leones y tigres para colorear"],
  ["Medvedi", "Osos", "osos", "para-colorear/animales/osos", "Dibujos de osos para colorear"],
  ["Monster trucky", "Monster trucks", "monster-trucks", "para-colorear/monster-trucks", "Dibujos de monster trucks para colorear"],
  ["Morske vily", "Sirenas", "sirenas", "para-colorear/sirenas", "Dibujos de sirenas para colorear"],
  ["Motorky", "Motos", "motos", "para-colorear/motos", "Dibujos de motos para colorear"],
  ["Motyly", "Mariposas", "mariposas", "para-colorear/animales/mariposas", "Dibujos de mariposas para colorear"],
  ["Namornici", "Marineros", "marineros", "para-colorear/marineros", "Dibujos de marineros para colorear"],
  ["Netopyri", "Murciélagos", "murcielagos", "para-colorear/animales/murcielagos", "Dibujos de murciélagos para colorear"],
  ["Ninjove", "Ninjas", "ninjas", "para-colorear/ninjas", "Dibujos de ninjas para colorear"],
  ["Opice", "Monos", "monos", "para-colorear/animales/monos", "Dibujos de monos para colorear"],
  ["Ostatní zvířata", "Mascotas y otros animales", "mascotas", "para-colorear/animales/mascotas", "Dibujos de mascotas para colorear"],
  ["Ovce", "Ovejas", "ovejas", "para-colorear/animales/ovejas", "Dibujos de ovejas para colorear"],
  ["Pandy", "Pandas", "pandas", "para-colorear/animales/pandas", "Dibujos de pandas para colorear"],
  ["Pirati", "Piratas", "piratas", "para-colorear/piratas", "Dibujos de piratas para colorear"],
  ["Policie", "Policía", "policia", "para-colorear/policia", "Dibujos de policías para colorear"],
  ["Princezny", "Princesas", "princesas", "para-colorear/princesas", "Dibujos de princesas para colorear"],
  ["Priroda", "Naturaleza", "naturaleza", "para-colorear/naturaleza", "Dibujos de naturaleza para colorear"],
  ["Priserky", "Monstruos", "monstruos", "para-colorear/monstruos", "Dibujos de monstruos para colorear"],
  ["Psi", "Perros", "perros", "para-colorear/perros", "Dibujos de perros para colorear"],
  ["Ptaci a papoušci", "Aves y loros", "loros", "para-colorear/loros", "Dibujos de aves y loros para colorear"],
  ["Roboti", "Robots", "robots", "para-colorear/robots", "Dibujos de robots para colorear"],
  ["Rocni obdobi", "Estaciones", "estaciones", "para-colorear/estaciones", "Dibujos de las estaciones para colorear"],
  ["Ryby", "Peces", "peces", "para-colorear/animales/peces", "Dibujos de peces para colorear"],
  ["Rytiri", "Caballeros", "caballeros", "para-colorear/caballeros", "Dibujos de caballeros para colorear"],
  ["Sloni", "Elefantes", "elefantes", "para-colorear/animales/elefantes", "Dibujos de elefantes para colorear"],
  ["Sovy", "Búhos", "buhos", "para-colorear/animales/buhos", "Dibujos de búhos para colorear"],
  ["Strasidla a duchove", "Fantasmas", "fantasmas", "para-colorear/fantasmas", "Dibujos de fantasmas para colorear"],
  ["Surikaty", "Suricatas", "suricatas", "para-colorear/animales/suricatas", "Dibujos de suricatas para colorear"],
  ["Tanky", "Tanques", "tanques", "para-colorear/tanques", "Dibujos de tanques para colorear"],
  ["Traktory a bagry", "Tractores y excavadoras", "tractores", "para-colorear/tractores", "Dibujos de tractores y excavadoras para colorear"],
  ["Tramvaje", "Tranvías", "tranvias", "para-colorear/tranvias", "Dibujos de tranvías para colorear"],
  ["Trpaslici", "Enanos", "enanos", "para-colorear/enanos", "Dibujos de enanos para colorear"],
  ["Tucnaci", "Pingüinos", "pinguinos", "para-colorear/animales/pinguinos", "Dibujos de pingüinos para colorear"],
  ["Vánoční", "Navidad", "navidad", "para-colorear/navidad", "Dibujos de Navidad para colorear"],
  ["Velikonoce", "Pascua", "pascua", "para-colorear/pascua", "Dibujos de Pascua para colorear"],
  ["Vesmír", "El universo", "universo", "para-colorear/universo", "Dibujos del universo para colorear"],
  ["Veverky", "Ardillas", "ardillas", "para-colorear/animales/ardillas", "Dibujos de ardillas para colorear"],
  ["Vlaky", "Trenes", "trenes", "para-colorear/trenes", "Dibujos de trenes para colorear"],
  ["Vlci", "Lobos", "lobos", "para-colorear/animales/lobos", "Dibujos de lobos para colorear"],
  ["Vojáci", "Soldados", "soldados", "para-colorear/soldados", "Dibujos de soldados para colorear"],
  ["Vrtulníky", "Helicópteros", "helicopteros", "para-colorear/helicopteros", "Dibujos de helicópteros para colorear"],
  ["Zelvy", "Tortugas", "tortugas", "para-colorear/animales/tortugas", "Dibujos de tortugas para colorear"],
  ["Zirafy", "Jirafas", "jirafas", "para-colorear/animales/jirafas", "Dibujos de jirafas para colorear"]
];

// Natural Slovak phrases used in category meta descriptions. Most categories
// use a genitive noun after "omaľovánky"; adjective-based themes read better
// before the noun (for example "vianočné omaľovánky").
const categorySeoPhrasesSk = {
  abeceda: "omaľovánky abecedy",
  abstraktne: "abstraktné omaľovánky",
  antistresove: "antistresové omaľovánky",
  auta: "omaľovánky áut",
  autobusy: "omaľovánky autobusov",
  balony: "omaľovánky balónov",
  chrobaky: "omaľovánky chrobákov",
  "cert-a-mikulas": "omaľovánky čerta a Mikuláša",
  cisla: "omaľovánky čísel",
  dinosaury: "omaľovánky dinosaurov",
  torty: "omaľovánky tort",
  draci: "omaľovánky drakov",
  farma: "omaľovánky farmy",
  formule: "omaľovánky formúl",
  halloween: "halloweenske omaľovánky",
  hasici: "omaľovánky hasičov",
  huby: "omaľovánky húb",
  hrady: "omaľovánky hradov",
  hrochy: "omaľovánky hrochov",
  chalupky: "omaľovánky chalúpok",
  chameleony: "omaľovánky chameleónov",
  jednorozce: "omaľovánky jednorožcov",
  "jelene-a-srnky": "omaľovánky jeleňov a srniek",
  jezkovia: "omaľovánky ježkov",
  kamiony: "omaľovánky kamiónov",
  klauni: "omaľovánky klaunov",
  macky: "omaľovánky mačiek",
  kone: "omaľovánky koní",
  kraliky: "omaľovánky králikov",
  krokodily: "omaľovánky krokodílov",
  kvety: "omaľovánky kvetov",
  lietadla: "omaľovánky lietadiel",
  lode: "omaľovánky lodí",
  "levy-a-tigre": "omaľovánky levov a tigrov",
  medvede: "omaľovánky medveďov",
  "monster-trucky": "omaľovánky monster truckov",
  "morske-panny": "omaľovánky morských panien",
  motorky: "omaľovánky motoriek",
  motyle: "omaľovánky motýľov",
  namornici: "omaľovánky námorníkov",
  netopiere: "omaľovánky netopierov",
  nindzovia: "omaľovánky nindžov",
  opice: "omaľovánky opíc",
  "ostatne-zvierata": "omaľovánky ostatných zvierat",
  ovce: "omaľovánky oviec",
  pandy: "omaľovánky pánd",
  pirati: "omaľovánky pirátov",
  policia: "omaľovánky polície",
  princezne: "omaľovánky princezien",
  priroda: "omaľovánky prírody",
  priserky: "omaľovánky príšeriek",
  psy: "omaľovánky psov",
  "vtaky-a-papagaje": "omaľovánky vtákov a papagájov",
  roboti: "omaľovánky robotov",
  "rocne-obdobia": "omaľovánky ročných období",
  ryby: "omaľovánky rýb",
  rytieri: "omaľovánky rytierov",
  slony: "omaľovánky slonov",
  sovy: "omaľovánky sov",
  "strasidla-a-duchovia": "omaľovánky strašidiel a duchov",
  surikaty: "omaľovánky surikát",
  tanky: "omaľovánky tankov",
  "traktory-a-bagre": "omaľovánky traktorov a bagrov",
  elektricky: "omaľovánky električiek",
  trpaslici: "omaľovánky trpaslíkov",
  tucniaky: "omaľovánky tučniakov",
  vianoce: "vianočné omaľovánky",
  "velka-noc": "veľkonočné omaľovánky",
  vesmir: "omaľovánky vesmíru",
  vevericky: "omaľovánky veveričiek",
  vlaky: "omaľovánky vlakov",
  vlky: "omaľovánky vlkov",
  vojaci: "omaľovánky vojakov",
  vrtulniky: "omaľovánky vrtuľníkov",
  korytnacky: "omaľovánky korytnačiek",
  zirafy: "omaľovánky žiráf"
};

function categoryMetaDescription(slug) {
  const definition = categoryDefinitions.find((entry) => entry[2] === slug);
  if (!definition) throw new Error(`Falta la definición SEO de la categoría ${slug}`);
  return `Descubre ${lower(definition[4])} gratis. Descarga e imprime tus diseños favoritos en alta calidad y empieza a colorear en casa.`;
}

function findEntry(directory, wanted, type = null) {
  const found = fs.readdirSync(directory, { withFileTypes: true }).find((entry) =>
    normalize(entry.name) === normalize(wanted) && (!type || (type === "directory" ? entry.isDirectory() : entry.isFile()))
  );
  if (!found) throw new Error(`Nenašiel sa ${wanted} v ${directory}`);
  return path.join(directory, found.name);
}

function walkImages(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const location = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkImages(location));
    else if (imageExtensions.has(path.extname(entry.name).toLocaleLowerCase("en"))) files.push(location);
  }
  return files;
}

const collator = new Intl.Collator("sk", { numeric: true, sensitivity: "base" });
const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const jsonLd = (value) => JSON.stringify(value).replaceAll("<", "\\u003c");
const write = (file, contents) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, contents); };
const lower = (value) => value.toLocaleLowerCase("sk");
const sourceKey = (sourceDirectory, sourceFile) => `${normalize(sourceDirectory)}/${normalize(sourceFile)}`;
const mimeByExtension = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };

const iconSearch = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';
const iconPrint = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/></svg>';
const iconDownload = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0 5-5m-5 5-5-5M4 21h16"/></svg>';

function header(current = "") {
  return `<a class="skip-link" href="#contenido-principal">Saltar al contenido</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="Colorear Paraíso – inicio"><img src="/assets/brand/logo-228.webp" srcset="/assets/brand/logo-228.webp 228w, /assets/brand/logo-456.webp 456w" sizes="228px" width="228" height="43" alt="Colorear Paraíso"></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-menu" aria-label="Abrir el menú" data-menu-toggle><span class="menu-toggle-icon" aria-hidden="true"><span></span><span></span><span></span></span></button><nav id="main-menu" class="main-nav" aria-label="Navegación principal" data-menu><a href="/"${current === "home" ? ' aria-current="page"' : ""}>Inicio</a><a href="/para-colorear/"${current === "catalog" ? ' aria-current="page"' : ""}>Dibujos para colorear</a><a href="/#para-familias">Para familias</a><details class="language-switcher"><summary aria-label="Elegir idioma"><span class="language-flag" aria-hidden="true">🇪🇸</span><span>Español</span></summary><div class="language-menu" aria-label="Versiones de idioma"><span class="language-current" aria-current="true"><span aria-hidden="true">🇪🇸</span> Español</span><a href="https://rajomalovanek.cz/" hreflang="cs" lang="cs"><span aria-hidden="true">🇨🇿</span> Čeština</a><a href="https://www.rajomalovanek.sk/" hreflang="sk" lang="sk"><span aria-hidden="true">🇸🇰</span> Slovenčina</a><a href="https://rajkolorowanek.pl/" hreflang="pl" lang="pl"><span aria-hidden="true">🇵🇱</span> Polski</a></div></details><a class="header-search-link" href="/para-colorear/#buscar" aria-label="Buscar dibujos para colorear">${iconSearch}<span>Buscar</span></a></nav></div></header>`;
}

function footer(categories) {
  const popular = ["gatos", "perros", "dinosaurios", "princesas"].map((slug) => categories.find((category) => category.slug === slug)).filter(Boolean);
  return `<footer class="site-footer"><div class="footer-grid"><div><a class="footer-brand" href="/" aria-label="Colorear Paraíso – inicio"><img src="/assets/brand/logo-228.webp" srcset="/assets/brand/logo-228.webp 228w, /assets/brand/logo-456.webp 456w" sizes="228px" width="228" height="43" alt="Colorear Paraíso"></a><p class="footer-copy">Dibujos para colorear gratis, listos para imprimir y descargar.</p></div><div><p class="footer-title">Categorías populares</p><ul class="footer-links">${popular.map((category) => `<li><a href="/${category.route}/">${escapeHtml(category.name)}</a></li>`).join("")}<li><a href="/para-colorear/">Todos los dibujos</a></li></ul></div><div><p class="footer-title">Información</p><ul class="footer-links"><li><a href="/sobre-colorear/">Sobre nosotros</a></li><li><a href="/politica-de-privacidad/">Política de privacidad</a></li><li><a href="/politica-de-cookies/">Política de cookies</a></li></ul></div></div><div class="footer-bottom"><span>© <span data-year></span> Colorear Paraíso</span><span>Dibujos para disfrutar creando.</span></div></footer>`;
}

function documentHtml({ title, description, canonical, ogImage, body, structuredData, bodyClass = "", robots = "index,follow,max-image-preview:large" }) {
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}">${canonical ? `<link rel="canonical" href="${canonical}">` : ""}<meta name="robots" content="${robots}"><meta property="og:type" content="website"><meta property="og:locale" content="es_ES"><meta property="og:site_name" content="Colorear Paraíso"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}">${canonical ? `<meta property="og:url" content="${canonical}">` : ""}${ogImage ? `<meta property="og:image" content="${ogImage.url}"><meta property="og:image:width" content="${ogImage.width}"><meta property="og:image:height" content="${ogImage.height}"><meta property="og:image:alt" content="${escapeHtml(ogImage.alt)}">` : ""}<meta name="twitter:card" content="summary_large_image"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8746835805990509" crossorigin="anonymous"></script><link rel="stylesheet" href="/assets/site.css"><script type="application/ld+json">${jsonLd(structuredData)}</script></head><body${bodyClass ? ` class="${bodyClass}"` : ""}>${body}<script src="/assets/site.js" defer></script></body></html>\n`;
}

function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Migas de pan"><ol>${items.map((item, index) => `<li${index === items.length - 1 ? ' aria-current="page"' : ""}>${item.href ? `<a href="${item.href}">${escapeHtml(item.name)}</a>` : escapeHtml(item.name)}</li>`).join("")}</ol></nav>`;
}

function categoryCard(category) {
  return `<a class="category-card" href="/${category.route}/"><span class="category-art category-art-image"><img src="/assets/categories/${category.slug}-cover-320.webp" srcset="/assets/categories/${category.slug}-cover-320.webp 320w, /assets/categories/${category.slug}-cover-640.webp 640w" sizes="(max-width: 720px) calc(100vw - 30px), 25vw" width="640" height="640" loading="lazy" decoding="async" alt="${escapeHtml(category.coverAlt)}" title="${escapeHtml(category.label)}"></span><span class="category-count">${category.items.length} dibujos</span><h3>${escapeHtml(category.name)}</h3></a>`;
}

function coloringCard(category, item) {
  const imageBase = `/assets/coloring-pages/${category.slug}/${item.slug}`;
  const url = `/${category.route}/${item.slug}/`;
  const terms = `${item.title} ${item.alt} ${item.keywords} ${category.name}`;
  return `<article class="coloring-card" data-search-terms="${escapeHtml(terms)}"><a href="${url}" aria-label="Abrir ${escapeHtml(item.title)}"><span class="coloring-thumb"><img src="${imageBase}-320.webp" srcset="${imageBase}-320.webp 320w, ${imageBase}-720.webp 720w" sizes="(max-width: 420px) calc(100vw - 30px), (max-width: 960px) 50vw, 25vw" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${escapeHtml(item.alt)}" title="${escapeHtml(item.title)}"></span><span class="coloring-card-body"><h3>${escapeHtml(item.title)}</h3><p class="card-meta">${escapeHtml(category.name)} · ${escapeHtml(item.age)} · A4</p></span></a></article>`;
}

// Only generated output is replaced. The supplied source folders remain untouched.
for (const generatedPath of [path.join(dist, "assets/categories"), path.join(dist, "assets/coloring-pages"), path.join(dist, "para-colorear"), path.join(dist, "omalovanky"), path.join(dist, "zasady-cookies"), path.join(dist, "zasady-ochrany-osobnych-udajov")]) {
  fs.rmSync(generatedPath, { recursive: true, force: true });
}

const categories = [];
for (const [sourceDirectory, name, slug, route, seoHeading] of categoryDefinitions) {
  const categoryDir = findEntry(sourceRoot, sourceDirectory, "directory");
  const files = walkImages(categoryDir).sort((a, b) => collator.compare(path.basename(a), path.basename(b)));
  const cover = files.find((file) => /^cover\./i.test(path.basename(file)));
  const colorings = files.filter((file) => !/^cover\./i.test(path.basename(file)));
  if (!colorings.length) continue;
  const category = { sourceDirectory, name, slug, route, label: seoHeading, coverAlt: `Vista previa de ${lower(seoHeading)} gratis`, description: categoryMetaDescription(slug), intro: `Elige entre ${colorings.length} ${lower(seoHeading)}. Todos están preparados para imprimir en A4 o descargar gratis, sin registro.`, seoHeading, items: [] };
  for (let index = 0; index < colorings.length; index += 1) {
    const source = colorings[index];
    const number = index + 1;
    const itemSlug = `${slug}-para-colorear-${String(number).padStart(2, "0")}`;
    const title = `${name} para colorear – dibujo ${number}`;
    const alt = `Dibujo de ${lower(name)} para colorear e imprimir gratis, diseño ${number}`;
    const description = `Dibujo de ${lower(name)} para colorear gratis. Descarga la imagen en alta calidad o imprime esta lámina en papel A4.`;
    const metadata = await sharp(source).metadata();
    const extension = path.extname(source).toLocaleLowerCase("en") === ".jpeg" ? ".jpg" : path.extname(source).toLocaleLowerCase("en");
    const outputDir = path.join(dist, "assets/coloring-pages", slug);
    fs.mkdirSync(outputDir, { recursive: true });
    fs.copyFileSync(source, path.join(outputDir, `${itemSlug}${extension}`));
    for (const width of [320, 720]) {
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: width === 720 ? 82 : 78 }).toFile(path.join(outputDir, `${itemSlug}-${width}.webp`));
    }
    category.items.push({ sourceFile: path.basename(source), slug: itemSlug, title, alt, description, age: "a partir de 4 años", keywords: `${name} dibujo para colorear gratis para imprimir descargar niños A4`, extension, mime: mimeByExtension[extension] || metadata.format, width: metadata.width, height: metadata.height, orientation: metadata.width > metadata.height ? "Horizontal" : "Vertical" });
  }
  const coverSource = cover || colorings[0];
  const coverOut = path.join(dist, "assets/categories");
  fs.mkdirSync(coverOut, { recursive: true });
  for (const width of [320, 640]) {
    await sharp(coverSource).resize(width, width, { fit: "cover", position: "top" }).webp({ quality: width === 640 ? 84 : 82 }).toFile(path.join(coverOut, `${slug}-cover-${width}.webp`));
  }
  categories.push(category);
}

const prepared = categories.flatMap((category) => category.items.map((item) => ({ category, item })));
const homeCover = {
  source: path.join(root, "source-assets/homepage/omalovanky-na-vytlacenie-zadarmo.jpg"),
  directory: path.join(dist, "assets/homepage"),
  basename: "omalovanky-na-vytlacenie-zadarmo",
  width: 1024,
  height: 1536,
  alt: "Dibujo de un ciervo en la montaña para colorear e imprimir gratis",
  title: "Dibujos para colorear gratis – ciervo en la naturaleza"
};
fs.mkdirSync(homeCover.directory, { recursive: true });
fs.copyFileSync(homeCover.source, path.join(homeCover.directory, `${homeCover.basename}.jpg`));
for (const width of [320, 720, 1024]) {
  await sharp(homeCover.source).resize({ width, withoutEnlargement: true }).webp({ quality: width === 1024 ? 88 : 82 }).toFile(path.join(homeCover.directory, `${homeCover.basename}-${width}.webp`));
}

const logoSource = path.join(root, "source-assets/brand/logo.svg");
const logoDirectory = path.join(dist, "assets/brand");
fs.mkdirSync(logoDirectory, { recursive: true });
for (const width of [228, 456]) {
  await sharp(logoSource).resize({ width, withoutEnlargement: true }).webp({ quality: 90 }).toFile(path.join(logoDirectory, `logo-${width}.webp`));
}

for (const category of categories) {
  const canonical = `${baseUrl}/${category.route}/`;
  const structuredData = { "@context": "https://schema.org", "@graph": [{ "@type": "CollectionPage", name: category.label, description: category.description, url: canonical, inLanguage: "es", mainEntity: { "@type": "ItemList", numberOfItems: category.items.length, itemListElement: category.items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.title, url: `${canonical}${item.slug}/` })) } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: "Dibujos para colorear", item: `${baseUrl}/para-colorear/` }, { "@type": "ListItem", position: 3, name: category.name, item: canonical }] }] };
  const body = `${header("catalog")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Dibujos para colorear", href: "/para-colorear/" }, { name: category.name }])}<section class="page-hero"><div class="container"><div><p class="eyebrow">Categoría de dibujos</p><h1>${escapeHtml(category.label)}</h1><p>${escapeHtml(category.intro)}</p></div><div class="category-hero-meta"><strong>${category.items.length}</strong><span>dibujos<br>para imprimir</span></div></div></section><section class="section" aria-labelledby="lista-${category.slug}"><div class="container"><div class="catalog-toolbar"><h2 id="lista-${category.slug}">Elige un dibujo</h2><span class="result-count">${category.items.length} dibujos</span></div><div class="coloring-grid">${category.items.map((item) => coloringCard(category, item)).join("")}</div></div></section><aside class="ad-slot" aria-label="Espacio reservado para publicidad"></aside><section class="section section-tint"><div class="container seo-copy"><p class="eyebrow">Creatividad para niños</p><h2>${escapeHtml(category.seoHeading)} gratis</h2><p>Estos dibujos de ${escapeHtml(lower(category.name))} ayudan a desarrollar la motricidad fina, la concentración y la imaginación. Cada niño puede elegir sus colores y convertir cada lámina en una creación única.</p><p>Todos los dibujos están disponibles sin registro. Abre tu favorito, imprímelo en papel A4 o descarga el archivo original en alta resolución.</p></div></section></main>${footer(categories)}`;
  write(path.join(dist, ...category.route.split("/"), "index.html"), documentHtml({ title: `${category.label} e imprimir gratis | Colorear Paraíso`, description: category.description, canonical, ogImage: { url: `${baseUrl}/assets/categories/${category.slug}-cover-640.webp`, width: 640, height: 640, alt: category.coverAlt }, body, structuredData }));

  for (const item of category.items) {
    const url = `${canonical}${item.slug}/`;
    const imageBase = `${baseUrl}/assets/coloring-pages/${category.slug}/${item.slug}`;
    const originalUrl = `${imageBase}${item.extension}`;
    const structured = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "@id": url, name: item.title, url, description: item.description, inLanguage: "es", primaryImageOfPage: { "@id": `${url}#image` } }, { "@type": "ImageObject", "@id": `${url}#image`, name: item.title, caption: item.alt, description: item.description, contentUrl: originalUrl, thumbnailUrl: `${imageBase}-720.webp`, encodingFormat: item.mime, width: item.width, height: item.height, representativeOfPage: true, creator: { "@type": "Organization", name: "Colorear Paraíso" }, copyrightNotice: "Colorear Paraíso", mainEntityOfPage: { "@id": url } }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${baseUrl}/` }, { "@type": "ListItem", position: 2, name: "Dibujos para colorear", item: `${baseUrl}/para-colorear/` }, { "@type": "ListItem", position: 3, name: category.name, item: canonical }, { "@type": "ListItem", position: 4, name: item.title, item: url }] }] };
    const related = category.items.filter((entry) => entry.slug !== item.slug).slice(0, 4);
    const fileType = item.extension.replace(".", "").toLocaleUpperCase("es");
    const body = `${header("catalog")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Dibujos para colorear", href: "/para-colorear/" }, { name: category.name, href: `/${category.route}/` }, { name: item.title }])}<section class="section"><div class="container detail-layout"><figure class="coloring-sheet"><picture><source media="print" srcset="/assets/coloring-pages/${category.slug}/${item.slug}${item.extension}"><img src="/assets/coloring-pages/${category.slug}/${item.slug}-720.webp" srcset="/assets/coloring-pages/${category.slug}/${item.slug}-320.webp 320w, /assets/coloring-pages/${category.slug}/${item.slug}-720.webp 720w" sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 960px) 52vw, 610px" width="${item.width}" height="${item.height}" alt="${escapeHtml(item.alt)}" title="${escapeHtml(item.title)}" fetchpriority="high" decoding="async"></picture><figcaption>${escapeHtml(item.alt)}</figcaption></figure><div class="detail-panel"><p class="eyebrow">${escapeHtml(category.label)}</p><h1>${escapeHtml(item.title)}</h1><p class="lead">${escapeHtml(item.description)}</p><div class="tag-row"><span class="tag">${escapeHtml(item.age)}</span><span class="tag">Formato A4</span><span class="tag">Sin registro</span></div><div class="detail-actions"><button class="button" type="button" data-print>${iconPrint}Imprimir dibujo</button><a class="button button-secondary" href="/assets/coloring-pages/${category.slug}/${item.slug}${item.extension}" download="${item.slug}${item.extension}">${iconDownload}Descargar imagen ${fileType}</a></div><p class="download-note">Archivo original en alta resolución para imprimir en casa.</p><ul class="fact-list"><li><span>Categoría</span><strong><a href="/${category.route}/">${escapeHtml(category.name)}</a></strong></li><li><span>Orientación</span><strong>${item.orientation}</strong></li><li><span>Resolución</span><strong>${item.width} × ${item.height} px</strong></li><li><span>Tipo de archivo</span><strong>${fileType}</strong></li></ul></div></div></section><aside class="ad-slot" aria-label="Espacio reservado para publicidad"></aside><section class="section section-tint detail-extra"><div class="container seo-copy"><p class="eyebrow">Consejo de impresión</p><h2>Cómo imprimir este dibujo de ${escapeHtml(lower(category.name))}</h2><p>Pulsa «Imprimir dibujo» y selecciona papel A4, la orientación adecuada y el ajuste a página. El papel normal funciona bien con lápices de colores; para rotuladores recomendamos un papel más grueso.</p><p>${escapeHtml(item.description)} Los niños pueden completar la escena con sus propios colores y detalles.</p></div></section><section class="section detail-extra" aria-labelledby="relacionados-${item.slug}"><div class="container"><div class="section-header align-left"><p class="eyebrow">Más dibujos</p><h2 id="relacionados-${item.slug}">Más dibujos de ${escapeHtml(lower(category.name))} para colorear</h2></div><div class="coloring-grid">${related.map((entry) => coloringCard(category, entry)).join("")}</div></div></section></main>${footer(categories)}`;
    write(path.join(dist, ...category.route.split("/"), item.slug, "index.html"), documentHtml({ title: `${item.title} gratis para imprimir | Colorear Paraíso`, description: item.description, canonical: url, ogImage: { url: `${imageBase}-720.webp`, width: Math.min(720, item.width), height: Math.round(Math.min(720, item.width) * item.height / item.width), alt: item.alt }, body, structuredData: structured, bodyClass: "print-coloring" }));
  }
}

const catalogStructured = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dibujos para colorear gratis", url: `${baseUrl}/para-colorear/`, inLanguage: "es", mainEntity: { "@type": "ItemList", numberOfItems: categories.length, itemListElement: categories.map((category, index) => ({ "@type": "ListItem", position: index + 1, name: category.label, url: `${baseUrl}/${category.route}/` })) } };
const catalogBody = `${header("catalog")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Dibujos para colorear" }])}<section class="page-hero"><div class="container"><div><p class="eyebrow">Galería para imprimir</p><h1>Dibujos para colorear gratis</h1><p>Elige entre ${prepared.length} dibujos para colorear en ${categories.length} categorías. Imprime cada lámina o descárgala gratis en alta resolución.</p></div><form class="search-box" action="/para-colorear/#resultados" method="get" role="search" data-search-form id="buscar"><label class="search-field">${iconSearch}<span class="visually-hidden">Buscar dibujos para colorear</span><input type="search" name="q" placeholder="Buscar gatos, dinosaurios, coches…" autocomplete="off" data-catalog-search></label><button class="button" type="submit">Buscar</button></form></div></section><section class="section section-tint" aria-labelledby="categorias" data-category-section><div class="container"><div class="section-header"><p class="eyebrow">Categorías</p><h2 id="categorias">Elige tu tema favorito</h2></div><div class="category-grid">${categories.map(categoryCard).join("")}</div></div></section><section class="section hidden" aria-labelledby="resultados" data-results-section><div class="container"><div class="catalog-toolbar"><h2 id="resultados" data-results-heading>Resultados de búsqueda</h2><span class="result-count" data-result-count></span></div><div class="coloring-grid" data-catalog>${prepared.map(({ category, item }) => coloringCard(category, item)).join("")}</div><div class="empty-state hidden" data-empty-state><h3>No hemos encontrado resultados</h3><p>Prueba con una palabra más corta, como «gato», «dinosaurio», «coche» o «princesa».</p></div></div></section><aside class="ad-slot" aria-label="Espacio reservado para publicidad"></aside></main>${footer(categories)}`;
write(path.join(dist, "para-colorear", "index.html"), documentHtml({ title: "Dibujos para colorear gratis para imprimir | Colorear Paraíso", description: "Elige dibujos para colorear gratis, listos para imprimir o descargar. Descubre cientos de diseños infantiles organizados por temas para todas las edades.", canonical: `${baseUrl}/para-colorear/`, ogImage: { url: `${baseUrl}/assets/categories/${categories[0].slug}-cover-640.webp`, width: 640, height: 640, alt: categories[0].coverAlt }, body: catalogBody, structuredData: catalogStructured }));

const homeSlugs = ["dinosaurios", "gatos", "perros", "coches", "unicornios", "princesas", "navidad", "pascua", "tractores", "universo", "caballos", "formula-1"];
const homeCategories = homeSlugs.map((slug) => categories.find((category) => category.slug === slug)).filter(Boolean);
const featuredCategory = categories.find((category) => category.slug === "dinosaurios") || categories[0];
const featuredItem = featuredCategory.items[0];
const featureCategory = categories.find((category) => category.slug === "gatos") || categories[1];
const featureItem = featureCategory.items[Math.min(2, featureCategory.items.length - 1)];
const homeCoverUrl = `${baseUrl}/assets/homepage/${homeCover.basename}-1024.webp`;
const homeStructured = { "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", name: "Colorear Paraíso", url: `${baseUrl}/`, inLanguage: "es", image: { "@id": `${baseUrl}/#home-cover` }, potentialAction: { "@type": "SearchAction", target: `${baseUrl}/para-colorear/?q={search_term_string}`, "query-input": "required name=search_term_string" } }, { "@type": "ImageObject", "@id": `${baseUrl}/#home-cover`, name: homeCover.title, caption: homeCover.alt, description: "Dibujo en blanco y negro de un ciervo junto a montañas, bosque y río para imprimir en A4.", contentUrl: `${baseUrl}/assets/homepage/${homeCover.basename}.jpg`, thumbnailUrl: homeCoverUrl, encodingFormat: "image/jpeg", width: homeCover.width, height: homeCover.height, representativeOfPage: true, copyrightNotice: "Colorear Paraíso" }] };
const homeBody = `${header("home")}<main id="contenido-principal"><section class="hero"><div class="hero-inner"><div class="hero-copy"><p class="eyebrow">Imprime. Colorea. Diviértete.</p><h1>Dibujos para colorear gratis</h1><p class="lead">Descubre cientos de dibujos para colorear gratis para niños. Descarga tus favoritos, imprímelos en casa y empieza a colorear sin registro.</p><form class="search-box" action="/para-colorear/#resultados" method="get" role="search" data-search-form><label class="search-field">${iconSearch}<span class="visually-hidden">Buscar dibujos para colorear</span><input id="home-search" type="search" name="q" placeholder="Buscar gatos, dinosaurios, coches…" autocomplete="off"></label><button class="button" type="submit">Buscar dibujo</button></form><div class="hero-points"><span>${prepared.length} dibujos</span><span>${categories.length} categorías</span><span>Sin registro</span></div></div><div class="hero-visual"><div class="paper-stack"><img src="/assets/homepage/${homeCover.basename}-720.webp" srcset="/assets/homepage/${homeCover.basename}-320.webp 320w, /assets/homepage/${homeCover.basename}-720.webp 720w, /assets/homepage/${homeCover.basename}-1024.webp 1024w" sizes="(max-width: 720px) 76vw, 345px" width="${homeCover.width}" height="${homeCover.height}" alt="${escapeHtml(homeCover.alt)}" title="${escapeHtml(homeCover.title)}" fetchpriority="high" decoding="async"></div><span class="paper-label">Listo para imprimir en A4</span></div></div></section><section class="section" aria-labelledby="populares"><div class="container"><div class="section-header"><p class="eyebrow">Para pequeños artistas</p><h2 id="populares">Categorías populares para colorear</h2><p>Animales, cuentos, coches, espacio y dibujos especiales para cada época del año.</p></div><div class="category-grid">${homeCategories.map(categoryCard).join("")}</div><div class="section-action"><a class="button button-secondary" href="/para-colorear/">Ver las ${categories.length} categorías</a></div></div></section><aside class="ad-slot" aria-label="Espacio reservado para publicidad"></aside><section class="section section-tint"><div class="container feature-grid"><div class="feature-paper"><img src="/assets/coloring-pages/${featureCategory.slug}/${featureItem.slug}-720.webp" srcset="/assets/coloring-pages/${featureCategory.slug}/${featureItem.slug}-320.webp 320w, /assets/coloring-pages/${featureCategory.slug}/${featureItem.slug}-720.webp 720w" sizes="(max-width: 720px) calc(100vw - 64px), 52vw" width="${featureItem.width}" height="${featureItem.height}" loading="lazy" decoding="async" alt="${escapeHtml(featureItem.alt)}" title="${escapeHtml(featureItem.title)}"></div><div class="feature-copy"><p class="eyebrow">Dibujo del día</p><h2>${escapeHtml(featureItem.title)}</h2><p>${escapeHtml(featureItem.description)}</p><ul class="check-list"><li>Impresión sencilla en papel A4</li><li>Archivo original en alta resolución</li><li>Descarga inmediata sin registro</li></ul><a class="button" href="/${featureCategory.route}/${featureItem.slug}/">Abrir dibujo</a></div></div></section><section class="section" id="para-familias"><div class="container"><div class="section-header"><p class="eyebrow">Por qué colorear</p><h2>Un momento creativo y tranquilo para los niños</h2><p>Colorear desarrolla la motricidad fina, la concentración y el sentido del color. Solo tienes que elegir un dibujo e imprimirlo.</p></div><div class="benefit-grid"><div class="benefit-card"><strong>Motricidad fina</strong><p>Trabajar con lápices de colores mejora el agarre y la precisión de los movimientos.</p></div><div class="benefit-card"><strong>Imaginación propia</strong><p>Cada dibujo puede cobrar vida con nuevos colores y una historia diferente.</p></div><div class="benefit-card"><strong>Un momento de calma</strong><p>La actividad concentrada ayuda a los niños a relajarse y bajar el ritmo.</p></div></div></div></section></main>${footer(categories)}`;
write(path.join(dist, "index.html"), documentHtml({ title: "Dibujos para colorear gratis para imprimir | Colorear Paraíso", description: "Descubre cientos de dibujos para colorear gratis para niños. Descarga tus favoritos, imprímelos en casa y disfruta coloreando sin registro.", canonical: `${baseUrl}/`, ogImage: { url: homeCoverUrl, width: homeCover.width, height: homeCover.height, alt: homeCover.alt }, body: homeBody, structuredData: homeStructured }));

const notFoundBody = `${header("")}<main id="contenido-principal"><section class="page-hero"><div class="container"><div><p class="eyebrow">Error 404</p><h1>No encontramos esta página</h1><p>Es posible que el enlace ya no sea válido o que la dirección esté mal escrita. Consulta todas las categorías y elige un dibujo para imprimir.</p><p><a class="button" href="/para-colorear/">Ver dibujos para colorear</a></p></div></div></section></main>${footer(categories)}`;
const notFoundStructured = { "@context": "https://schema.org", "@type": "WebPage", name: "Página no encontrada", inLanguage: "es" };
write(path.join(dist, "404.html"), documentHtml({ title: "Página no encontrada | Colorear Paraíso", description: "No encontramos la página solicitada. Explora nuestros dibujos para colorear gratis y listos para imprimir.", canonical: null, ogImage: null, body: notFoundBody, structuredData: notFoundStructured, robots: "noindex,follow" }));

const privacyUrl = `${baseUrl}/politica-de-privacidad/`;
const privacyBody = `${header("")}<main id="hlavny-obsah">${breadcrumbs([{ name: "Domov", href: "/" }, { name: "Zásady ochrany osobných údajov" }])}<section class="page-hero legal-hero"><div class="container"><div><p class="eyebrow">Súkromie a osobné údaje</p><h1>Zásady ochrany osobných údajov</h1><p>Tu nájdete informácie o tom, aké údaje môžeme pri prevádzke webu spracúvať, na aký účel a aké máte práva.</p></div><div class="legal-updated"><span>Platné od</span><strong>6. 10. 2026</strong></div></div></section><section class="section legal-section"><div class="container legal-layout"><aside class="legal-nav" aria-label="Obsah zásad"><strong>Obsah</strong><ol><li><a href="#prevadzkovatel">Prevádzkovateľ</a></li><li><a href="#ake-udaje">Aké údaje spracúvame</a></li><li><a href="#google-sluzby">Google služby a reklama</a></li><li><a href="#cookies">Cookies a súhlas</a></li><li><a href="#prijemcovia">Príjemcovia a prenosy</a></li><li><a href="#prava">Vaše práva</a></li><li><a href="#deti">Ochrana detí</a></li><li><a href="#zabezpecenie">Zabezpečenie a zmeny</a></li></ol></aside><article class="legal-copy"><p class="legal-intro">Tieto zásady opisujú spracúvanie osobných údajov na webových stránkach <strong>raj-omalovanek.sk</strong> a <strong>rajomalovanek.sk</strong>. Omaľovánky si môžete prezerať, tlačiť a sťahovať bez registrácie. Web nemá používateľské účty, komentáre, hodnotenia, newsletter ani kontaktný formulár.</p><section id="prevadzkovatel"><h2>1. Prevádzkovateľ</h2><p>Prevádzkovateľom webu a správcom osobných údajov je <strong>obchodná firma Lukáš Jágr</strong>, so sídlom Praha – Libeň, Kurta Konráda 2445/9, 190 00, Česká republika, IČO 01179462.</p><p>Otázky a žiadosti týkajúce sa osobných údajov môžete poslať písomne na uvedenú adresu prevádzkovateľa.</p></section><section id="ake-udaje"><h2>2. Aké údaje spracúvame</h2><h3>Technické prevádzkové údaje</h3><p>Pri návšteve webu môže hosting a bezpečnostná infraštruktúra automaticky zaznamenať IP adresu, dátum a čas požiadavky, navštívenú URL, informácie o prehliadači a zariadení, odkazujúcu stránku a technický stav požiadavky. Údaje používame na bezpečnú a spoľahlivú prevádzku, odhaľovanie zneužitia a riešenie technických chýb.</p><p>Právnym základom je oprávnený záujem podľa čl. 6 ods. 1 písm. f) GDPR. Serverové záznamy uchovávame iba počas obdobia potrebného na uvedené účely, spravidla najviac niekoľko týždňov, ak bezpečnostný incident alebo právna povinnosť nevyžaduje dlhšie uchovanie.</p><h3>Údaje, ktoré nám poskytnete</h3><p>Web v súčasnosti nezbiera údaje prostredníctvom registrácie ani formulárov. Ak nás kontaktujete mimo webu, spracujeme kontaktné údaje a obsah komunikácie v rozsahu potrebnom na vybavenie správy. Právnym základom je oprávnený záujem odpovedať na otázku, prípadne vykonanie opatrení pred uzatvorením zmluvy. Bežnú komunikáciu uchovávame najviac jeden rok od vybavenia, ak z nej nevznikne právny vzťah alebo potreba dlhšieho uchovania.</p></section><section id="google-sluzby"><h2>3. Google Analytics, Search Console a AdSense</h2><h3>Google Analytics</h3><p>Po udelení súhlasu môžeme používať Google Analytics na meranie návštevnosti a zlepšovanie obsahu. Služba môže spracúvať online identifikátory a údaje o používaní webu, napríklad navštívené stránky, približnú polohu odvodenú z IP adresy, typ zariadenia, zdroj návštevy a interakcie so stránkou. Google Analytics 4 IP adresy neukladá ani nezaznamenáva. Používateľské a udalostné údaje nastavíme na uchovanie najviac 14 mesiacov; súhrnné reporty môžu zostať dostupné dlhšie.</p><p>Právnym základom analytického merania je váš súhlas podľa čl. 6 ods. 1 písm. a) GDPR. Súhlas môžete kedykoľvek odvolať v nastavení cookies.</p><h3>Google Search Console</h3><p>Google Search Console používame na technické vyhodnocovanie viditeľnosti webu vo výsledkoch vyhľadávania. Dostávame najmä súhrnné údaje o vyhľadávacích dopytoch, zobrazeniach, kliknutiach, priemernej pozícii, indexovaní a technických chybách stránok. Search Console sama na tomto webe návštevníkom nenastavuje analytické cookies; reporty vznikajú z prevádzky vyhľadávača Google. Údaje používame na základe oprávneného záujmu zlepšovať dostupnosť, technický stav a obsah webu.</p><h3>Google AdSense</h3><p>Web plánujeme financovať reklamou prostredníctvom Google AdSense. Google a jeho reklamní partneri môžu podľa vašej voľby používať cookies, miestne úložisko, IP adresu, identifikátory zariadenia, údaje o zobrazení reklamy a ďalšie signály na výber, doručenie, meranie a zabezpečenie reklamy a na ochranu pred podvodmi. Personalizované reklamy a súvisiace ukladanie alebo čítanie údajov aktivujeme iba po udelení príslušného súhlasu.</p><p>Podrobnosti o tom, ako Google používa údaje z partnerských webov, nájdete v dokumente <a href="https://policies.google.com/technologies/partner-sites?hl=sk" rel="noopener noreferrer" target="_blank">Ako Google používa informácie z webov a aplikácií</a>. Zoznam aktuálnych reklamných partnerov a účelov bude dostupný priamo v rozhraní na správu súhlasu.</p></section><section id="cookies"><h2>4. Cookies a správa súhlasu</h2><p>Nevyhnutné technológie môžeme používať bez súhlasu, ak sú potrebné na bezpečné fungovanie webu alebo uloženie vašej voľby súhlasu. Analytické a reklamné cookies a podobné technológie používame iba podľa vašej voľby v lište cookies.</p><p>Pri nasadení AdSense použijeme platformu na správu súhlasu (CMP) certifikovanú spoločnosťou Google a podporujúcu IAB Transparency and Consent Framework. Návštevník musí mať možnosť súhlas prijať, odmietnuť aj neskôr zmeniť. Odvolanie súhlasu nemá vplyv na zákonnosť spracúvania pred jeho odvolaním.</p></section><section id="prijemcovia"><h2>5. Príjemcovia údajov a prenosy mimo EHP</h2><p>Údaje nepredávame. V nevyhnutnom rozsahu k nim môžu mať prístup poskytovateľ hostingu a technickej infraštruktúry, dodávatelia zabezpečenia a doručovania obsahu a spoločnosť Google Ireland Limited spolu s relevantnými reklamnými partnermi zobrazenými v CMP.</p><p>Niektorí poskytovatelia môžu údaje spracúvať aj mimo Európskeho hospodárskeho priestoru, najmä v USA. Prenos sa uskutoční iba pri splnení podmienok GDPR, napríklad na základe rozhodnutia Európskej komisie o primeranosti pre certifikované organizácie v rámci EU–US Data Privacy Framework alebo na základe štandardných zmluvných doložiek a doplnkových ochranných opatrení.</p><p>Údaje môžeme poskytnúť aj orgánom verejnej moci, ak nám to ukladá zákon alebo je to potrebné na ochranu právnych nárokov.</p></section><section id="prava"><h2>6. Vaše práva</h2><p>V rozsahu stanovenom GDPR máte právo požadovať prístup k svojim údajom a ich kópiu, opravu nepresných údajov, vymazanie, obmedzenie spracúvania a prenosnosť údajov. Môžete namietať proti spracúvaniu založenému na oprávnenom záujme a kedykoľvek odvolať súhlas.</p><p>Žiadosť môžete poslať na adresu prevádzkovateľa uvedenú vyššie. Na žiadosť odpovieme bez zbytočného odkladu, spravidla do jedného mesiaca. Pred vybavením môžeme primerane overiť vašu totožnosť.</p><p>Máte tiež právo podať sťažnosť dozornému orgánu. V Českej republike je ním <a href="https://uoou.gov.cz/" rel="noopener noreferrer" target="_blank">Úřad pro ochranu osobních údajů</a>, Pplk. Sochora 27, 170 00 Praha 7. Ak máte obvyklý pobyt na Slovensku, môžete sa obrátiť aj na <a href="https://dataprotection.gov.sk/" rel="noopener noreferrer" target="_blank">Úrad na ochranu osobných údajov Slovenskej republiky</a>.</p></section><section id="deti"><h2>7. Ochrana detí</h2><p>Obsah webu je určený na výber a tlač omaľovánok rodičmi a ďalšími dospelými osobami. Od detí vedome nepožadujeme osobné údaje a neposkytujeme im účty ani komunikačné funkcie. Reklamné nastavenia nesmú využívať aktivitu osoby, o ktorej vieme, že je dieťa, na personalizované cielenie. Ak zistíme, že sme osobné údaje dieťaťa získali bez primeraného právneho základu, odstránime ich.</p></section><section id="zabezpecenie"><h2>8. Zabezpečenie, právny rámec a zmeny</h2><p>Web používa šifrované spojenie HTTPS. Prístup k údajom obmedzujeme na osoby a dodávateľov, ktorí ho potrebujú na plnenie svojich úloh, a prijímame primerané technické a organizačné opatrenia.</p><p>Spracúvanie sa riadi najmä nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR) a príslušnými vnútroštátnymi predpismi. Tieto zásady sú platné od 6. 10. 2026. Pri zmene služieb alebo právnych požiadaviek ich môžeme aktualizovať; aktuálne znenie bude vždy zverejnené na tejto stránke.</p></section></article></div></section></main>${footer(categories)}`;
const privacyStructured = { "@context": "https://schema.org", "@type": "WebPage", name: "Zásady ochrany osobných údajov", description: "Informácie o spracúvaní osobných údajov, cookies, Google Analytics, Search Console a Google AdSense na webe Ráj Omalovánek.", url: privacyUrl, inLanguage: "sk", dateModified: "2026-10-06" };
write(path.join(dist, "zasady-ochrany-osobnych-udajov", "index.html"), documentHtml({ title: "Zásady ochrany osobných údajov | Ráj Omalovánek", description: "Ako web Ráj Omalovánek spracúva osobné údaje, technické záznamy a cookies pri používaní Google Analytics, Search Console a Google AdSense.", canonical: privacyUrl, ogImage: null, body: privacyBody, structuredData: privacyStructured }));

const cookiesUrl = `${baseUrl}/politica-de-cookies/`;
const cookiesBody = `${header("")}<main id="hlavny-obsah">${breadcrumbs([{ name: "Domov", href: "/" }, { name: "Zásady cookies" }])}<section class="page-hero legal-hero"><div class="container"><div><p class="eyebrow">Cookies a podobné technológie</p><h1>Zásady cookies</h1><p>Vysvetľujeme, ktoré technológie web používa, na čo slúžia a ako môžete spravovať svoj súhlas.</p></div><div class="legal-updated"><span>Aktualizované</span><strong>6. 10. 2026</strong></div></div></section><section class="section legal-section"><div class="container legal-layout"><aside class="legal-nav" aria-label="Obsah zásad cookies"><strong>Obsah</strong><ol><li><a href="#uvod">Úvod</a></li><li><a href="#co-su-cookies">Čo sú cookies</a></li><li><a href="#kategorie">Kategórie cookies</a></li><li><a href="#pouzivane-sluzby">Používané služby</a></li><li><a href="#suhlas">Súhlas a nastavenie</a></li><li><a href="#prehliadac">Nastavenie prehliadača</a></li><li><a href="#prava">Vaše práva</a></li><li><a href="#kontakt">Prevádzkovateľ</a></li></ol></aside><article class="legal-copy"><p class="legal-intro">Tieto zásady sa vzťahujú na webové stránky <strong>raj-omalovanek.sk</strong> a <strong>rajomalovanek.sk</strong> a na návštevníkov z Európskeho hospodárskeho priestoru. Web je možné používať bez registrácie.</p><section id="uvod"><h2>1. Úvod</h2><p>Web môže používať cookies a podobné technológie potrebné na bezpečné fungovanie, zapamätanie vašich volieb, meranie návštevnosti a zobrazovanie reklamy. Niektoré technológie nastavujeme my, iné môžu po udelení súhlasu používať zapojené tretie strany, najmä spoločnosť Google.</p><p>Analytické a reklamné technológie aktivujeme iba podľa vašej voľby v nástroji na správu súhlasu. Nevyhnutné technológie môžu byť použité bez súhlasu, ak sú potrebné na prenos komunikácie, zabezpečenie webu alebo uloženie vašej voľby.</p></section><section id="co-su-cookies"><h2>2. Čo sú cookies a podobné technológie</h2><h3>Cookies</h3><p>Cookie je malý textový súbor, ktorý web uloží prostredníctvom prehliadača vo vašom zariadení. Pri ďalšej návšteve môže prehliadač uloženú informáciu poslať späť webu alebo príslušnej tretej strane.</p><h3>Miestne úložisko</h3><p>Local storage a podobné úložiská umožňujú webu uložiť vo vašom prehliadači informácie s rovnakým alebo podobným účelom ako cookies, napríklad vašu voľbu súhlasu.</p><h3>Skripty, pixely a webové majáky</h3><p>Skript je časť programového kódu, ktorá zabezpečuje funkcie webu. Pixel alebo webový maják je malý prvok, ktorý môže zaznamenať načítanie stránky alebo reklamy. Ak tieto technológie slúžia na analytiku alebo reklamu, používajú sa iba v súlade s vaším súhlasom a nastavením príslušnej služby.</p></section><section id="kategorie"><h2>3. Kategórie používaných cookies</h2><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Kategória</th><th>Účel</th><th>Právny základ</th></tr></thead><tbody><tr><td><strong>Nevyhnutné</strong></td><td>Bezpečné doručenie webu, ochrana pred zneužitím a uloženie voľby súhlasu. Nezahŕňajú marketing.</td><td>Oprávnený záujem alebo nevyhnutnosť služby</td></tr><tr><td><strong>Analytické</strong></td><td>Meranie návštevnosti, používania stránok a technickej výkonnosti pomocou Google Analytics.</td><td>Súhlas</td></tr><tr><td><strong>Reklamné</strong></td><td>Zobrazenie, obmedzenie opakovania, meranie a podľa vašej voľby personalizácia reklám Google AdSense.</td><td>Súhlas</td></tr></tbody></table></div><p>Web nepoužíva cookies pre používateľské účty, nákupný košík, komentáre, hodnotenia ani newsletter, pretože tieto funkcie neponúka.</p></section><section id="pouzivane-sluzby"><h2>4. Používané služby a orientačný zoznam technológií</h2><p>Konkrétne názvy, poskytovatelia a doby platnosti sa môžu meniť podľa konfigurácie služieb. Aktuálny zoznam dostupný v nástroji na správu súhlasu má prednosť pred týmto orientačným prehľadom.</p><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Služba</th><th>Príklady</th><th>Účel a doba</th></tr></thead><tbody><tr><td><strong>Správa súhlasu</strong></td><td>Cookie alebo miestne úložisko s vašou voľbou</td><td>Nevyhnutné; uchováva sa po dobu určenú použitou CMP, aby sa otázka neopakovala pri každej návšteve.</td></tr><tr><td><strong>Google Analytics 4</strong></td><td><code>_ga</code>, <code>_ga_&lt;ID&gt;</code></td><td>Rozlíšenie návštev a meranie používania po súhlase; typicky najviac 2 roky v prehliadači. Používateľské a udalostné údaje v službe nastavíme najviac na 14 mesiacov.</td></tr><tr><td><strong>Google AdSense</strong></td><td>Cookies a identifikátory domén Google alebo DoubleClick</td><td>Doručenie, frekvenčné obmedzenie, meranie, zabezpečenie a podľa súhlasu personalizácia reklamy; doba sa líši podľa konkrétneho identifikátora a voľby používateľa.</td></tr></tbody></table></div><h3>Google Search Console</h3><p>Search Console používame na súhrnné vyhodnocovanie výkonu webu vo vyhľadávaní. Samotné používanie Search Console nevkladá na tento web analytické cookies návštevníkom. Údaje vznikajú v rámci služby Vyhľadávanie Google.</p><p>Informácie o používaní údajov Googlom nájdete v dokumente <a href="https://policies.google.com/technologies/partner-sites?hl=sk" rel="noopener noreferrer" target="_blank">Ako Google používa informácie z webov a aplikácií</a>. Podrobnosti o reklamných cookies sú uvedené aj v <a href="https://support.google.com/adsense/answer/7549925?hl=sk" rel="noopener noreferrer" target="_blank">pomocníkovi Google AdSense</a>.</p></section><section id="suhlas"><h2>5. Súhlas a jeho správa</h2><p>Pri prvej návšteve sa zobrazí rozhranie s vysvetlením jednotlivých účelov. Môžete prijať všetky voliteľné technológie, odmietnuť ich alebo vybrať len niektoré kategórie. Odmietnutie analytických a reklamných cookies neobmedzí prístup k omaľovánkam.</p><p>Pri nasadení Google AdSense použijeme platformu na správu súhlasu (CMP) certifikovanú spoločnosťou Google a podporujúcu IAB Transparency and Consent Framework. Vaša voľba sa prenesie službám Google prostredníctvom príslušných signálov súhlasu.</p><p>Súhlas môžete kedykoľvek odvolať alebo zmeniť prostredníctvom odkazu na nastavenie cookies, ktorý bude dostupný na webe. Zmena platí do budúcnosti a neovplyvňuje zákonnosť spracúvania pred jej vykonaním.</p></section><section id="prehliadac"><h2>6. Povolenie, blokovanie a odstránenie cookies</h2><p>Cookies môžete odstrániť alebo blokovať aj v nastavení internetového prehliadača. Môžete nastaviť upozornenie pri ukladaní, zablokovať cookies tretích strán alebo vymazať uložené údaje konkrétneho webu. Postup nájdete v pomocníkovi svojho prehliadača.</p><p>Ak vymažete cookie s voľbou súhlasu, web sa vás môže pri ďalšej návšteve opýtať znova. Blokovanie všetkých cookies môže ovplyvniť uloženie vašich preferencií, samotné prezeranie, tlač a sťahovanie omaľovánok však má zostať dostupné.</p></section><section id="prava"><h2>7. Vaše práva</h2><p>V súvislosti s osobnými údajmi máte v rozsahu stanovenom GDPR najmä právo na informácie, prístup, opravu, vymazanie, obmedzenie spracúvania a prenosnosť. Môžete namietať proti spracúvaniu založenému na oprávnenom záujme a kedykoľvek odvolať súhlas.</p><p>Viac informácií nájdete v našich <a href="/zasady-ochrany-osobnych-udajov/">Zásadách ochrany osobných údajov</a>. Máte tiež právo podať sťažnosť na <a href="https://uoou.gov.cz/" rel="noopener noreferrer" target="_blank">Úřad pro ochranu osobních údajů</a> alebo, ak máte obvyklý pobyt na Slovensku, na <a href="https://dataprotection.gov.sk/" rel="noopener noreferrer" target="_blank">Úrad na ochranu osobných údajov Slovenskej republiky</a>.</p></section><section id="kontakt"><h2>8. Prevádzkovateľ a kontakt</h2><p>Prevádzkovateľom webu je <strong>obchodná firma Lukáš Jágr</strong>, so sídlom Praha – Libeň, Kurta Konráda 2445/9, 190 00, Česká republika, IČO 01179462.</p><p>Otázky k používaniu cookies alebo žiadosti týkajúce sa osobných údajov môžete poslať písomne na uvedenú adresu.</p><p>Tieto zásady boli naposledy aktualizované 6. 10. 2026. Pri zmene použitých služieb alebo právnych požiadaviek ich môžeme aktualizovať; aktuálne znenie bude vždy dostupné na tejto stránke.</p></section></article></div></section></main>${footer(categories)}`;
const cookiesStructured = { "@context": "https://schema.org", "@type": "WebPage", name: "Zásady cookies", description: "Informácie o cookies, Google Analytics, Google AdSense a správe súhlasu na webe Ráj Omalovánek.", url: cookiesUrl, inLanguage: "sk", dateModified: "2026-10-06" };
write(path.join(dist, "zasady-cookies", "index.html"), documentHtml({ title: "Zásady cookies | Ráj Omalovánek", description: "Ako web Ráj Omalovánek používa nevyhnutné, analytické a reklamné cookies vrátane Google Analytics a Google AdSense.", canonical: cookiesUrl, ogImage: null, body: cookiesBody, structuredData: cookiesStructured }));

const privacyBodyEs = `${header("")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Política de privacidad" }])}<section class="page-hero legal-hero"><div class="container"><div><p class="eyebrow">Privacidad y datos personales</p><h1>Política de privacidad</h1><p>Explicamos qué datos podemos tratar al gestionar Colorear Paraíso, para qué los usamos y qué derechos tienes.</p></div><div class="legal-updated"><span>Vigente desde</span><strong>12. 10. 2026</strong></div></div></section><section class="section legal-section"><div class="container legal-layout"><aside class="legal-nav" aria-label="Contenido de la política"><strong>Contenido</strong><ol><li><a href="#responsable">Responsable</a></li><li><a href="#datos">Datos tratados</a></li><li><a href="#google">Servicios de Google</a></li><li><a href="#cookies">Cookies</a></li><li><a href="#destinatarios">Destinatarios</a></li><li><a href="#derechos">Tus derechos</a></li><li><a href="#menores">Protección de menores</a></li></ol></aside><article class="legal-copy"><p class="legal-intro">Esta política se aplica a <strong>colorearparaiso.com</strong>. Puedes consultar, imprimir y descargar los dibujos sin registro. El sitio no ofrece cuentas de usuario, comentarios, valoraciones, boletín ni formulario de contacto.</p><section id="responsable"><h2>1. Responsable del tratamiento</h2><p>El responsable es <strong>Lukáš Jágr</strong>, con domicilio en Praha – Libeň, Kurta Konráda 2445/9, 190 00, República Checa, número de identificación 01179462.</p><p>Las consultas sobre privacidad pueden enviarse por escrito a la dirección indicada.</p></section><section id="datos"><h2>2. Datos que tratamos</h2><h3>Datos técnicos</h3><p>El alojamiento y la infraestructura de seguridad pueden registrar automáticamente la dirección IP, fecha y hora, URL visitada, navegador, dispositivo, página de procedencia y estado técnico de la solicitud. Los usamos para prestar el sitio de forma segura, detectar abusos y resolver errores. La base jurídica es el interés legítimo conforme al artículo 6.1.f del RGPD.</p><h3>Datos facilitados voluntariamente</h3><p>El sitio no recoge datos mediante registros o formularios. Si contactas con nosotros fuera del sitio, trataremos tus datos de contacto y el contenido del mensaje únicamente para responder.</p></section><section id="google"><h2>3. Google Analytics, Search Console y AdSense</h2><p>Con tu consentimiento podemos utilizar Google Analytics para medir visitas y mejorar el contenido. Puede tratar identificadores en línea y datos de uso como páginas visitadas, ubicación aproximada, dispositivo, origen de la visita e interacciones.</p><p>Google Search Console nos proporciona información agregada sobre búsquedas, clics, impresiones, indexación y errores técnicos. Su uso no instala por sí mismo cookies analíticas en este sitio.</p><p>El sitio podrá financiarse mediante Google AdSense. Google y sus socios publicitarios pueden utilizar cookies, almacenamiento local, dirección IP, identificadores del dispositivo y datos de visualización para servir, medir y proteger la publicidad. La publicidad personalizada solo se activará con el consentimiento correspondiente.</p><p>Consulta cómo usa Google la información de sitios asociados en <a href="https://policies.google.com/technologies/partner-sites?hl=es" rel="noopener noreferrer" target="_blank">la información oficial de Google</a>.</p></section><section id="cookies"><h2>4. Cookies y consentimiento</h2><p>Las tecnologías estrictamente necesarias pueden utilizarse para la seguridad y para recordar tu elección. Las cookies analíticas y publicitarias solo se utilizarán según tu decisión en el gestor de consentimiento. Para AdSense se utilizará una plataforma de gestión del consentimiento certificada por Google.</p></section><section id="destinatarios"><h2>5. Destinatarios y transferencias</h2><p>No vendemos datos personales. Pueden acceder a ellos, en la medida necesaria, los proveedores de alojamiento, seguridad, distribución de contenidos, Google Ireland Limited y los socios mostrados en el gestor de consentimiento.</p><p>Las transferencias fuera del Espacio Económico Europeo se realizarán únicamente con las garantías exigidas por el RGPD.</p></section><section id="derechos"><h2>6. Tus derechos</h2><p>Puedes solicitar acceso, rectificación, supresión, limitación, portabilidad y oponerte al tratamiento basado en interés legítimo. También puedes retirar tu consentimiento en cualquier momento. Puedes reclamar ante la autoridad de protección de datos de tu residencia o ante la autoridad checa competente.</p></section><section id="menores"><h2>7. Protección de menores</h2><p>El contenido está pensado para que padres y otros adultos elijan e impriman dibujos. No solicitamos conscientemente datos personales a menores ni les proporcionamos cuentas o funciones de comunicación.</p></section></article></div></section></main>${footer(categories)}`;
const privacyStructuredEs = { "@context": "https://schema.org", "@type": "WebPage", name: "Política de privacidad", description: "Información sobre privacidad, Google Analytics, Search Console y Google AdSense en Colorear Paraíso.", url: privacyUrl, inLanguage: "es", dateModified: generatedOn };
write(path.join(dist, "politica-de-privacidad", "index.html"), documentHtml({ title: "Política de privacidad | Colorear Paraíso", description: "Información sobre el tratamiento de datos, cookies, Google Analytics, Search Console y Google AdSense en Colorear Paraíso.", canonical: privacyUrl, ogImage: null, body: privacyBodyEs, structuredData: privacyStructuredEs }));

const cookiesBodyEs = `${header("")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Política de cookies" }])}<section class="page-hero legal-hero"><div class="container"><div><p class="eyebrow">Cookies y tecnologías similares</p><h1>Política de cookies</h1><p>Explicamos qué tecnologías puede utilizar el sitio, para qué sirven y cómo puedes gestionar tu consentimiento.</p></div><div class="legal-updated"><span>Actualizada</span><strong>12. 10. 2026</strong></div></div></section><section class="section legal-section"><div class="container legal-layout"><aside class="legal-nav" aria-label="Contenido de la política de cookies"><strong>Contenido</strong><ol><li><a href="#introduccion">Introducción</a></li><li><a href="#que-son">Qué son las cookies</a></li><li><a href="#categorias-cookies">Categorías</a></li><li><a href="#servicios">Servicios</a></li><li><a href="#consentimiento">Consentimiento</a></li><li><a href="#navegador">Navegador</a></li></ol></aside><article class="legal-copy"><p class="legal-intro">Esta política se aplica a <strong>colorearparaiso.com</strong> y a sus visitantes del Espacio Económico Europeo. El sitio puede utilizarse sin registro.</p><section id="introduccion"><h2>1. Introducción</h2><p>Podemos utilizar cookies y tecnologías similares para ofrecer el sitio de forma segura, recordar preferencias, medir visitas y mostrar publicidad. Las tecnologías analíticas y publicitarias solo se activarán según tu elección.</p></section><section id="que-son"><h2>2. Qué son las cookies</h2><p>Una cookie es un pequeño archivo de texto que el navegador guarda en tu dispositivo. El almacenamiento local cumple funciones similares. Los scripts y píxeles pueden registrar la carga de una página o un anuncio cuando existe la base jurídica correspondiente.</p></section><section id="categorias-cookies"><h2>3. Categorías de cookies</h2><div class="legal-table-wrap"><table class="legal-table"><thead><tr><th>Categoría</th><th>Finalidad</th><th>Base jurídica</th></tr></thead><tbody><tr><td><strong>Necesarias</strong></td><td>Seguridad, entrega del sitio y conservación de la elección de consentimiento.</td><td>Interés legítimo o necesidad técnica</td></tr><tr><td><strong>Analíticas</strong></td><td>Medición de visitas y rendimiento mediante Google Analytics.</td><td>Consentimiento</td></tr><tr><td><strong>Publicitarias</strong></td><td>Entrega, limitación de frecuencia, medición y personalización de anuncios de Google AdSense.</td><td>Consentimiento</td></tr></tbody></table></div></section><section id="servicios"><h2>4. Servicios utilizados</h2><p>Google Analytics puede usar cookies como <code>_ga</code> y <code>_ga_&lt;ID&gt;</code> después del consentimiento. Google AdSense puede utilizar cookies e identificadores de dominios de Google o DoubleClick para servir y medir publicidad. Google Search Console utiliza datos agregados del buscador y no coloca por sí misma cookies analíticas en este sitio.</p></section><section id="consentimiento"><h2>5. Gestión del consentimiento</h2><p>Podrás aceptar, rechazar o configurar las tecnologías opcionales. Rechazar cookies analíticas o publicitarias no impedirá consultar, imprimir o descargar los dibujos. Podrás cambiar tu elección posteriormente desde el enlace de configuración de cookies.</p></section><section id="navegador"><h2>6. Configuración del navegador</h2><p>También puedes eliminar o bloquear cookies desde tu navegador. Si borras la cookie que guarda tu elección, el sitio puede volver a preguntarte en una visita posterior.</p><p>Encontrarás más información en nuestra <a href="/politica-de-privacidad/">Política de privacidad</a>.</p></section></article></div></section></main>${footer(categories)}`;
const cookiesStructuredEs = { "@context": "https://schema.org", "@type": "WebPage", name: "Política de cookies", description: "Información sobre cookies, Google Analytics y Google AdSense en Colorear Paraíso.", url: cookiesUrl, inLanguage: "es", dateModified: generatedOn };
write(path.join(dist, "politica-de-cookies", "index.html"), documentHtml({ title: "Política de cookies | Colorear Paraíso", description: "Cómo utiliza Colorear Paraíso las cookies necesarias, analíticas y publicitarias, incluidas Google Analytics y Google AdSense.", canonical: cookiesUrl, ogImage: null, body: cookiesBodyEs, structuredData: cookiesStructuredEs }));

const aboutUrl = `${baseUrl}/sobre-colorear/`;
const aboutBody = `${header("")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Sobre Colorear Paraíso" }])}<section class="page-hero"><div class="container"><div><p class="eyebrow">Sobre nosotros</p><h1>Colorear Paraíso</h1><p>Un lugar sencillo donde las familias pueden encontrar dibujos para colorear, imprimirlos en casa y disfrutar creando juntas.</p></div></div></section><section class="section"><div class="container seo-copy"><h2>Cientos de dibujos para colorear gratis</h2><p>Preparamos colecciones de dibujos infantiles organizadas por temas para que encuentres rápidamente el diseño adecuado. Todos los dibujos pueden descargarse o imprimirse sin crear una cuenta.</p><p>Colorear ayuda a desarrollar la motricidad fina, la concentración y la imaginación. Nuestro objetivo es ofrecer materiales claros, accesibles y fáciles de usar tanto en casa como en el aula.</p></div></section></main>${footer(categories)}`;
write(path.join(dist, "sobre-colorear", "index.html"), documentHtml({ title: "Sobre Colorear Paraíso", description: "Conoce Colorear Paraíso, una colección de dibujos para colorear gratis, listos para descargar e imprimir en casa o en el aula.", canonical: aboutUrl, ogImage: null, body: aboutBody, structuredData: { "@context": "https://schema.org", "@type": "AboutPage", name: "Sobre Colorear Paraíso", url: aboutUrl, inLanguage: "es" } }));

const animalCategories = categories.filter((category) => category.route.startsWith("para-colorear/animales/"));
const animalsUrl = `${baseUrl}/para-colorear/animales/`;
const animalsBody = `${header("catalog")}<main id="contenido-principal">${breadcrumbs([{ name: "Inicio", href: "/" }, { name: "Dibujos para colorear", href: "/para-colorear/" }, { name: "Animales" }])}<section class="page-hero"><div class="container"><div><p class="eyebrow">Colección de animales</p><h1>Dibujos de animales para colorear</h1><p>Descubre caballos, osos, mariposas, elefantes y muchos más animales para imprimir y colorear gratis.</p></div></div></section><section class="section section-tint"><div class="container"><div class="category-grid">${animalCategories.map(categoryCard).join("")}</div></div></section></main>${footer(categories)}`;
write(path.join(dist, "para-colorear", "animales", "index.html"), documentHtml({ title: "Dibujos de animales para colorear e imprimir gratis", description: "Descubre dibujos de animales para colorear gratis. Elige caballos, osos, mariposas, elefantes y muchos más diseños para imprimir.", canonical: animalsUrl, ogImage: { url: `${baseUrl}/assets/categories/${animalCategories[0].slug}-cover-640.webp`, width: 640, height: 640, alt: animalCategories[0].coverAlt }, body: animalsBody, structuredData: { "@context": "https://schema.org", "@type": "CollectionPage", name: "Dibujos de animales para colorear", url: animalsUrl, inLanguage: "es" } }));

for (const obsoleteDirectory of ["zasady-cookies", "zasady-ochrany-osobnych-udajov"]) {
  fs.rmSync(path.join(dist, obsoleteDirectory), { recursive: true, force: true });
}

const urls = [`${baseUrl}/`, `${baseUrl}/para-colorear/`, animalsUrl, aboutUrl, privacyUrl, cookiesUrl, ...categories.flatMap((category) => [`${baseUrl}/${category.route}/`, ...category.items.map((item) => `${baseUrl}/${category.route}/${item.slug}/`)])];
const imageByUrl = new Map(prepared.map(({ category, item }) => [`${baseUrl}/${category.route}/${item.slug}/`, { loc: `${baseUrl}/assets/coloring-pages/${category.slug}/${item.slug}${item.extension}`, title: item.title, caption: item.alt }]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.map((url) => { const image = imageByUrl.get(url); return `  <url><loc>${url}</loc><lastmod>${generatedOn}</lastmod>${image ? `<image:image><image:loc>${image.loc}</image:loc><image:title>${escapeHtml(image.title)}</image:title><image:caption>${escapeHtml(image.caption)}</image:caption></image:image>` : ""}</url>`; }).join("\n")}\n</urlset>\n`;
write(path.join(dist, "sitemap.xml"), sitemap);
write(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
write(path.join(dist, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: SAMEORIGIN\n\n/assets/*\n  Cache-Control: public, max-age=86400\n`);
write(path.join(dist, "_redirects"), `/abeceda/ /para-colorear/alfabeto/ 301\n/cisla/ /para-colorear/numeros/ 301\n/omalovanky-brouci/ /para-colorear/insectos/ 301\n/omalovanky-ryby/ /para-colorear/animales/peces/ 301\n/omalovanky-ke-stazeni/ /para-colorear/ 301\n/privacy-policy/ /politica-de-privacidad/ 301\n/zasady-ochrany-soukromi/ /politica-de-privacidad/ 301\n/kontakt/ /sobre-colorear/ 301\n/para-colorear/hadas/ /para-colorear/princesas/ 301\n/para-colorear/ciudades/ /para-colorear/casas/ 301\n/para-colorear/indios/ /para-colorear/soldados/ 301\n/home_zaloha/ / 301\n/about_zaloha/ /sobre-colorear/ 301\n/about_zaloha-2/ /sobre-colorear/ 301\n/kategorie_template/ /para-colorear/ 301\n/01_sablonaomalovanky/ /para-colorear/ 301\n/sample-page/ / 301\n/test/ / 301\n/testovanie/ / 301\n/no-access/ / 301\n/clanky/ / 301\n/bludiste/ /para-colorear/ 301\n/prijatie/ / 301\n/program/ / 301\n/vzdelavaci/ / 301\n/spojovacky/ /para-colorear/ 301\n/vystrihovanky/ /para-colorear/ 301\n/vystrihovanky-zvirata/ /para-colorear/animales/ 301\n/hello-world/ / 301\n/category/uncategorized/ /para-colorear/ 301\n/author/admin/ / 301\n`);
write(path.join(root, "data/generated-catalog.json"), `${JSON.stringify({ generatedOn, categories }, null, 2)}\n`);

console.log(`Creadas ${categories.length} categorías y ${prepared.length} páginas de dibujos para colorear.`);
