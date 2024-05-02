const B0301 = new Proxy({"src":"/_astro/B0301.DR-oMaoO.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0301.jpg";
							}
							
							return target[name];
						}
					});

export { B0301 as default };
