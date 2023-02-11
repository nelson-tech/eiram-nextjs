const imageLoader = ({ src, width, quality }) => {
	return `${src}?width=${width}&quality=${quality || 80}&format=webp`
}

export default imageLoader
