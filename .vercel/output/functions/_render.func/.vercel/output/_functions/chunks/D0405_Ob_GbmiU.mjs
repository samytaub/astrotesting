const D0405 = new Proxy({"src":"/_astro/D0405.CTF3hdVS.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/D0405.jpg";
							}
							
							return target[name];
						}
					});

export { D0405 as default };
