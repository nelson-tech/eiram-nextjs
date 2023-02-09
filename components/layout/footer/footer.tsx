"use client"

import { Menu_Sitesettings_Footer_Socialmedia } from "@lib/api/codegen/graphql"
import Image from "next/image"

type FooterProps = {
	socialMedia: Menu_Sitesettings_Footer_Socialmedia[]
}

const Footer = ({ socialMedia }: FooterProps) => {
	const CDN_URL = process.env.NEXT_PUBLIC_CDN_BASE_URL

	return (
		<div className="mt-8 p-8 text-center bg-gray-100 opacity-70">
			{socialMedia && (
				<div className="flex space-x-8 mb-8 justify-center items-center">
					{socialMedia.map((social) => {
						if (social?.icon?.name) {
							return (
								<a
									key={social.link}
									href={
										social.name.toLowerCase() === "email"
											? "mailto:" + social.link.split("https://")[1]
											: social.link
									}
									title={social.name}
									rel="noreferrer"
									className="w-8 h-8 fill-white stroke-white"
									target="_blank"
								>
									<Image
										src={
											CDN_URL +
											"/icons/" +
											social.icon.style +
											"/" +
											social.icon.name.toLowerCase() +
											".svg"
										}
										width={32}
										height={32}
										alt={social.name}
										className="social-icon"
									/>
								</a>
							)
						}
					})}
				</div>
			)}
			<div className="flex space-x-2 justify-center items-center text-black text-sm">
				<p>&copy; {new Date().getFullYear()} Eiram, LLC</p>
				<p className="pl-2">All Rights Reserved.</p>
			</div>
		</div>
	)
}

export default Footer
