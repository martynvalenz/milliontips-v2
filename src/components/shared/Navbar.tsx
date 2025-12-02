import LangButton from "./LangButton";
import Logo from "./Logo";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
	return (
		<div className="fixed top-0 flex h-14 w-full items-center bg-background px-4">
			<div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
				<Logo href="/" />
				<div className="flex w-auto items-center gap-2">
					<ThemeButton />
					<LangButton />
					{/* <UserSettings />
					<UserDropdown /> */}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
