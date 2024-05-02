const B0302 = new Proxy({"src":"/_astro/B0302.CCVE-Kwm.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0302.jpg";
							}
							
							return target[name];
						}
					});

export { B0302 as default };
