/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Montserrat'],
			},
			colors: {
				moradobasico: "#5d55ae",
				navbarbackground: "#5d55ae",
				fondologo: "#b39ddb",
				moradobasico: "#5d55ae",
				moradobasicoOscuro: "#484284",
				moradobasicoTransparente: 'rgba(93, 85, 174, 0.4)',
				letraofertas: "yellow",
				fondoSideBar: "#ebeaf9",
				fondoSideBarTr: 'rgb(235, 234, 243, 0.7)',
				fondoOpcionSideBar: "#c2bfe4",
				fondoSubOpcionSideBar: "#dedcef",
				bordePrecio: 'rgb(163, 152, 193)',
				colorPrecio: 'rgb(41, 18, 105)',
				fondoPrecio: 'white',
				fondoOferta: 'red',
				fondoInformativo: 'rgb(27, 97, 124)',
				fondoVelo: 'rgba(255, 255, 255, 0.8)'
			}
		},
		backgroundImage: {
			'fondoLogoImg': "url('/src/img/banners/TramaPuntosHorizontal.png')",
			'imageBodyBackgrund': "url('/src/img/banners/fondologocomprimido.jpg')",
		},
	},
	plugins: [],
}