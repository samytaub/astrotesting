const P0077 = new Proxy({"src":"/_astro/P0077.DuU5KXYp.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P0077.jpg";
							}
							
							return target[name];
						}
					});

export { P0077 as default };
