/* empty css                          */
import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, s as spreadAttributes, i as renderComponent, u as unescapeHTML, j as Fragment, k as renderHead, l as renderSlot } from '../astro_DGP0R1KN.mjs';
import 'kleur/colors';
import 'clsx';
import { getIconData, iconToSVG } from '@iconify/utils';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { and, eq, isDbError } from '@astrojs/db/dist/runtime/virtual.js';
/* empty css                          */

const $$Astro$3 = createAstro("https://example.com");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description } = Astro2.props;
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Font --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"><!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(description, "content")}>`;
}, "/Users/thomasgysemans/Documents/tutorials/astro/custom-blog/src/components/BaseHead.astro", void 0);


const cache = /* @__PURE__ */ new WeakMap();

const $$Astro$2 = createAstro("https://example.com");
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Icon;
  class AstroIconError extends Error {
    constructor(message) {
      super(message);
    }
  }
  const req = Astro2.request;
  const { name = "", title, "is:inline": inline = false, ...props } = Astro2.props;
  const map = cache.get(req) ?? /* @__PURE__ */ new Map();
  const i = map.get(name) ?? 0;
  map.set(name, i + 1);
  cache.set(req, map);
  const includeSymbol = !inline && i === 0;
  let [setName, iconName] = name.split(":");
  if (!setName && iconName) {
    const err = new AstroIconError(`Invalid "name" provided!`);
    throw err;
  }
  if (!iconName) {
    iconName = setName;
    setName = "local";
    if (!icons[setName]) {
      const err = new AstroIconError('Unable to load the "local" icon set!');
      throw err;
    }
    if (!(iconName in icons[setName].icons)) {
      const err = new AstroIconError(`Unable to locate "${name}" icon!`);
      throw err;
    }
  }
  const collection = icons[setName];
  if (!collection) {
    const err = new AstroIconError(`Unable to locate the "${setName}" icon set!`);
    throw err;
  }
  const iconData = getIconData(collection, iconName ?? setName);
  if (!iconData) {
    const err = new AstroIconError(`Unable to locate "${name}" icon!`);
    throw err;
  }
  const id = `ai:${collection.prefix}:${iconName ?? setName}`;
  if (props.size) {
    props.width = props.size;
    props.height = props.size;
    delete props.size;
  }
  const renderData = iconToSVG(iconData);
  const normalizedProps = { ...renderData.attributes, ...props };
  const normalizedBody = renderData.body;
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(normalizedProps)}${addAttribute(name, "data-icon")}> ${title && renderTemplate`<title>${title}</title>`} ${inline ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "id": id }, { "default": ($$result2) => renderTemplate`${unescapeHTML(normalizedBody)}` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${includeSymbol && renderTemplate`<symbol${addAttribute(id, "id")}>${unescapeHTML(normalizedBody)}</symbol>`}<use${addAttribute(`#${id}`, "xlink:href")}></use> ` })}`} </svg>`;
}, "/Users/thomasgysemans/Documents/tutorials/astro/custom-blog/node_modules/astro-icon/components/Icon.astro", void 0);

const $$Astro$1 = createAstro("https://example.com");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const pn = Astro2.url.pathname;
  const { wide, title } = Astro2.props;
  const pages = [
    { href: "/", name: "Home" },
    { href: "/blog", name: "Blog" },
    { href: "/about", name: "About" }
  ];
  return renderTemplate`<html lang="en" class="text-[#0f131f] dark:text-white"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": title, "description": "Some random description" })}${renderHead()}</head> <body class="min-h-screen m-0 bg-[#f5f6f9] dark:bg-sky-950"> <header class="bg-white dark:bg-[#1c1e26] w-full h-[10vh] px-8 grid grid-cols-3 items-center"> <h1 class="text-2xl font-bold">Astro Blog</h1> <nav class="h-full flex justify-center"> <ul class="flex p-0 [&_a]:text-xl [&_a]:mx-3"> ${pages.map((p) => renderTemplate`<li> <a${addAttribute(p.href, "href")}${addAttribute(`c-nav-link ${p.href === pn ? "active" : ""}`, "class")}> ${p.name} </a> </li>`)} </ul> </nav> <nav> <ul class="flex p-0 justify-end"> <li class="mr-4"> <a href="/login" class="text-4xl">${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:user-circle-outline" })}</a> </li> <li> <a href="https://github.com/ThomasGysemans" target="_blank" class="text-4xl"> ${renderComponent($$result, "Icon", $$Icon, { "name": "mdi:github" })} </a> </li> </ul> </nav> </header> <main class="flex justify-center"> <div${addAttribute(["mt-10", { "w-3/6": !wide, "w-full": wide }], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div> </main> </body></html>`;
}, "/Users/thomasgysemans/Documents/tutorials/astro/custom-blog/src/layouts/PageLayout.astro", void 0);

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN ?? "b769de902941d9ceedcfc055c46ffca380a17442:qhxqyr1wkmt0pophoqmbe3swcm7b", {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://example.com", "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const User = asDrizzleTable("User", { "columns": { "id": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "id", "collection": "User", "primaryKey": true } }, "email": { "type": "text", "schema": { "unique": true, "deprecated": false, "name": "email", "collection": "User", "primaryKey": false, "optional": false } }, "username": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "username", "collection": "User", "primaryKey": false, "optional": false } }, "password": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "password", "collection": "User", "primaryKey": false, "optional": false } } }, "indexes": { "User_email_id_idx": { "on": ["email", "id"], "unique": true } }, "deprecated": false }, false);

function showFormError(result) {
  return typeof result.error === "string" ? result.error : "Une erreur s'est produite";
}

async function findUser(input) {
  const result = await db.select({
    id: User.id,
    email: User.email,
    username: User.email
  }).from(User).where(and(
    eq(User.email, input.email),
    eq(User.password, input.password)
  )).execute();
  if (result.length > 0) {
    return result[0];
  } else {
    return void 0;
  }
}

const $$Astro = createAstro("https://example.com");
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  console.log("production");
  const formResult = {};
  if (Astro2.request.method === "POST") {
    try {
      const formData = await Astro2.request.formData();
      const email = formData.get("email").trim();
      const password = formData.get("password");
      const user = await findUser({ email, password });
      if (!user) {
        formResult.error = true;
      } else {
        formResult.user = user;
      }
    } catch (e) {
      if (isDbError(e)) {
        formResult.error = true;
      } else {
        formResult.error = true;
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Login", "data-astro-cid-sgpqyurt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="font-bold text-5xl mb-10 text-center" data-astro-cid-sgpqyurt>Se connecter</h1> <div class="flex justify-center w-full" data-astro-cid-sgpqyurt> <form class="flex flex-col items-center w-2/4 min-w-[200px] max-w-[350px] space-y-5" method="post" data-astro-cid-sgpqyurt> <div data-astro-cid-sgpqyurt> <label for="email" data-astro-cid-sgpqyurt>Email</label> <input type="email" id="email" name="email" placeholder="Adresse mail" required data-astro-cid-sgpqyurt> </div> <div data-astro-cid-sgpqyurt> <label for="password" data-astro-cid-sgpqyurt>Mot de passe</label> <input type="password" id="password" name="password" placeholder="Mot de passe" required data-astro-cid-sgpqyurt> </div> ${formResult.error && renderTemplate`<p class="text-red-500 text-center mb-5" data-astro-cid-sgpqyurt> ${showFormError(formResult)} </p>`} <button class="bg-stone-800 hover:bg-stone-950 text-white rounded-sm px-4 py-2 w-full" data-astro-cid-sgpqyurt>Se connecter</button> </form> </div> ` })} `;
}, "/Users/thomasgysemans/Documents/tutorials/astro/custom-blog/src/pages/login.astro", void 0);
const $$file = "/Users/thomasgysemans/Documents/tutorials/astro/custom-blog/src/pages/login.astro";
const $$url = "/login";

const login = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PageLayout as $, User as U, $$Icon as a, db as d, login as l };