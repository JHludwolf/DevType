import TextEditorWindow from "../components/textEditorWindow";
import "../style/home/home.css";

import sampleCode from "../resources/sampleCode.json";
import { useSelector } from "react-redux";
import PageTitle from "../components/pageTitle";
import { useState } from "react";

const Home = () => {
	const colors = useSelector((state) => state.theme.colors);
	const [timer, setTimer] = useState(null);

	const displayTime = (startTime) => {
		const endTime = new Date();
		const timeDiff = endTime - startTime;
		const seconds = Math.floor(timeDiff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const time = `${hours > 0 ? hours + "s " : ""}${minutes > 0 ? minutes + "s " : ""}${seconds + "s"}`;
		setTimer(time);
	};

	//chose a random code
	const [codeArray, setCodeArray] = useState(sampleCode["test"]["test"]);
	
	const code = codeArray[Math.floor(Math.random() * codeArray.length)];

	return (
		<div className="home-div" style={{ backgroundColor: colors.background }}>
			<PageTitle />
			<TextEditorWindow text={code} displayTime={displayTime} />
			<p className="timer-tag">{timer}</p>
		</div>
	);
};

export default Home;
