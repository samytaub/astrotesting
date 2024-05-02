const P0075 = new Proxy({"src":"/_astro/P0075.D3PDXoOQ.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P0075.jpg";
							}
							
							return target[name];
						}
					});

export { P0075 as default };
