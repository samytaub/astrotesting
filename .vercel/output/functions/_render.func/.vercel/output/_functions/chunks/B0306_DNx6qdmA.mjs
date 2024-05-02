const B0306 = new Proxy({"src":"/_astro/B0306.Ddan48rA.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/B0306.jpg";
							}
							
							return target[name];
						}
					});

export { B0306 as default };
