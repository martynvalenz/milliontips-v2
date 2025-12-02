import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import logo from "/img/favicon-180.png";

const Logo = ({ href }: { href: string }) => {
	return (
		<Link to={href}>
			<Image
				src={logo}
				alt="Logo"
				width={50}
				height={50}
				layout="constrained"
			/>
		</Link>
	);
};

export default Logo;
