import { NextSeo } from 'next-seo'
import React from 'react'

interface PageProps {
	name: string
	path: string
}
const Page: React.FC<PageProps> = ({ name, path, children }) => {
	const title = `Fast Feedback – ${name}`
	const url = `https://fastfeedback.io${path}`

	return (
		<>
			<NextSeo
				title={title}
				canonical={url}
				openGraph={{
					url,
					title
				}}
			/>
			{children}
		</>
	)
}

export default Page