/* empty css                            */
import { e as createComponent, r as renderTemplate, i as renderComponent, h as createAstro, m as maybeRenderHead } from '../astro_DYzw0DtZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as generateDB, a as $$Layout } from './_grupo__C0dUDuKu.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const queryParams = Object.fromEntries(Astro2.url.searchParams.entries());
  console.log("Query Params====> ", queryParams, queryParams.bd);
  generateDB();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tiendas Pijamas" }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<main></main> ` })}`;
}, "E:/Curso HTML-CSS/pijastr/src/pages/index.astro", void 0);

const $$file = "E:/Curso HTML-CSS/pijastr/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
