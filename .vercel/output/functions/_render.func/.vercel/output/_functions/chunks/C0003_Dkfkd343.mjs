const C0003 = new Proxy({"src":"/_astro/C0003.D0B0xWvX.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/C0003.jpg";
							}
							
							return target[name];
						}
					});

export { C0003 as default };
