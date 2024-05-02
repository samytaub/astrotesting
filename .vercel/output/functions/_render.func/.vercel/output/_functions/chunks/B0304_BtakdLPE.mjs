const B0304 = new Proxy({"src":"/_astro/B0304.NzbSCLPf.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0304.jpg";
							}
							
							return target[name];
						}
					});

export { B0304 as default };
