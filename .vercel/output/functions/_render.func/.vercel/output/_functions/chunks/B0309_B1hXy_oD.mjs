const B0309 = new Proxy({"src":"/_astro/B0309.C6_O7rV1.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0309.jpg";
							}
							
							return target[name];
						}
					});

export { B0309 as default };
