module.exports = {
	content: ['./index.html', './src/**/*.tsx'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
