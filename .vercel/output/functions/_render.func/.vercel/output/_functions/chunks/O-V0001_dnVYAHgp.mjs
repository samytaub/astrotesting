const OV0001 = new Proxy({"src":"/_astro/O-V0001.D9yJH5UI.jpg","width":965,"height":956,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "E:/Curso HTML-CSS/pijastr/src/img/productos/O-V0001.jpg";
							}
							
							return target[name];
						}
					});

export { OV0001 as default };
