const C0010 = new Proxy({"src":"/_astro/C0010.1uXjJgKe.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/C0010.jpg";
							}
							
							return target[name];
						}
					});

export { C0010 as default };
