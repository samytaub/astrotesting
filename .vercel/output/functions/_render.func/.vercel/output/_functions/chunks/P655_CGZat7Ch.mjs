const P655 = new Proxy({"src":"/_astro/P655.wEzBgcU4.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P655.jpg";
							}
							
							return target[name];
						}
					});

export { P655 as default };