import { NextSeoProps } from 'next-seo'

const title = 'Fast Feedback - The easiest way to add comments or reviews to your static site.'
const description = 'The easiest way to add comments to your static site'

const SEO: NextSeoProps  = {
	title,
	description,
	canonical: 'https://fastfeedback-lwnd.vercel.app',
	openGraph: {
		type: 'website',
		locale: 'en_IE',
		url: 'https://fastfeedback-lwnd.vercel.app',
		title,
		description,
		images: [
			{
				url: 'https://fastfeedback-lwnd.vercel.app/og.png',
				alt: title,
				width: 1280,
				height: 720
			}
		]
	}
}

export default SEO