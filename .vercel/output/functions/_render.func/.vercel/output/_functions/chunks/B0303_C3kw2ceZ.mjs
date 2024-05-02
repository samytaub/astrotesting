const B0303 = new Proxy({"src":"/_astro/B0303.DrrMqRjr.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0303.jpg";
							}
							
							return target[name];
						}
					});

export { B0303 as default };
