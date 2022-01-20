export const shuffle = <T>(array: T[], len = array.length) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}

	return array.slice(0, len)
}
