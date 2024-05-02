const V0001 = new Proxy({"src":"/_astro/V0001.Cmz9GdhN.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/V0001.jpg";
							}
							
							return target[name];
						}
					});

export { V0001 as default };
