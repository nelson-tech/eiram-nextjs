type ImageLoaderPropsType = {
	src: string
	width: number
	quality: number
}

const imageLoader = ({ src, width, quality }: ImageLoaderPropsType) => {
	return `${src}?width=${width}&quality=${quality || 80}&format=webp`
}

export default imageLoader
