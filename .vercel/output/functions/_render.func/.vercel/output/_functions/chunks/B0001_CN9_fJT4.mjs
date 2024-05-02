const B0001 = new Proxy({"src":"/_astro/B0001.Q2qwBfjB.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0001.jpg";
							}
							
							return target[name];
						}
					});

export { B0001 as default };
