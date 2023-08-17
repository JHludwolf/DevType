import "../style/home/home.css";
import { useSelector } from "react-redux";

const PageTitle = () => {
    const colors = useSelector((state) => state.theme.colors);

	return (
		<div>
			<h1 className="home-h1" style={{ color: colors.accent }}>
				DevType
			</h1>
			<h2 className="home-h2" style={{ color: colors.text }}>
				A typing test for developers
			</h2>
			<h3 className="home-h3" style={{ color: colors.text }}>
				By Dinamita &copy;{" "}
			</h3>
		</div>
	);
};

export default PageTitle;
