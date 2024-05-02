const P0074 = new Proxy({"src":"/_astro/P0074.CSRN8FSD.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P0074.jpg";
							}
							
							return target[name];
						}
					});

export { P0074 as default };
