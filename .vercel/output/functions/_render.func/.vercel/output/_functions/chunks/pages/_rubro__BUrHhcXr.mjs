/* empty css                            */
import { e as createComponent, r as renderTemplate, i as renderComponent, h as createAstro, m as maybeRenderHead } from '../astro_DYzw0DtZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import { g as generateDB, p as productosactivos, $ as $$ProductCard, a as $$Layout } from './_grupo__op7kLfsp.mjs';

const $$Astro = createAstro();
const $$rubro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$rubro;
  !productosactivos ? await generateDB() : console.log("No se requiere bajar la Base de Datos");
  const { rubro } = Astro2.params;
  const queryParams = Object.fromEntries(Astro2.url.searchParams.entries());
  console.log("Query Params====> ", queryParams);
  var displayProducts = productosactivos.filter((producto) => rubro.toUpperCase() === producto[1]).filter(
    (producto) => queryParams?.oferta === "true" ? producto[7] ? true : false : true
  ).map((producto) => {
    const keys = [
      "ref",
      "gru",
      "subg",
      "pre",
      "act",
      "preX",
      "preY",
      "preOfe",
      "ofeX",
      "ofeY",
      "ofeColor",
      "il1",
      "il2",
      "il3",
      "infX",
      "infY",
      "infColor"
    ];
    const productObj = keys.reduce((obj, key, index) => {
      obj[key] = producto[index];
      return obj;
    }, {});
    return productObj;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Tiendas Pijamas" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-4
          md:px-24
          pb-32
          w-full
          h-lvh
          grid
          grid-cols-2
          md:grid-cols-4
          gap-2 md:gap-6
          overflow-scroll
          justify-start
          items-start
          text-sm
          object-contain"> ${displayProducts.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": product })}`)} </div> ` })}`;
}, "E:/Curso HTML-CSS/pijastr/src/pages/display/[rubro].astro", void 0);

const $$file = "E:/Curso HTML-CSS/pijastr/src/pages/display/[rubro].astro";
const $$url = "/display/[rubro]";

export { $$rubro as default, $$file as file, $$url as url };
