const B0300 = new Proxy({"src":"/_astro/B0300.DeByY-ZJ.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0300.jpg";
							}
							
							return target[name];
						}
					});

export { B0300 as default };
