const P460 = new Proxy({"src":"/_astro/P460.Dv06ASHG.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P460.jpg";
							}
							
							return target[name];
						}
					});

export { P460 as default };
