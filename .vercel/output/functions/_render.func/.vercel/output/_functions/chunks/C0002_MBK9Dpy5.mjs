const C0002 = new Proxy({"src":"/_astro/C0002.BRBLQfdp.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/C0002.jpg";
							}
							
							return target[name];
						}
					});

export { C0002 as default };
