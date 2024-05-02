const C0011 = new Proxy({"src":"/_astro/C0011.C_oeGLtn.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/C0011.jpg";
							}
							
							return target[name];
						}
					});

export { C0011 as default };
