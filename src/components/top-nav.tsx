import { IonIcon } from "@ionic/react";

const className = "top-nav";
const classNamePrefix = `${className}__`;

const TopNav: React.FC = () => {
	return (
		<nav className={className}>
			<span className={`${classNamePrefix}icon`}>
				<IonIcon color='light' icon={"checkbox"} />
			</span>
		</nav>
	);
};

export default TopNav;
