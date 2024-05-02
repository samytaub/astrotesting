const P458 = new Proxy({"src":"/_astro/P458.BWkEatfR.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/P458.jpg";
							}
							
							return target[name];
						}
					});

export { P458 as default };
