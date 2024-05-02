const C0008 = new Proxy({"src":"/_astro/C0008.CW-MSSLE.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/C0008.jpg";
							}
							
							return target[name];
						}
					});

export { C0008 as default };
